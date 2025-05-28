'use client';

import React, { useState } from 'react';
import { useMessage } from '@/lib/useMessage';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Pg0032.css';

const Pg0032: React.FC = () => {
  const t = useMessage();
  const items = [
    {
      key: 'security',
      title: t('services', 'pg0032_security_title'),
      description: t('services', 'pg0032_security_desc'),
      image: '/image/pg0032-security.jpg',
      tag: '# 情報セキュリティ'
    },
    {
      key: 'quality',
      title: t('services', 'pg0032_quality_title'),
      description: t('services', 'pg0032_quality_desc'),
      image: '/image/pg0032-quality.jpg',
      tag: '# 品質保証体制'
    }
  ];

  const [openKey, setOpenKey] = useState<string | null>(items[0].key);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <main className="pg0032-main">
      <div className="pg0032-header">
        <h1 className="pg0032-title">
          {t('services', 'pg0032_title')}
        </h1>
        <p className="pg0032-subtitle">
          {t('services', 'pg0032_subtitle')}
        </p>
      </div>

      {items.map((item) => (
        <section
          key={item.key}
          className="pg0032-card"
        >
          <button
            className="pg0032-card-toggle"
            onClick={() => toggle(item.key)}
          >
            <span>{item.title}</span>
            {openKey === item.key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openKey === item.key && (
            <div className="pg0032-card-content">
              <div className="pg0032-card-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                />
              </div>
              <div className="pg0032-card-text">
                <span className="pg0032-card-tag">
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

export default Pg0032;
