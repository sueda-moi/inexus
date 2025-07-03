'use client';

import Image from 'next/image';
import './Pg004.css';
import React, { useEffect, useState } from 'react';
import { useMessage } from '@/lib/useMessage';
import CustomGeoMap from '@/components/CustomGeoMap/CustomGeoMap';

type BusinessField = {
  category: string;
  items: string[];
};

type Service = {
  title: string;
  desc: string;
  fields?: string[]; // Optional: link to related BusinessField.category
};

const Pg004: React.FC = () => {
  const getMessage = useMessage();

  const services = getMessage('Pg004', 'pg004_services') as unknown as Service[];
  const fields = getMessage('Pg004', 'pg004_business_fields') as unknown as BusinessField[];

  const [showTop, setShowTop] = useState(false);
  const [showDown, setShowDown] = useState(false);
  const [activeTab, setActiveTab] = useState<'services' | 'fields'>('services');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

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
        <button
          className="scroll-down-btn"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
        >
          ↓
        </button>
      )}

      {/* Tab Buttons */}
      <section className="pg004-section">
        <h2 className="pg004-section-title" id="services">
          {getMessage('Pg004', 'pg004_services_title')}
        </h2>
        <div className="pg004-tab-buttons">
          <button
            className={`pg004-tab-button ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            {getMessage('Pg004', 'pg004_services_title')}
          </button>
          <button
            className={`pg004-tab-button ${activeTab === 'fields' ? 'active' : ''}`}
            onClick={() => setActiveTab('fields')}
          >
            {getMessage('Pg004', 'pg004_business_fields_title')}
          </button>
        </div>


        {/* Tab Content */}
        {activeTab === 'services' && (
          <div className="pg004-card-grid">
            {Array.isArray(services) &&
              services.map((service, index) => (
                <div className="pg004-card" key={index}>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              ))}
          </div>
        )}

        {activeTab === 'fields' && (
          <div className="pg004-business-field-wrapper">
            {fields.map((field, index) => (
              <div key={index} className="pg004-business-field-block">
                <h3 className="pg004-business-field-title">{field.category}</h3>
                <ul className="pg004-business-field-list">
                  {field.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🧑‍💼 Major Clients Section */}
      <section className="pg004-section">
        <h2 className="pg004-section-title">{getMessage('Pg004', 'pg004_clients_title')}</h2>
        <div className="pg004-image-wrapper">
          <Image
            src="/image/pg004-clients.jpg"
            alt={getMessage('Pg004', 'pg004_clients_alt')}
            width={800}
            height={600}
            className="pg004-img-shadow"
          />
        </div>
      </section>

      {/* 🗺️ Map Section */}
      <section className="geo-map-section">
        <h2 className="pg004-section-title">{getMessage('Pg004', 'geo-map-section')}</h2>
        <CustomGeoMap />
      </section>

      {showTop && (
        <button className="top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Pg004;
