'use client';

import './Pg002.css';
import Image from 'next/image';
import { useMessage } from '@/lib/useMessage';
import { useEffect, useState } from 'react';



const Pg002: React.FC = () => {

  const getMessage = useMessage();
  const paragraphLines = getMessage('Pg002', 'pg002_summary_items');

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
    <div className="pg002-container">
      {/* 🔖 Summary Section */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <Image
          src="/image/pg002-bktop.jpg"
          alt="Summary Background"
          fill
          className="object-cover w-full h-full"
        />
      </div>
      {showDown && (
        <button className="scroll-down-btn" onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}>
          ↓
        </button>
      )}


      <div className="pg002-textbox">
        <h2 className="pg002-title">{getMessage('Pg002', 'pg002_title')}</h2>
        <div className="pg002-textcontent">
          {Array.isArray(paragraphLines) &&
            paragraphLines.map((item, idx) => {
              if (item.type === 'title') {
                return <h3 key={idx} className="section-title">{item.text}</h3>;
              } else {
                return <p key={idx} className="section-item">{item.text}</p>;
              }
            })}
        </div>


      </div>


      {showTop && (
        <button className="top-btn" onClick={scrollToTop}>↑</button>
      )}
    </div>
  );
};

export default Pg002;
