'use client';

import React from 'react';
import './OrgChartTree.css';
import { useMessage } from '@/lib/useMessage';
import type { OrgChartData } from '@/types/Pg004';

const OrgChartTree: React.FC = () => {
  const getMessage = useMessage();
  const chart = getMessage('Pg003', 'pg003_orgchart_data') as unknown as OrgChartData;

  return (
    <div className="orgchart-scroll-wrapper">
      <div className="orgchart-container">
        {/* Top-level CEO */}
        <div className="orgchart-ceo">{chart.ceo}</div>

        {/* Vertical line connecting CEO to departments */}
        <div className="orgchart-vertical-line" />

        {/* Second level: All departments */}
        <div className="orgchart-departments-wrapper">
          {/* Top horizontal line connecting all departments */}
          <div className="orgchart-horizontal-line" />
          <div className="orgchart-departments">
            {chart.departments.map((dept, index) => (
              <div className="orgchart-department-block" key={index}>
                {/* Downward line to department box */}
                <div className="orgchart-line-down" />
                {/* Department title (vertical text) */}
                <div className="orgchart-department-title">
                  {dept.title.split('').map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </div>

                {/* Children section */}
                {dept.children && (
                  <>
                    {/* Line from department to children */}
                    <div className="orgchart-line-down small" />
                    <div className="orgchart-children">
                      {/* Horizontal connector for children */}
                      <div className="orgchart-children-connector" />
                      {dept.children.map((child, j) => (
                        <div key={j} className="orgchart-child-block">
                          {/* Line from connector to each child */}
                          <div className="orgchart-line-to-child" />
                          {/* Child item (vertical text) */}
                          <div className="orgchart-child-box">
                            {child.split('').map((char, k) => (
                              <span key={k}>{char}</span>
                            ))}
                          </div>
                        </div>
                      ))}

                      
                    </div>
                  </>
                )}


                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgChartTree;
