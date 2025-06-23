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
            src="/image/pg004-image.jpg"
            alt="事業構造図"
            width={800}
            height={800}
          />
        </div>
      </section>

      {/* 服务种类 */}
      <section className="pg004-section">
        <h2 id="services">サービス体系</h2>
        <div className="pg004-card-grid">
          <div className="pg004-card">
            <h3>社会インフラ事業</h3>
            <p>行政、交通、医療など、社会基盤を支えるシステムの構築・運用を通じて、安心・安全な社会の実現を支援します。</p>
          </div>
          <div className="pg004-card">
            <h3>次の柱となる事業群</h3>
            <p>AI・IoT・クラウド技術を活用した新規事業を積極的に展開し、次世代の成長エンジンを育成しています。</p>
          </div>
          <div className="pg004-card">
            <h3>ソリューション開発</h3>
            <p>顧客の課題に応じて、システム開発・運用保守・セキュリティ対応まで一気通貫で提供し、ビジネス変革を支援します。</p>
          </div>

        </div>
      </section>

      {/* 组织架构图 */}
      <section className="pg004-section orgchart-block">
        <h2 id="organization">組織図（インタラクティブ）</h2>
        <div className="pg004-orgchart-wrapper">
          <OrgChartTree />
        </div>
      </section>
    </div>
  );
};

export default Pg004;
