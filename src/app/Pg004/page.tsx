'use client';

import Image from 'next/image';
import './Pg004.css';
import React, { useEffect, useState } from 'react';
import { useMessage } from '@/lib/useMessage';

const Pg004: React.FC = () => {
  const getMessage = useMessage();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const services = getMessage('Pg004', 'pg004_services');

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
    <div className="pg004">
      {/* ⛰️ Header Banner */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <Image
          src="/image/pg004-image.jpg"
          alt={getMessage('Pg004', 'pg004_header_alt')}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {showDown && (
        <button className="scroll-down-btn" onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}>
          ↓
        </button>
      )}

      {/* 服务种类 */}
      <section className="pg004-section">
        <h2 id="services">{getMessage('Pg004', 'pg004_services_title')}</h2>
        <div className="pg004-card-grid">
          {Array.isArray(services) &&
            services.map((service, index) => (
              <div className="pg004-card" key={index}>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
        </div>
      </section>





      {showTop && (
        <button className="top-btn" onClick={scrollToTop}>↑</button>
      )}
    </div>
  );
};

export default Pg004;
