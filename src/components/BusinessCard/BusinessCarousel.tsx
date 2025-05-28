'use client';

import React from 'react';
import BusinessCard from './BusinessCard';
import './BusinessCard.css';
import { useMessage } from '@/lib/useMessage';
import {
  RealEstateIcon001,
  RealEstateIcon002,
  RealEstateIcon003,
  RealEstateIcon004,
  RealEstateIcon005,
  RealEstateIcon006
} from '@/components/Icons';

const BusinessCarousel: React.FC = () => {
  const getMessage = useMessage();

  const cardData = [
    {
      title: getMessage('services', 'card_Pg0031_title'),
      description: getMessage('services', 'card_Pg0031_desc'),
      iconSrc: <RealEstateIcon001 />,
      href: '/services/Pg0031',
    },
    {
      title: getMessage('services', 'card_Pg0032_title'),
      description: getMessage('services', 'card_Pg0032_desc'),
      iconSrc: <RealEstateIcon002 />,
      href: '/services/Pg0032',
    },
    {
      title: getMessage('services', 'card_Pg0033_title'),
      description: getMessage('services', 'card_Pg0033_desc'),
      iconSrc: <RealEstateIcon003 />,
      href: '/services/Pg0033',
    },
    {
      title: getMessage('services', 'card_Pg0034_title'),
      description: getMessage('services', 'card_Pg0034_desc'),
      iconSrc: <RealEstateIcon004 />,
      href: '/services/Pg0034',
    },
    {
      title: getMessage('services', 'card_Pg0035_title'),
      description: getMessage('services', 'card_Pg0035_desc'),
      iconSrc: <RealEstateIcon005 />,
      href: '/services/Pg0035',
    },
    {
      title: getMessage('services', 'card_Pg0036_title'),
      description: getMessage('services', 'card_Pg0036_desc'),
      iconSrc: <RealEstateIcon006 />,
      href: '/services/Pg0036',
    },
  ];

  return (
    <div className="px-4 py-8">
      <div className="business-grid">
        {/* {cardData.map((card, index) => (
          <div key={index}>
            <BusinessCard {...card} />
          </div>
        ))} */}
        {cardData.map((card, index) => (
          <div key={index} className="h-full">
            <BusinessCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessCarousel;
