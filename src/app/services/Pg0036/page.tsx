'use client';

import React from 'react';
import { useMessage } from '@/lib/useMessage';
import Image from 'next/image';
import './Pg0036.css';

const Pg0036: React.FC = () => {
  const t = useMessage();

  return (
    <main className="pg0036-main">
      <section className="pg0036-section">
        <h1 className="pg0036-title">
          {t('services', 'pg0036_organization_title')}
        </h1>
        <p className="pg0036-description">
          {t('services', 'pg0036_organization_desc')}
        </p>
        <div className="pg0036-image-wrapper">
          <Image
            src="/image/pg0036-org.jpg"
            alt="組織図"
            width={960}
            height={540}
            className="pg0036-image"
          />
        </div>
      </section>

      <section className="pg0036-section">
        <h2 className="pg0036-title">
          {t('services', 'pg0036_message_title')}
        </h2>
        <p className="pg0036-description">
          {t('services', 'pg0036_message_desc')}
        </p>
        <div className="pg0036-image-wrapper">
          <Image
            src="/image/pg0036-ending.jpg"
            alt="締めくくり"
            width={960}
            height={540}
            className="pg0036-image"
          />
        </div>
      </section>
    </main>
  );
};

export default Pg0036;
