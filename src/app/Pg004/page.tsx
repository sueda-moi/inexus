'use client';

import Image from 'next/image';
import './Pg004.css';
import React, { useEffect } from 'react';
import OrgChartTree from '@/components/OrgChartTree/OrgChartTree';
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

  return (
    <div className="pg004">
      {/* ⛰️ Header Banner */}
      <div className="relative h-[25vh] w-full mb-12">
        <Image
          src="/image/pg004-image.jpg"
          alt={getMessage('Pg004', 'pg004_header_alt')}
          fill
          className="object-cover w-full z-0"
        />
      </div>

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

      {/* 组织架构图 */}
      <section className="pg004-section orgchart-block">
        <h2 id="organization">{getMessage('Pg004', 'pg004_orgchart_title')}</h2>
        <div className="pg004-orgchart-wrapper">
          <OrgChartTree />
        </div>
      </section>
    </div>
  );
};

export default Pg004;
