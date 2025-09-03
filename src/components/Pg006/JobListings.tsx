import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './JobListings.module.css';
import { useMessage } from '@/lib/useMessage';


type JobForList = {
  title: string;
  tags: string[];
  image: string;
  href: string; 
};


type JobListingsProps = {
  jobs: JobForList[];
};

const JobListings = ({ jobs }: JobListingsProps) => {
  const getMessage = useMessage(); 
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {jobs.map((job) => (
          <article key={job.href} className={styles.jobCard}>
            <div className={styles.imageWrapper}>
              <Image src={job.image} alt={job.title} width={150} height={150} className={styles.jobImage} />
            </div>
            <div className={styles.contentWrapper}>
              <h3 className={styles.jobTitle}>{job.title}</h3>
              <div className={styles.tagsContainer}>
                {job.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <Link href={job.href} className={styles.readMoreButton}>
                {getMessage('common', 'common_read_more')}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default JobListings;