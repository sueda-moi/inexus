'use client';

import React from 'react';
import Image from 'next/image';
import './Pg005.css';
import ContactForm from '@/components/ContactForm/ContactForm';
import { useMessage } from '@/lib/useMessage';

const Pg005: React.FC = () => {
  const getMessage = useMessage();
  return (
    <main className="pg005-page">
      {/* 🔹 顶部横幅图 + 标题 */}
      <section className="relative w-full h-[25vh] mb-12">
        <Image
          src="/image/pg004-bktop.jpg"
          alt="Contact Top"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">{getMessage('Pg005', 'page_title')}</h1>
        </div>
      </section>

      {/* 🔹 联系表单部分 */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          {getMessage('Pg005', 'form_heading')}
        </h2>
        <ContactForm />
      </section>

      {/* 🔹 地图信息部分 */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">{getMessage('Pg005', 'access_title')}</h3>
        <p className="mb-2 text-gray-600"> {getMessage('Pg005', 'access_address')}</p>
        <div className="w-full h-80 rounded overflow-hidden border">
          <iframe
            src="https://maps.google.com/maps?q=東京都中央区東日本橋3-10-14&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
            title="オフィス地図"
          />
        </div>
      </section>
    </main>
  );
};

export default Pg005;
