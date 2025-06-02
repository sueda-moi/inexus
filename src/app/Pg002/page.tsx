'use client';

import './Pg002.css';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useMessage } from '@/lib/useMessage';

// ⚙️ Lottie animation (disabled SSR for client-side only)
const ScrollLottie = dynamic(() => import('@/components/ScrollLottie/ScrollLottie'), { ssr: false });
const Pg002: React.FC = () => {
  const sectionTeamRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const getMessage = useMessage();
  const paragraphLines = getMessage('Pg002', 'pg002_summary_items');

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
    <div className="container">
      {/* 🔖 Summary section */}
      <div className="flex w-full h-screen pb-[60px] relative  mb-8">
        <Image
          src="/image/pg002-bktop.jpg"
          alt="Summary Image"
          fill
          className="w-full block object-cover z-[100]"
        />
        <div className="flex w-full h-[60vh] justify-center gap-[2rem]  pt-[15rem] px-[7.5rem] z-[101] relative">

          <section className="sectiontext">
            <h2 className="pg002-title">{getMessage('Pg002', 'pg002_title')}</h2>
            <div className="pg002-paragraphs">
              {
                Array.isArray(paragraphLines)
                  ? paragraphLines.map((line, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">{line}</p>
                  ))
                  : <p className="mb-4 leading-relaxed">{paragraphLines}</p>
              }
            </div>
          </section>

        </div>
      </div>
      {/* 👇 まだ最下部でなければ、スクロール誘導アニメーションを表示 */}
      {!isAtBottom && (
        <div className="scroll-lottie-wrapper">
          <ScrollLottie onClick={() => scrollToSection(sectionTeamRef)} />
        </div>
      )}

    </div>
  );
};

export default Pg002;
