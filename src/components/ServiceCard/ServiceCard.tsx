import styles from './ServiceCard.module.css';
import { useMessage } from '@/lib/useMessage';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
type Props = {
    title: string;
    desc: string;
    fields?: string[];
};

const ServiceCard: React.FC<Props> = ({ title, desc, fields }) => {
    const getMessage = useMessage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.desc}>{desc}</p>

            {fields && fields.length > 0 && (
                <details className={styles.details} open={isOpen} onToggle={() => setIsOpen(!isOpen)}>
                    <summary className={styles.summary}>
                        {isOpen ? getMessage('Pg004', 'pg004_hide_details') : getMessage('Pg004', 'pg004_view_details')}
                        {isOpen ? <ChevronUp className={styles.icon} /> : <ChevronDown className={styles.icon} />}
                    </summary>

                    <div className={styles.detailContent}>
                        {fields.map((f, i) => {

                            return (
                                <div key={i} className={styles.categoryBlock}>
                                    {f}
                                </div>
                            );
                        })}
                    </div>
                </details>
            )}

        </div>
    );
};

export default ServiceCard;
