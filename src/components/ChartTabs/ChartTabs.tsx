'use client';

import { useState } from 'react';
import { useMessage } from '@/lib/useMessage';
import RevenueChart from '../ChartCard/RevenueChart';
import WorkforceChart from '../ChartCard/WorkforceChart';
import styles from './ChartTabs.module.css';

export default function ChartTabs() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'workforce'>('revenue');
  const getMessage = useMessage();
  const tabLabels = getMessage('Pg004', 'pg004_chart_tabs') as unknown as Record<string, string>;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={styles['tab-buttons']}>
        <button
          className={`${styles['tab-button']} ${activeTab === 'revenue' ? styles['active'] : ''}`}
          onClick={() => setActiveTab('revenue')}
        >
          {tabLabels.revenue}
        </button>
        <button
          className={`${styles['tab-button']} ${activeTab === 'workforce' ? styles['active'] : ''}`}
          onClick={() => setActiveTab('workforce')}
        >
          {tabLabels.workforce}
        </button>
      </div>

      {activeTab === 'revenue' && <RevenueChart />}
      {activeTab === 'workforce' && <WorkforceChart />}
    </div>
  );
}
