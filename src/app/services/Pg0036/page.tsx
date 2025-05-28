'use client';

import React, { useState } from 'react';
import { useMessage } from '@/lib/useMessage';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Pg0036.css';

const Pg0036: React.FC = () => {
  const t = useMessage();
  const items = [
    {
      key: 'philosophy',
      title: t('services', 'pg0036_philosophy_title'),
      description: t('services', 'pg0036_philosophy_desc'),
      image: '/image/pg0036-philosophy.jpg',
      tag: '# 経営理念'
    },
    {
      key: 'vision',
      title: t('services', 'pg0036_vision_title'),
      description: t('services', 'pg0036_vision_desc'),
      image: '/image/pg0036-vision.jpg',
      tag: '# 将来ビジョン'
    },
    {
      key: 'commitment',
      title: t('services', 'pg0036_commitment_title'),
      description: t('services', 'pg0036_commitment_desc'),
      image: '/image/pg0036-commitment.jpg',
      tag: '# 顧客への約束'
    }
  ];

  const [openKey, setOpenKey] = useState<string | null>(items[0].key);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <main className="pg0036-main">
      <div className="pg0036-header">
        <h1 className="pg0036-title">
          {t('services', 'pg0036_title')}
        </h1>
        <p className="pg0036-subtitle">
          {t('services', 'pg0036_subtitle')}
        </p>
      </div>

      {items.map((item) => (
        <section
          key={item.key}
          className="pg0036-card"
        >
          <button
            className="pg0036-card-toggle"
            onClick={() => toggle(item.key)}
          >
            <span>{item.title}</span>
            {openKey === item.key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openKey === item.key && (
            <div className="pg0036-card-content">
              <div className="pg0036-card-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                />
              </div>
              <div className="pg0036-card-text">
                <span className="pg0036-card-tag">
                  {item.tag}
                </span>
                <p>{item.description}</p>
              </div>
            </div>
          )}
        </section>
      ))}
    </main>
  );
};

export default Pg0036;
