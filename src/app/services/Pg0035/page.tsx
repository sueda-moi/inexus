'use client';

import React, { useState } from 'react';
import { useMessage } from '@/lib/useMessage';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Pg0035.css';

const Pg0035: React.FC = () => {
  const t = useMessage();
  const items = [
    {
      key: 'training',
      title: t('services', 'pg0035_training_title'),
      description: t('services', 'pg0035_training_desc'),
      image: '/image/pg0035-training.jpg',
      tag: '# 教育研修'
    },
    {
      key: 'dispatch',
      title: t('services', 'pg0035_dispatch_title'),
      description: t('services', 'pg0035_dispatch_desc'),
      image: '/image/pg0035-dispatch.jpg',
      tag: '# IT人材派遣'
    },
    {
      key: 'sdgs',
      title: t('services', 'pg0035_sdgs_title'),
      description: t('services', 'pg0035_sdgs_desc'),
      image: '/image/pg0035-sdgs.jpg',
      tag: '# SDGsへの取り組み'
    }
  ];

  const [openKey, setOpenKey] = useState<string | null>(items[0].key);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <main className="pg0035-main">
      <div className="pg0035-header">
        <h1 className="pg0035-title">
          {t('services', 'pg0035_title')}
        </h1>
        <p className="pg0035-subtitle">
          {t('services', 'pg0035_subtitle')}
        </p>
      </div>

      {items.map((item) => (
        <section
          key={item.key}
          className="pg0035-card"
        >
          <button
            className="pg0035-card-toggle"
            onClick={() => toggle(item.key)}
          >
            <span>{item.title}</span>
            {openKey === item.key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openKey === item.key && (
            <div className="pg0035-card-content">
              <div className="pg0035-card-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                />
              </div>
              <div className="pg0035-card-text">
                <span className="pg0035-card-tag">
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

export default Pg0035;
