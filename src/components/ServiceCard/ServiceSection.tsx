'use client';
import React from 'react';
import { useMessage } from '@/lib/useMessage';
import type { Service } from '@/types/Pg004';
import ServiceCard from './ServiceCard';
import './ServiceSection.module.css';

const ServiceSection: React.FC = () => {
  const getMessage = useMessage();
  const services = getMessage('Pg004', 'pg004_services') as unknown as Service[];

  return (
    <div className="service-section-wrapper">
      {services.map((s, i) => (
        <ServiceCard key={i} title={s.title} desc={s.desc} fields={s.fields} />
      ))}
    </div>
  );
};

export default ServiceSection;
