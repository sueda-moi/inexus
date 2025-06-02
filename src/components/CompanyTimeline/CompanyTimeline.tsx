import { useMessage } from '@/lib/useMessage';
import './CompanyTimeline.css';

export const CompanyTimeline = () => {
    const t = useMessage();

    const raw = t('Pg003', 'history');
    const history: { date: string; event: string }[] = Array.isArray(raw) ? raw : [];


    return (
        <section className="timeline-section">
            <h2 className="timeline-title">{t('Pg003', 'history_title')}</h2>
            <ul className="timeline-list">
                {history.map((item, index) => (
                    <li key={index} className="timeline-item">
                        <div className="timeline-date">{item.date}</div>
                        <div className="timeline-event">{item.event}</div>
                    </li>
                ))}
            </ul>
        </section>
    );
};
