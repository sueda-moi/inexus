// src/components/common/PageHero.tsx

import React from 'react';
import styles from './PageHero.module.css';

type PageHeroProps = {
  title: string;
  subtitle: string;
};

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className={styles.pageHeroSection}>
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;