# lambda_function.py for submit-application
import json
import boto3
import os

SENDER_EMAIL = os.environ.get('SENDER_EMAIL') #  "no-reply@blueocean.co.jp"
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL') #  "hr@blueocean.co.jp"
S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')
S3_REGION = os.environ.get('S3_REGION', 'ap-northeast-1')

ses_client = boto3.client('ses', region_name=S3_REGION)
s3_client = boto3.client('s3', region_name=S3_REGION) # S3クライアント

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        
        job_title = body.get('jobTitle', 'N/A')
        name = body.get('name', 'N/A')
        email = body.get('email', 'N/A')
        phone = body.get('phone', 'N/A')
        cover_letter = body.get('coverLetter', 'N/A')
        resume_key = body.get('resumeFileKey', '') 

        # --- 新增逻辑：生成简历的预签名下载URL ---
        presigned_download_url = ""
        download_link_text = "" # ダウンロードリンクの表示テキスト
        
        if resume_key: 
            try:
                # URLの有効期限を1時間 (3600秒) に設定
                expires_in_minutes = 60 
                presigned_download_url = s3_client.generate_presigned_url(
                    'get_object',
                    Params={
                        'Bucket': S3_BUCKET_NAME,
                        'Key': resume_key
                    },
                    ExpiresIn=expires_in_minutes * 60 # 秒単位で指定
                )
                download_link_text = f"""
                    <p><a href="{presigned_download_url}">ここをクリックして履歴書・職務経歴書をダウンロード</a></p>
                    <p><em>このリンクは {expires_in_minutes} 分間有効です。</em></p>
                    <p><em>S3でのファイルの実際のパス: {S3_BUCKET_NAME}/{resume_key}</em></p>
                """
            except Exception as s3_error:
                print(f"Error generating presigned URL for {resume_key}: {s3_error}")
                download_link_text = f"""
                    <p>履歴書・職務経歴書: S3バケット: {S3_BUCKET_NAME}, キー: {resume_key} (ダウンロードリンクの生成に失敗しました)</p>
                    <p><em>AWSコンソールから上記S3パスでファイルをご確認ください。</em></p>
                """
        else:
            download_link_text = "<p>履歴書・職務経歴書は提供されていません。</p>"
        # ----------------------------------------------

        # 构造邮件内容
        email_subject = f"【新規応募】{job_title} - {name}様"
        email_body_html = f"""
            <html>
            <head></head>
            <body>
                <h1>新規応募がありました</h1>
                <p>以下の内容で新しい応募がありましたのでご確認ください。</p>
                <p><strong>応募職種:</strong> {job_title}</p>
                <p><strong>応募者名:</strong> {name}</p>
                <p><strong>メールアドレス:</strong> {email}</p>
                <p><strong>電話番号:</strong> {phone}</p>
                <hr>
                <h2>カバーレター:</h2>
                <p style="white-space: pre-wrap;">{cover_letter}</p>
                <hr>
                <h2>履歴書・職務経歴書:</h2>
                {download_link_text} 
            </body>
            </html>
        """

        # 发送邮件
        ses_client.send_email(
            Source=SENDER_EMAIL,
            Destination={'ToAddresses': [RECIPIENT_EMAIL]},
            Message={
                'Subject': {'Data': email_subject},
                'Body': {'Html': {'Data': email_body_html}}
            }
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Application processed successfully'})
        }

    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Failed to process application'})
        }