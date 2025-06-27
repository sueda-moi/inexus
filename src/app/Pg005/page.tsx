'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './Pg005.css';
import ContactForm from '@/components/ContactForm/ContactForm';
import { useMessage } from '@/lib/useMessage';

const Pg005: React.FC = () => {
  const getMessage = useMessage();

  const [showTop, setShowTop] = useState(false);
  const [showDown, setShowDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollBottom = window.innerHeight + scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      setShowTop(scrollY > 300);
      setShowDown(scrollBottom < pageHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <main className="pg005-page">
      {/* 🔹 顶部横幅图 + 标题 */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <Image
          src="/image/pg004-bktop.jpg"
          alt="Contact Top"
          fill
          className="object-cover w-full h-full"
        />
        <div className="pg005-img-text">
          <h1 className="text-white text-4xl font-bold">{getMessage('Pg005', 'page_title')}</h1>
        </div>
      </div>

      {showDown && (
        <button className="scroll-down-btn" onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}>
          ↓
        </button>
      )}

      {/* 🔹 联系表单部分 */}
      <div className="pg005-page-section">
        <h2 className="pg005-form-text">
          {getMessage('Pg005', 'form_heading')}
        </h2>
        <ContactForm />
      </div>

      {/* 🔹 地图信息部分 */}
      <div className="pg005-page-section">
        <h3 className="pg005-form-text">{getMessage('Pg005', 'access_title')}</h3>
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
      </div>

      {showTop && (
        <button className="top-btn" onClick={scrollToTop}>↑</button>
      )}

    </main>
  );
};

export default Pg005;
