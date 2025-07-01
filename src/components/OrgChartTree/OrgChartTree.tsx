// 'use client';

// import React from 'react';
// import './OrgChartHTML.css';
// import { useMessage } from '@/lib/useMessage';
// import type { OrgChartData } from '@/types/Pg004';

// const OrgChartHTML: React.FC = () => {
//   const getMessage = useMessage();
//    const chart = getMessage('Pg003', 'pg003_orgchart_data') as unknown as OrgChartData;

//   if (!chart || !chart.ceo || !chart.departments) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="org-chart-wrapper">
//       <div className="org-chart-container">
//         {/* 第一层 */}
//         <div className="org-level">
//           <div className="org-node root">{chart.ceo}</div>
//         </div>

//         {/* 第二层 */}
//         <div className="org-line vertical"></div>
//         <div className="org-level second">
//           {chart.departments.map((dept, index) => (
//             <div key={index} className={`org-node ${dept.children ? 'has-children' : ''}`}>
//               {dept.children ? (
//                 <>
//                   <div className="org-title">{dept.title}</div>
//                   <div className="org-children">
//                     {dept.children.map((child: string, i: number) => (
//                       <div key={i} className="org-node">{child}</div>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 dept.title
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrgChartHTML;
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
        {/* CEO */}
        <div className="orgchart-ceo">{chart.ceo}</div>

        {/* 纵向连线 */}
        <div className="orgchart-vertical-line" />

        {/* 第二层：所有部门 */}
        <div className="orgchart-departments-wrapper">
          {/* 顶部横线连所有部门 */}
          <div className="orgchart-horizontal-line" />
          <div className="orgchart-departments">
            {chart.departments.map((dept, index) => (
              <div className="orgchart-department-block" key={index}>
                {/* 向下连线 */}
                <div className="orgchart-line-down" />
                {/* 部门名称 */}
                <div className="orgchart-department-title">
                  {dept.title.split('').map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </div>

                {/* 子项区域 */}
                {dept.children && (
                  <>
                    <div className="orgchart-line-down small" />
                    <div className="orgchart-children">
                      <div className="orgchart-children-connector" />
                      {dept.children.map((child, j) => (
                        <div key={j} className="orgchart-child-block">
                          <div className="orgchart-line-to-child" />
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



