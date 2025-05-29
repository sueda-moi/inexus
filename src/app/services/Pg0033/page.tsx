'use client';

import React, { useState } from 'react';
import { useMessage } from '@/lib/useMessage';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Pg0033.css';

const Pg0033: React.FC = () => {
  const t = useMessage();
  const items = [
    {
      key: 'growth',
      title: t('services', 'pg0033_growth_title'),
      description: t('services', 'pg0033_growth_desc'),
      image: '/image/pg0033-growth.jpg',
      tag: '# 売上成長'
    },
    {
      key: 'employees',
      title: t('services', 'pg0033_employees_title'),
      description: t('services', 'pg0033_employees_desc'),
      image: '/image/pg0033-employees.jpg',
      tag: '# 社員数の推移'
    },
    {
      key: 'partners',
      title: t('services', 'pg0033_partners_title'),
      description: t('services', 'pg0033_partners_desc'),
      image: '/image/pg0033-vision.jpg',
      tag: '# 主要取引先'
    }
  ];

  const [openKey, setOpenKey] = useState<string | null>(items[0].key);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <main className="pg0033-main">
      <div className="pg0033-header">
        <h1 className="pg0033-title">
          {t('services', 'pg0033_title')}
        </h1>
        <p className="pg0033-subtitle">
          {t('services', 'pg0033_subtitle')}
        </p>
      </div>

      {items.map((item) => (
        <section
          key={item.key}
          className="pg0033-card"
        >
          <button
            className="pg0033-card-toggle"
            onClick={() => toggle(item.key)}
          >
            <span>{item.title}</span>
            {openKey === item.key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openKey === item.key && (
            <div className="pg0033-card-content">
              <div className="pg0033-card-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                />
              </div>
              <div className="pg0033-card-text">
                <span className="pg0033-card-tag">
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

export default Pg0033;
