import json
import os
import boto3
from botocore.exceptions import ClientError

# Get your SES sender email address from environment variables.
# This email must be verified in AWS SES.
SES_SOURCE_EMAIL = os.environ.get('SES_SOURCE_EMAIL') 

# Get the recipient email address (your support team's email) from environment variables.
# This email should also be verified if your SES account is in sandbox mode.
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL') 

def lambda_handler(event, context):
    """
    Handles requests from a Lambda Function URL to send emails via AWS SES.
    It expects a POST request with a JSON body containing name, email, phone, and message.
    """
    
    # Validate request method: Ensure it's a POST request.
    if event['requestContext']['http']['method'] != 'POST':
        print(f"ERROR: Method Not Allowed - Received {event['requestContext']['http']['method']} request.")
        return {
            'statusCode': 405,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'message': 'Method Not Allowed' })
        }

    # Basic validation for environment variables
    if not SES_SOURCE_EMAIL:
        print("ERROR: SES_SOURCE_EMAIL environment variable is not set.")
        return {
            'statusCode': 500,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'message': 'Server configuration error: Sender email not configured.' })
        }
    if not RECIPIENT_EMAIL:
        print("ERROR: RECIPIENT_EMAIL environment variable is not set.")
        return {
            'statusCode': 500,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'message': 'Server configuration error: Recipient email not configured.' })
        }

    try:
        # Parse the JSON data from the request body.
        # The 'body' from Lambda Function URL events is always a string.
        body = json.loads(event['body'])
        
        # Extract necessary information from the request body.
        # These keys ('name', 'email', 'phone', 'message') must match the keys sent from your frontend.
        user_name = body.get('name') # User's entered name, defaulting to "未入力" (Not entered)
        user_company = body.get('company') # User's entered name, defaulting to "未入力" (Not entered)
        user_email = body.get('email') # User's entered email, can be empty.
        user_phone = body.get('phone') # User's entered phone number, can be empty.
        message_content = body.get('message', 'ユーザーからの具体的な内容は提供されていません。') # Inquiry message.
        
        # Validate input: Ensure at least one contact method (email or phone) is provided.
        if not user_email and not user_phone:
            print("ERROR: Missing contact information - No email or phone provided.")
            return {
                'statusCode': 400,
                'headers': { 'Content-Type': 'application/json' },
                'body': json.dumps({ 'message': 'メールアドレスまたは電話番号を連絡先としてご提供ください。' })
            }

        # Construct the email subject in Japanese.
        subject_parts = ['【華茂株式会社】お間い合わせがありました']
        # if user_name and user_name != '未入力': # Only add name to subject if provided
        #     subject_parts.append(f'（氏名：{user_name}）')
        # if user_email:
        #     subject_parts.append(f'（メール：{user_email}）')
        # if user_phone:
        #     subject_parts.append(f'（電話：{user_phone}）')
        subject = ' '.join(subject_parts)

        # Construct the email body (plain text) in Japanese.
        email_body_text = f"華茂株式会社へのお問い合わせ。\n\n" \
                          f"氏名: {user_name}\n" \
                          f"会社名: {user_company}\n" \
                          f"メールアドレス: {user_email if user_email else '提供なし'}\n" \
                          f"電話番号: {user_phone if user_phone else '提供なし'}\n" \
                          f"メッセージ内容:\n{message_content}"
        
        # Construct the email body (HTML) in Japanese.
        email_body_html = f"<html><body>" \
                          f"<p>華茂株式会社へのお問い合わせ</p>" \
                          f"<p><strong>氏名:</strong> {user_name}</p>" \
                          f"<p><strong>会社名:</strong> {user_company}</p>" \
                          f"<p><strong>メールアドレス:</strong> {user_email if user_email else '提供なし'}</p>" \
                          f"<p><strong>電話番号:</strong> {user_phone if user_phone else '提供なし'}</p>" \
                          f"<p><strong>メッセージ内容:</strong></p>" \
                          f"<p>{message_content.replace('\n', '<br>')}</p>" \
                          f"</body></html>"

        # Initialize the SES client.
        ses_client = boto3.client('ses')

        # Define the ReplyToAddresses list.
        reply_to_addresses = []
        if user_email:
            # If the user provided an email, set it as the Reply-To address.
            reply_to_addresses.append(user_email)
        
        # Parameters for sending the email.
        send_email_params = {
            'Source': SES_SOURCE_EMAIL,
            'Destination': {
                'ToAddresses': [RECIPIENT_EMAIL],
            },
            'Message': {
                'Subject': { 'Data': subject },
                'Body': {
                    'Text': { 'Data': email_body_text },
                    'Html': { 'Data': email_body_html }
                }
            }
        }

        # Only add the 'ReplyToAddresses' parameter if a Reply-To address exists.
        if reply_to_addresses:
            send_email_params['ReplyToAddresses'] = reply_to_addresses

        print(f"DEBUG: Attempting to send email from {SES_SOURCE_EMAIL} to {RECIPIENT_EMAIL} with Reply-To: {reply_to_addresses}")
        response = ses_client.send_email(**send_email_params)

        print(f"DEBUG: SES send_email call returned: {response}")
        print(f"DEBUG: Email sent successfully! Message ID: {response['MessageId']}")
        return {
            'statusCode': 200,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'message': 'Email sent successfully!', 'message_id': response['MessageId'] })
        }

    except json.JSONDecodeError as e:
        # Handle cases where the request body is not valid JSON.
        print(f"ERROR: JSON decoding failed: {e}")
        return {
            'statusCode': 400,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'message': '無効なJSONリクエストボディです。' })
        }
    except ClientError as e:
        # Handle SES client-specific errors (e.g., permissions, unverified identity, sandbox).
        error_code = e.response.get('Error', {}).get('Code')
        error_message = e.response.get('Error', {}).get('Message')
        print(f"SES Error: {error_code} - {error_message}")
        # Consider a more user-friendly message for the client if needed
        return {
            'statusCode': 500,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'message': f'メール送信に失敗しました。: {error_message}' })
        }
    except Exception as e:
        # Catch any other unexpected errors.
        print(f"Unexpected Error: {e}")
        return {
            'statusCode': 500,
            'headers': { 'Content-Type': 'application/json' },
            'body': json.dumps({ 'message': '内部サーバーエラーが発生しました。' })
        }