'use client';

import React from 'react';
import Image from 'next/image';
import './FeatureImage.css';

type FeatureImageProps = {
  src: string;
  alt: string;
};

const FeatureImage: React.FC<FeatureImageProps> = ({ src, alt }) => {
  return (
    <div className="feature-image-wrapper">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default FeatureImage;
