'use client';

import './Pg003.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useMessage } from '@/lib/useMessage';
import { GreetingSection } from '@/components/GreetingSection/GreetingSection';
import { CompanyTimeline } from '@/components/CompanyTimeline/CompanyTimeline';

const ScrollLottie = dynamic(() => import('@/components/ScrollLottie/ScrollLottie'), { ssr: false });

const Pg003: React.FC = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const sectionTeamRef = useRef<HTMLDivElement>(null);
  const getMessage = useMessage();
  const paragraphLines1 = getMessage('Pg003', 'pg003_parent_items');
  const paragraphLines2 = getMessage('Pg003', 'pg003_subsidiary_items');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrollTop + windowHeight >= fullHeight - 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="pg003-container">
      {/* ⛰️ Header Banner */}
      <div className="relative h-[25vh] w-full mb-12">
        <Image
          src="/image/pg003-bktop.jpg"
          alt="Company Overview Background"
          fill
          className="object-cover w-full z-0"
        />
      </div>

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

        <div className="pg003-summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
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

      {/* 👉 Scroll hint */}
      {!isAtBottom && (
        <div className="scroll-lottie-wrapper">
          <ScrollLottie onClick={() => scrollToSection(sectionTeamRef)} />
        </div>
      )}
    </main>
  );
};

export default Pg003;
