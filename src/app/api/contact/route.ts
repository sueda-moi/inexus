import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const lambdaUrl = 'https://36pekstyczqpghl3tvtptkdg240pxmqi.lambda-url.ap-northeast-1.on.aws/';

    const response = await fetch(lambdaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.text(); // lambda 可能返回 text

    if (!response.ok) {
      return NextResponse.json({ error: 'Lambda failed', detail: result }, { status: 502 });
    }

    return NextResponse.json({ message: 'Success', lambdaResult: result });
  } catch (err) {
    console.error('中转错误:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
