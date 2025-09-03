# lambda_function.py (for get-upload-url) 
import json
import boto3
import uuid
import os
from botocore.config import Config 

S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')
S3_REGION = os.environ.get('S3_REGION', 'ap-northeast-1')

s3_client = boto3.client(
    's3',
    region_name=S3_REGION,
    config=Config(signature_version='s3v4') 
)

# Define max file size in bytes, e.g., 5MB
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 # 5 MB
# Define allowed file types (MIME types)
ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        file_name = body.get('fileName')
        file_type = body.get('fileType')

        if not file_name or not file_type:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required parameters: fileName and fileType.'})
            }
        
        if file_type not in ALLOWED_FILE_TYPES:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': f'Unsupported file type: {file_type}. Only PDF, DOC, DOCX files are allowed.'})
            }

        file_key = f"resumes/{uuid.uuid4()}-{file_name}"
        
        post_data = s3_client.generate_presigned_post(
            Bucket=S3_BUCKET_NAME,
            Key=file_key,
            Fields={
                # "Content-Type": file_type
            },
            Conditions=[
                ["content-length-range", 1, MAX_FILE_SIZE_BYTES],# Restrict file size
                # ["starts-with", "$Content-Type", ""]  
            ],
            ExpiresIn=300 # URL valid for 5 minutes
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'uploadUrl': post_data['url'],
                'fields': post_data['fields'],
                'fileKey': file_key
            })
        }

    except Exception as e:
        print(e) # This will print the detailed Python error to CloudWatch Logs
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Failed to generate pre-signed URL for S3 upload. Details: {str(e)}'})
        }