import Image from 'next/image';
import { useMessage } from '@/lib/useMessage';
import './GreetingSection.css';

export const GreetingSection = () => {
    const t = useMessage();
    const paragraphs = t('about', 'greeting_paragraphs');

    return (
<section className="greeting-section">
      <h2 className="greeting-title">{t('about', 'greeting_title')}</h2>
      <div className="greeting-paragraphs">
        {Array.isArray(paragraphs)
          ? paragraphs.map((line, idx) => (
              <p key={idx} className="greeting-text">{line}</p>
            ))
          : <p className="greeting-text">{paragraphs}</p>}
      </div>
      <div className="greeting-signature">
        <Image
          src="/image/pg002-signature.png"
          alt={t('about', 'signature_image_alt')}
          width={160}
          height={60}
          className="signature-image"
        />
      </div>
    </section>
    );
};
