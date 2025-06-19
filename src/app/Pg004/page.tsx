'use client';

import Image from 'next/image';
import './Pg004.css';
import React, { useEffect, useState } from 'react';
import OrgChartTree from '@/components/OrgChartTree/OrgChartTree';

const Pg004: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');

  // 滚动监听（可选）
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('h2[id]');
      let currentId = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentId = section.id;
        }
      });
      setActiveSection(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pg004">
      {/* 顶部导航栏锚点 */}
      <nav className="pg004-nav">
        <a href="#business" className={activeSection === 'business' ? 'active' : ''}>事業</a>
        <a href="#services" className={activeSection === 'services' ? 'active' : ''}>サービス</a>
        <a href="#organization" className={activeSection === 'organization' ? 'active' : ''}>組織図</a>
        <a href="#strength" className={activeSection === 'strength' ? 'active' : ''}>強み</a>
      </nav>

      {/* 业务结构图 */}
      <section className="pg004-section">
        <h2 id="business">ネクサステクノロジー株式会社の事業</h2>
        <div className="pg004-image-wrapper">
          <Image
            src="/images/business-structure-placeholder.svg"
            alt="事業構造図"
            width={800}
            height={400}
          />
        </div>
      </section>

      {/* 服务种类 */}
      <section className="pg004-section">
        <h2 id="services">サービス体系</h2>
        <div className="pg004-card-grid">
          <div className="pg004-card">社会インフラ事業</div>
          <div className="pg004-card">次の柱となる事業群</div>
          <div className="pg004-card">ソリューション開発</div>
        </div>
      </section>

      {/* 组织架构图 */}
      <section className="pg004-section orgchart-block">
        <h2 id="organization">組織図（インタラクティブ）</h2>
        <div className="pg004-orgchart-wrapper">
          <OrgChartTree />
        </div>
      </section>

      {/* 数据与优势 */}
      <section className="pg004-section">
        <h2 id="strength">ネクサステクノロジー株式会社の強み</h2>
        <div className="pg004-stats">
          <div className="pg004-stat-item">
            <strong>6,900+</strong>
            <p>システムエンジニア数</p>
          </div>
          <div className="pg004-stat-item">
            <strong>8,000+</strong>
            <p>DX関連人材</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pg004;
