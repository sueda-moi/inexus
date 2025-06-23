import ClientLayout from '@/components/ClientLayout';
import './globals.css';
import type { Metadata } from 'next';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// サイトのメタ情報（必要に応じて編集してください）
export const metadata: Metadata = {
  title: 'ネクサステクノロジー株式会社',
  description: 'Team is power',
  icons: {
    icon: '/favicon.ico',
  },
};

// App Router における共通レイアウト（クライアントレイアウトに処理を委譲）
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Head>
        {/* ✅ import Noto Sans  */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="flex flex-col min-h-screen">
        <ClientLayout>
          {children}
          <ToastContainer position="top-center" autoClose={3000} hideProgressBar theme="light" />

        </ClientLayout>
      </body>
    </html>
  );
}
