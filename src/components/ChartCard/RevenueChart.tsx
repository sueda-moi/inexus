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
  const estimatedSuffix = getMessage('Pg004', 'pg004_chart_estimated_suffix');

  return (
    <ChartCard title={title}>
      <ResponsiveContainer>
        <BarChart data={threeYearPlanData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 14 }}
            tickFormatter={(year) =>
              year === '2025' ? `${year}${estimatedSuffix}` : year
            }
          />
          <YAxis tick={{ fontSize: 14 }} unit={unit} />
          <Tooltip
            formatter={(value: number, name: string, props) => {
              const isEstimated = props.payload?.year === '2025';
              return [`${value} ${unit}${isEstimated ? estimatedSuffix : ''}`, name];
            }}
          />
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
