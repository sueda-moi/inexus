import React from 'react';
import Image from 'next/image';
import styles from './PageHeader.module.css';

type PageHeaderProps = {
  category: string;
  title: string;
  subtitle: string;
  imageUrl: string;
};

const PageHeader = ({ category, title, subtitle, imageUrl }: PageHeaderProps) => {
  return (
    <section className={styles.pageHeader}>
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <p className={styles.category}>{category}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl} 
            alt={title} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image} 
            priority 
          />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;