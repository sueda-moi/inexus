'use client';

import './Pg002.css';
import Image from 'next/image';
// import dynamic from 'next/dynamic';
// import { useEffect, useRef, useState } from 'react';
import { useMessage } from '@/lib/useMessage';

// ⚙️ 客户端加载 ScrollLottie
// const ScrollLottie = dynamic(() => import('@/components/ScrollLottie/ScrollLottie'), { ssr: false });

const Pg002: React.FC = () => {
  // const sectionTeamRef = useRef<HTMLDivElement>(null);
  // const [isAtBottom, setIsAtBottom] = useState(false);
  const getMessage = useMessage();
  const paragraphLines = getMessage('Pg002', 'pg002_summary_items');

  // 滚动判断是否到底部
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrolledToBottom =
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
  //     setIsAtBottom(scrolledToBottom);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // 平滑滚动到目标区域
  // const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
  //   ref.current?.scrollIntoView({ behavior: 'smooth' });
  // };


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

      {/* 👇 滚动动画 */}
      {/* {!isAtBottom && (
        <div className="scroll-lottie-wrapper" onClick={() => scrollToSection(sectionTeamRef)}>
          <ScrollLottie />
        </div>
      )} */}

      {/* 📍 滚动目标区域 */}
      {/* <div ref={sectionTeamRef} className="pg002-scroll-target">
       
      </div> */}
    </div>
  );
};

export default Pg002;
