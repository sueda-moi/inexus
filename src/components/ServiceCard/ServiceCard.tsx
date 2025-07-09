import styles from './ServiceCard.module.css';
import { useMessage } from '@/lib/useMessage';
import { Pg004ServiceField } from '@/types/Pg004';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
type Props = {
    title: string;
    desc: string;
    fields?: Pg004ServiceField[];
};

const ServiceCard: React.FC<Props> = ({ title, desc, fields }) => {
    const getMessage = useMessage();
    const [isOpen, setIsOpen] = useState(false);

  // Helper function to render the 'fields' based on their structure
  const renderServiceFields = (fieldData?: Pg004ServiceField[]) => { // Type is now consistent
    if (!fieldData || fieldData.length === 0) {
      return null;
    }

    const elements: React.ReactNode[] = [];
    let currentListItems: React.ReactElement[] = [];

    // Loop through each item, knowing it's always an object with 'type' and 'text'
    fieldData.forEach((item, idx) => {
      if (item.type === 'subheader') { // Check for 'subheader' type
        if (currentListItems.length > 0) {
          elements.push(
            <ul key={`list-group-${idx}-prev`} className={styles.itemList}>
              {currentListItems}
            </ul>
          );
          currentListItems = [];
        }
        elements.push(
          <h4 key={idx} className={styles.fieldTitle}>
            {item.text}
          </h4>
        );
      } else if (item.type === 'item') {
        currentListItems.push(
          <li key={idx} className={styles.fieldItem}>
            {item.text}
          </li>
        );
      }
    });

    if (currentListItems.length > 0) {
      elements.push(
        <ul key="final-list-group" className={styles.itemList}>
          {currentListItems}
        </ul>
      );
    }
    return elements;
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>

      {/* The `fields` prop is now guaranteed to be an array of objects if present */}
      {fields && fields.length > 0 && (
        <details className={styles.details} open={isOpen} onToggle={() => setIsOpen(!isOpen)}>
          <summary className={styles.summary}>
            {isOpen ? getMessage('Pg004', 'pg004_hide_details') : getMessage('Pg004', 'pg004_view_details')}
            {isOpen ? <ChevronUp className={styles.icon} /> : <ChevronDown className={styles.icon} />}
          </summary>
          <div className={styles.detailContent}>
            {renderServiceFields(fields as unknown as Pg004ServiceField[])} {/* Type assertion or cast needed here */}
          </div>
        </details>
      )}
    </div>
  );
};

export default ServiceCard;
