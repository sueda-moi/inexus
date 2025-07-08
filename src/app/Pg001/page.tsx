'use client';

import './Pg001.css';
import Image from 'next/image';
import { useMessage } from '@/lib/useMessage';
import Link from 'next/link';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import SectionTitle from '@/components/Common/SectionTitle';
import FeatureImage from '@/components/Common/FeatureImage';
import { useEffect, useState } from 'react';


const Pg001: React.FC = () => {
  const getMessage = useMessage();
  const rawNews = getMessage('Pg001', 'pg001_news_items');
  const newsItems: string[] = Array.isArray(rawNews) ? rawNews : [];

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
    <main className="pg001-container">
      {/* 🖼️ Hero Section */}
      <section className="pg001-hero">
        <ImageCarousel />
        <div className="pg001-hero-text">
          <h1>{getMessage('Pg001', 'pg001_title')}</h1>
          <p>{getMessage('Pg001', 'pg001_subtitle')}</p>
        </div>
      </section>

      {showDown && (
        <button className="scroll-down-btn" onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}>
          ↓
        </button>
      )}

      {/* 📰 News Section */}
      <section className="pg001-news">
        <SectionTitle text={getMessage('Pg001', 'pg001_news_title')} />
        <ul className="pg001-news-list">
          {newsItems.map((item, index) => (
            <li key={index}>

              <span className="pg001-news-icon">📰</span>
              <span className="pg001-news-line">{item}</span>

            </li>
          ))}
        </ul>
      </section>

      {/* 🏢 Intro Section */}
      <section className='pg001-intro'>
        <div className="pg001-intro-content">

          {/* 文本区域 */}
          <div className="pg001-intro-text">
            <h3 className="text-3xl font-bold text-gray-900">
              {getMessage('Pg001', 'pg001_intro_title')}
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {getMessage('Pg001', 'pg001_intro_paragraph')}
            </p>
            <Link href="/Pg003">
              <div className="inline-block mt-4 bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-800 transition">
                View more
              </div>
            </Link>
          </div>

          {/* 图片区域 */}
          <div className="pg001-intro-image">
            <Image
              src="/image/pg001-intro.jpg"
              alt="Intro"
              width={500}
              height={300}
              className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>




      {/* ⭐ Features Section */}
      <section className="pg001-features">
        <SectionTitle text={getMessage('Pg001', 'pg001_features_title')} />
        <div className="pg001-feature-grid">
          <div className="pg001-feature-card">
            <FeatureImage src="/image/pg001-feature1.jpg" alt="Feature 1" />
            <h4>① {getMessage('Pg001', 'pg001_feature1_title')}</h4>
            <p>{getMessage('Pg001', 'pg001_feature1_desc')}</p>
          </div>
          <div className="pg001-feature-card">
            <FeatureImage src="/image/pg001-feature2.jpg" alt="Feature 2" />
            <h4>② {getMessage('Pg001', 'pg001_feature2_title')}</h4>
            <p>{getMessage('Pg001', 'pg001_feature2_desc')}</p>
          </div>
          <div className="pg001-feature-card">
            <FeatureImage src="/image/pg001-feature3.jpg" alt="Feature 3" />
            <h4>③ {getMessage('Pg001', 'pg001_feature3_title')}</h4>
            <p>{getMessage('Pg001', 'pg001_feature3_desc')}</p>
          </div>
        </div>
      </section>


      {showTop && (
        <button className="top-btn" onClick={scrollToTop}>↑</button>
      )}
    </main>
  );
};

export default Pg001;
