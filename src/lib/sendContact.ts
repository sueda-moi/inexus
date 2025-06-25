export async function sendContact(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('送信失敗しました');
  }

  return await response.json();
}
