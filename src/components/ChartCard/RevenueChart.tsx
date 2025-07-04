'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { threeYearPlanData } from '@/data/threeYearPlan';
import { ChartCard } from './ChartCard';
import { useMessage } from '@/lib/useMessage';

export default function RevenueChart() {
  const getMessage = useMessage();
  const title = getMessage('Pg004', 'pg004_chart_revenue_title');
  const unit = getMessage('Pg004', 'pg004_chart_axis_revenue_unit');

  return (
    <ChartCard title={title}>
      <ResponsiveContainer>
        <BarChart data={threeYearPlanData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} unit={unit} />
          <Tooltip formatter={(value: number) => `${value} ${unit}`} />
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <Bar
            dataKey="revenue"
            fill="url(#revenueGradient)"
            radius={[12, 12, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
