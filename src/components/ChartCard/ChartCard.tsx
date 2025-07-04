import React from 'react';
import styles from './ChartCard.module.css';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.container}>{children}</div>
    </div>
  );
};
