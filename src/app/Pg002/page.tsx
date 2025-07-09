'use client';

import './Pg002.css';
import Image from 'next/image';
import { useMessage } from '@/lib/useMessage';
import { useEffect, useState } from 'react';


// 1. Define the type for a single item from your JSON
interface Pg002SummaryItem {
  type: 'title' | 'des' | 'item'; // 'title', 'des', or 'item' are the only allowed strings for 'type'
  text: string;
}


const Pg002: React.FC = () => {

  const getMessage = useMessage();
  // const paragraphLines = getMessage('Pg002', 'pg002_summary_items');
  const rawParagraphLines = getMessage('Pg002', 'pg002_summary_items');
  let paragraphLines: Pg002SummaryItem[] = []; // Initialize as an empty array

    try {
    // Attempt to parse the raw string into the expected array type
    if (typeof rawParagraphLines === 'string') {
      paragraphLines = JSON.parse(rawParagraphLines) as Pg002SummaryItem[];
    } else if (Array.isArray(rawParagraphLines)) {
      paragraphLines = rawParagraphLines as Pg002SummaryItem[];
    }
  } catch (error) {
    console.error("Failed to parse pg002_summary_items from getMessage:", error);
    
    paragraphLines = [];
  }

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


  // --- Start of the NEW rendering logic for paragraphLines ---
  const renderContent = (data: Pg002SummaryItem[]) => {
    const elements: React.ReactNode[] = [];
    let currentListItems: React.ReactElement[] = []; // To accumulate <li> elements for the current <ul>

    // Ensure data is an array before processing
    if (!Array.isArray(data)) {
      return null; // Or handle error/empty state appropriately
    }

    data.forEach((item, idx) => {
      if (item.type === 'title') {
        // If there are accumulated list items, render the <ul> before the new title
        if (currentListItems.length > 0) {
          elements.push(
            <ul key={`list-group-${idx}-prev`} className="section-item-list">
              {currentListItems}
            </ul>
          );
          currentListItems = []; // Reset for the next list
        }
        elements.push(
          <h3 key={idx} className="section-title">
            {item.text}
          </h3>
        );
      } else if (item.type === 'des') {
        // If there are accumulated list items, render the <ul> before the new description
        if (currentListItems.length > 0) {
          elements.push(
            <ul key={`list-group-${idx}-prev`} className="section-item-list">
              {currentListItems}
            </ul>
          );
          currentListItems = []; // Reset
        }
        elements.push(
          <p key={idx} className="section-description">
            {item.text}
          </p>
        );
      } else if (item.type === 'item') {
        // Add the item to the current list of <li> elements
        currentListItems.push(
          <li key={idx} className="section-item">
            {item.text}
          </li>
        );
      }

    });

    // After the loop, if there are any remaining list items, render the final <ul>
    if (currentListItems.length > 0) {
      elements.push(
        <ul key="final-list-group" className="section-item-list">
          {currentListItems}
        </ul>
      );
    }

    return elements;
  };
  // --- End of the NEW rendering logic ---


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
          {renderContent(paragraphLines)}
        </div>


      </div>


      {showTop && (
        <button className="top-btn" onClick={scrollToTop}>↑</button>
      )}
    </div>
  );
};

export default Pg002;
