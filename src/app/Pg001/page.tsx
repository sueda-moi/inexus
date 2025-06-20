'use client';

import './Pg001.css';
import Image from 'next/image';
import { useMessage } from '@/lib/useMessage';
import Link from 'next/link';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';


const Pg001: React.FC = () => {
  const getMessage = useMessage();
  const rawNews = getMessage('Pg001', 'pg001_news_items');
  const newsItems: string[] = Array.isArray(rawNews) ? rawNews : [];


  return (
    <main className="pg001-container">
      {/* 🖼️ Hero Section */}
      <section className="pg001-hero">
        <ImageCarousel/>
        <div className="pg001-hero-text">
          <h1>{getMessage('Pg001', 'pg001_title')}</h1>
          <p>{getMessage('Pg001', 'pg001_subtitle')}</p>
        </div>
      </section>

      {/* 📰 News Section */}
      <section className="pg001-news">
        <h2 className="pg001-section-title">{getMessage('Pg001', 'pg001_news_title')}</h2>
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
      <section className="pg001-intro">
        <div className="pg001-intro-text">
          <h3>{getMessage('Pg001', 'pg001_intro_title')}</h3>
          <p>{getMessage('Pg001', 'pg001_intro_paragraph')}</p>
          <Link href="/Pg003"><div className="pg001-intro-more">View More</div></Link>

        </div>
        <div className="pg001-intro-image">
          <Image src="/image/pg002-card.jpg" alt="Intro" width={600} height={400} />
        </div>
      </section>

      {/* ⭐ Features Section */}
      <section className="pg001-features">
        <h2 className="pg001-section-title">{getMessage('Pg001', 'pg001_features_title')}</h2>
        <div className="pg001-feature-grid">
          <div className="pg001-feature-card">
            <Image src="/image/pg0035-dispatch.jpg" alt="Feature 1" className='pg001-feature1-jpg'   width={400} height={250} />
            <h4>① {getMessage('Pg001', 'pg001_feature1_title')}</h4>
            <p>{getMessage('Pg001', 'pg001_feature1_desc')}</p>
          </div>
          <div className="pg001-feature-card">
            <Image src="/image/pg0032-quality.jpg" alt="Feature 2"  className='pg001-feature2-jpg'   width={400} height={250} />
            <h4>② {getMessage('Pg001', 'pg001_feature2_title')}</h4>
            <p>{getMessage('Pg001', 'pg001_feature2_desc')}</p>
          </div>
          <div className="pg001-feature-card">
            <Image src="/image/pg0035-training.jpg" alt="Feature 3"  className='pg001-feature3-jpg'  width={400} height={250} />
            <h4>③ {getMessage('Pg001', 'pg001_feature3_title')}</h4>
            <p>{getMessage('Pg001', 'pg001_feature3_desc')}</p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Pg001;
