import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const lambdaUrl = 'https://ekojfombjwi6jm3kzi2kixpx2i0cfbal.lambda-url.ap-northeast-1.on.aws/';
    const response = await fetch(lambdaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const rawText = await response.text();
    console.log('Lambda raw response:', rawText); 
    console.log('Lambda response.ok:', response.ok, 'status:', response.status);

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      console.warn('Lambda 返回非 JSON 格式:', rawText);
      parsed = null;
    }

    if (!response.ok) {
      return NextResponse.json({ error: 'Lambda failed', detail: parsed || rawText }, { status: 502 });
    }

    return NextResponse.json({ message: 'Success', lambdaResult: parsed || rawText });
  } catch (err) {
    console.error('中转错误:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}