'use client';
import React from 'react';
import Link from 'next/link';
import { useMessage } from '@/lib/useMessage';
import { FiCheckCircle } from 'react-icons/fi';
import styles from './page.module.css';

export default function ApplySuccessPage() {
  const getMessage = useMessage();

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <FiCheckCircle className={styles.icon} />
        <h1 className={styles.title}>
          {getMessage("Pg900", "success_page_title")}
        </h1>
        <p className={styles.message}>
          {getMessage("Pg900", "success_page_message")}
        </p>
        <Link href="/Pg001" className={styles.homeButton}>
          {getMessage("Pg900", "success_page_button")}
        </Link>
      </div>
    </main>
  );
}