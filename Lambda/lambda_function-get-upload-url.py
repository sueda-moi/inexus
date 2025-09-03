# lambda_function.py (for get-upload-url)
import json
import boto3
import uuid
import os
from botocore.config import Config

# --- New Configuration ---
# Get allowed origins from an environment variable (e.g., "http://localhost:3000,https://www.inexus.co.jp")
ALLOWED_ORIGINS_STR = os.environ.get('ALLOWED_ORIGINS', '')
ALLOWED_ORIGINS = [origin.strip() for origin in ALLOWED_ORIGINS_STR.split(',')]

S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')
S3_REGION = os.environ.get('S3_REGION', 'ap-northeast-1')

s3_client = boto3.client(
    "s3",
    region_name=S3_REGION,
    config=Config(
        signature_version="s3v4",
        s3={"addressing_style": "virtual"}, 
    ),
)

MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

def lambda_handler(event, context):
    
    # --- Dynamic CORS Header Logic ---
    origin = event.get('headers', {}).get('origin')
    
    # Check if the incoming origin is in our allowed list
    if origin in ALLOWED_ORIGINS:
        access_control_allow_origin = origin
    else:
        # Optional: You can fall back to a default or simply not set the header,
        # but setting a default is often better for debugging.
        access_control_allow_origin = ALLOWED_ORIGINS[0] if ALLOWED_ORIGINS else None

    headers = {
        "Access-Control-Allow-Origin": access_control_allow_origin,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
        # This header is needed to allow credentials (like cookies) if you use them later
        "Access-Control-Allow-Credentials": "true" 
    }
    
    # Handle preflight OPTIONS request
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 204, 'headers': headers, 'body': ''}

    # --- Your existing logic ---
    try:
        body = json.loads(event.get('body', '{}'))
        file_name = body.get('fileName')
        file_type = body.get('fileType')

        if not file_name or not file_type:
            return {
                'statusCode': 400,
                'headers': headers, # Add headers to error responses too
                'body': json.dumps({'error': 'Missing required parameters: fileName and fileType.'})
            }
        
        if file_type not in ALLOWED_FILE_TYPES:
            return {
                'statusCode': 400,
                'headers': headers, # Add headers to error responses too
                'body': json.dumps({'error': f'Unsupported file type: {file_type}. Only PDF, DOC, DOCX files are allowed.'})
            }

        file_key = f"resumes/{uuid.uuid4()}-{file_name}"
        
        post_data = s3_client.generate_presigned_post(
            Bucket=S3_BUCKET_NAME,
            Key=file_key,
            Fields={},
            Conditions=[
                ["content-length-range", 1, MAX_FILE_SIZE_BYTES],
            ],
            ExpiresIn=300
        )
        
        return {
            'statusCode': 200,
            'headers': headers, # Use the dynamically generated headers
            'body': json.dumps({
                'uploadUrl': post_data['url'],
                'fields': post_data['fields'],
                'fileKey': file_key
            })
        }

    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': headers, # Use the dynamically generated headers
            'body': json.dumps({'error': f'Failed to generate pre-signed URL. Details: {str(e)}'})
        }