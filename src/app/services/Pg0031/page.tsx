'use client';

import React, { useState } from 'react';
import { useMessage } from '@/lib/useMessage';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Pg0031.css';

const Pg0031: React.FC = () => {
  const t = useMessage();
  const items = [
    {
      key: 'finance',
      title: t('services', 'pg0031_finance_title'),
      description: t('services', 'pg0031_finance_desc'),
      image: '/image/pg0031-finance.jpg',
      tag: '# 金融領域'
    },
    {
      key: 'insurance',
      title: t('services', 'pg0031_insurance_title'),
      description: t('services', 'pg0031_insurance_desc'),
      image: '/image/pg0031-insurance.jpg',
      tag: '# 保険領域'
    },
    {
      key: 'infra',
      title: t('services', 'pg0031_infra_title'),
      description: t('services', 'pg0031_infra_desc'),
      image: '/image/pg0031-infra.jpg',
      tag: '# 社会基盤'
    }
  ];

  const [openKey, setOpenKey] = useState<string | null>(items[0].key);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <main className="pg0031-main">
      <div className="pg0031-header">
        <h1 className="pg0031-title">
          {t('services', 'pg0031_title')}
        </h1>
        <p className="pg0031-subtitle">
          {t('services', 'pg0031_subtitle')}
        </p>
      </div>

      {items.map((item) => (
        <section
          key={item.key}
          className="pg0031-card"
        >
          <button
            className="pg0031-card-toggle"
            onClick={() => toggle(item.key)}
          >
            <span>{item.title}</span>
            {openKey === item.key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openKey === item.key && (
            <div className="pg0031-card-content">
              <div className="pg0031-card-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                />
              </div>
              <div className="pg0031-card-text">
                <span className="pg0031-card-tag">
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

export default Pg0031;
