'use client';

import React from 'react';

const OrgChartHTML: React.FC = () => {
  return (
    <div className="org-chart-wrapper">
      <div className="org-chart-container">
        {/* 第一层 */}
        <div className="org-level">
          <div className="org-node root">代表取締役社長</div>
        </div>

        {/* 第二层 */}
        <div className="org-line vertical"></div>
        <div className="org-level second">
          <div className="org-node">経営企画部</div>
          <div className="org-node">営業部</div>
          <div className="org-node has-children">
            <div className="org-title">金融ビジネス部</div>
            <div className="org-children">
              <div className="org-node">勘定系業務</div>
              <div className="org-node">周辺系業務</div>
              <div className="org-node">AWS・サーバ構築など</div>
            </div>
          </div>
          <div className="org-node has-children">
            <div className="org-title">法人ビジネス部</div>
            <div className="org-children">
              <div className="org-node">生保・損保</div>
              <div className="org-node">小口保険など</div>
              <div className="org-node">サーバ構築など</div>
            </div>
          </div>
          <div className="org-node has-children">
            <div className="org-title">ビジネス推進部</div>
            <div className="org-children">
              <div className="org-node">組込み系</div>
              <div className="org-node">成長分野</div>
            </div>
          </div>
          <div className="org-node has-children">
            <div className="org-title">グループ会社戦略室</div>
            <div className="org-children">
              <div className="org-node">ネクスファ株式会社</div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .org-chart-wrapper {
            overflow-x: auto;
          }

          .org-chart-container {
            padding: 2rem;
            font-family: 'Arial', sans-serif;
            min-width: 960px;
          }

          .org-level {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            position: relative;
          }

          .org-line.vertical {
            height: 20px;
            border-left: 2px dashed #cbd5e1;
            margin: auto;
            width: 2px;
          }

          .org-node {
            background: white;
            border: 1.5px solid #2563eb;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            text-align: center;
            color: #1e293b;
            font-size: 0.85rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            min-width: 130px;
          }

          .org-node.root {
            background: #eff6ff;
            font-weight: bold;
            border-color:rgb(251, 2, 2);
            font-size: 1.1rem;
            color: #1e40af;
          }

          .has-children {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
          }

          .org-title {
            background: white;
            border: 1.5px solid #2563eb;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            font-weight: 600;
            color: #1e293b;
          }

          .org-children {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
          }
        `}</style>
      </div>
    </div>
  );
};

export default OrgChartHTML;
