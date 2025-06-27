'use client';

import React from 'react';
import './SectionTitle.css';

type SectionTitleProps = {
  text: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ text }) => {
  return <h2 className="section-title">{text}</h2>;
};

export default SectionTitle;
