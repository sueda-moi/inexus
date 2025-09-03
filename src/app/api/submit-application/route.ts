import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 文本数据和S3文件key
    const body = await req.json();
  
    // Lambda函数的URL
    const lambdaUrl = 'https://iroln5vuvovxy7pvdmnk4u4kki0tsbsk.lambda-url.ap-northeast-1.on.aws/';
    
    const response = await fetch(lambdaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: 'Lambda function failed to process submission', detail: errorData }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json({ message: 'Application submitted successfully', result });

  } catch (err) {
    console.error('API route /api/submit-application error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}