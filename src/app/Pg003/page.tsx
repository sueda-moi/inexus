'use client';

import './Pg003.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMessage } from '@/lib/useMessage';
import { GreetingSection } from '@/components/GreetingSection/GreetingSection';
import { CompanyTimeline } from '@/components/CompanyTimeline/CompanyTimeline';
import OrgChartTree from '@/components/OrgChartTree/OrgChartTree';

const Pg003: React.FC = () => {
  const getMessage = useMessage();
  const paragraphLines1 = getMessage('Pg003', 'pg003_parent_items');
  const paragraphLines2 = getMessage('Pg003', 'pg003_subsidiary_items');
  const [showTop, setShowTop] = useState(false);
  const [showDown, setShowDown] = useState(false);

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
    <main className="pg003-container">



      {/* ⛰️ Header Banner */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <Image
          src="/image/pg003-bktop.jpg"
          alt="Company Overview Background"
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {showDown && (
        <button className="scroll-down-btn" onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}>
          ↓
        </button>
      )}


      {/* 💬 Section 1: Vision Message */}
      <section className="pg003-section" id="vision">
        <h2 className="pg003-section-title">{getMessage('Pg003', 'pg003_message_title')}</h2>
        <div className="pg003-message-flex">
          <GreetingSection />
        </div>
      </section>

      {/* 📅 Section 2: Company Timeline */}
      <section className="pg003-section" id="timeline">
        <h2 className="pg003-section-title">{getMessage('Pg003', 'pg003_timeline_title')}</h2>
        <div className="pg003-timeline-list">
          <CompanyTimeline />

        </div>
      </section>



      {/* 🏢 Section 3: Company Summary */}
      <section className="pg003-section" id="summary">
        <h2 className="pg003-section-title">{getMessage('Pg003', 'pg003_summary_title')}</h2>

        <div className="pg003-summary-grid">
          {/* 🎴 Left: Parent Company */}
          <div className="pg003-card" style={{ padding: '2rem', backgroundColor: '#ffffff', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <h3 className="pg003-card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{getMessage('Pg003', 'pg003_parent_title')}</h3>
            <ul className="pg003-card-list">
              {
                Array.isArray(paragraphLines1)
                  ? paragraphLines1.map((line, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">{line}</p>
                  ))
                  : <p className="mb-4 leading-relaxed">{paragraphLines1}</p>
              }
            </ul>
          </div>

          {/* 🎴 Right: Subsidiary */}
          <div className="pg003-card" style={{ padding: '2rem', backgroundColor: '#ffffff', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <h3 className="pg003-card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{getMessage('Pg003', 'pg003_subsidiary_title')}</h3>
            <ul className="pg003-card-list">
              {
                Array.isArray(paragraphLines2)
                  ? paragraphLines2.map((line, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">{line}</p>
                  ))
                  : <p className="mb-4 leading-relaxed">{paragraphLines2}</p>
              }
            </ul>
          </div>
        </div>

      </section>


      {/* 组织架构图 */}
      <section className="pg003-section" id="orgchart">
        <h2 className="pg003-section-title">{getMessage('Pg003', 'pg003_orgchart_title')}</h2>
        <div className="pg003-orgchart-wrapper">
          <OrgChartTree />
        </div>
      </section>

      {showTop && (
        <button className="top-btn" onClick={scrollToTop}>↑</button>
      )}

    </main>
  );
};

export default Pg003;
