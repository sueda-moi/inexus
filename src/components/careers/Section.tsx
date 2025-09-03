import React from 'react';
import styles from './Section.module.css'; 

type SectionProps = {
  title: string;
  content: string[];
  isList?: boolean;
};

const Section = ({ title, content, isList = false }: SectionProps) => (
  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    {isList ? (
      <ul className={styles.list}>
        {content.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    ) : (
      <p className={styles.description}>{content[0]}</p>
    )}
  </section>
);

export default Section;