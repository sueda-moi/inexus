'use client';

import React from 'react';
import './OrgChartHTML.css';
import { useMessage } from '@/lib/useMessage';
import type { OrgChartData } from '@/types/Pg004';

const OrgChartHTML: React.FC = () => {
  const getMessage = useMessage();
   const chart = getMessage('Pg004', 'pg004_orgchart_data') as unknown as OrgChartData;

  if (!chart || !chart.ceo || !chart.departments) {
    return <div>Loading...</div>;
  }
  return (
    <div className="org-chart-wrapper">
      <div className="org-chart-container">
        {/* 第一层 */}
        <div className="org-level">
          <div className="org-node root">{chart.ceo}</div>
        </div>

        {/* 第二层 */}
        <div className="org-line vertical"></div>
        <div className="org-level second">
          {chart.departments.map((dept, index) => (
            <div key={index} className={`org-node ${dept.children ? 'has-children' : ''}`}>
              {dept.children ? (
                <>
                  <div className="org-title">{dept.title}</div>
                  <div className="org-children">
                    {dept.children.map((child: string, i: number) => (
                      <div key={i} className="org-node">{child}</div>
                    ))}
                  </div>
                </>
              ) : (
                dept.title
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgChartHTML;
