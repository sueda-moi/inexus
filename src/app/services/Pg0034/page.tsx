'use client';

import React, { useState } from 'react';
import { useMessage } from '@/lib/useMessage';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Pg0034.css';

const Pg0034: React.FC = () => {
  const t = useMessage();
  const items = [
    {
      key: 'bridge',
      title: t('services', 'pg0034_bridge_title'),
      description: t('services', 'pg0034_bridge_desc'),
      image: '/image/pg0034-bridge.jpg',
      tag: '# 日中ビジネスの架け橋'
    },
    {
      key: 'support',
      title: t('services', 'pg0034_support_title'),
      description: t('services', 'pg0034_support_desc'),
      image: '/image/pg0034-support.jpg',
      tag: '# 市場進出支援'
    },
    {
      key: 'realestate',
      title: t('services', 'pg0034_realestate_title'),
      description: t('services', 'pg0034_realestate_desc'),
      image: '/image/pg0034-realestate.jpg',
      tag: '# 不動産投資・管理'
    }
  ];

  const [openKey, setOpenKey] = useState<string | null>(items[0].key);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <main className="pg0034-main">
      <div className="pg0034-header">
        <h1 className="pg0034-title">
          {t('services', 'pg0034_title')}
        </h1>
        <p className="pg0034-subtitle">
          {t('services', 'pg0034_subtitle')}
        </p>
      </div>

      {items.map((item) => (
        <section
          key={item.key}
          className="pg0034-card"
        >
          <button
            className="pg0034-card-toggle"
            onClick={() => toggle(item.key)}
          >
            <span>{item.title}</span>
            {openKey === item.key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openKey === item.key && (
            <div className="pg0034-card-content">
              <div className="pg0034-card-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                />
              </div>
              <div className="pg0034-card-text">
                <span className="pg0034-card-tag">
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

export default Pg0034;
