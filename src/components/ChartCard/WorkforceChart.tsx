'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { threeYearPlanData } from '@/data/threeYearPlan';
import { ChartCard } from './ChartCard';
import styles from './WorkforceChart.module.css';
import { useMessage } from '@/lib/useMessage';

export default function WorkforceChart() {
  const getMessage = useMessage();
  const title = getMessage('Pg004', 'pg004_chart_workforce_title');
  const unit = getMessage('Pg004', 'pg004_chart_axis_workforce_unit');
  const labelEmployees = getMessage('Pg004', 'pg004_chart_legend_employees');
  const labelContractors = getMessage('Pg004', 'pg004_chart_legend_contractors');
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
          <Legend />
          <Bar
            dataKey="employees"
            stackId="a"
            fill="#60a5fa"
            name={labelEmployees}
            className={styles['chart-bar']}
          />
          <Bar
            dataKey="contractors"
            stackId="a"
            fill="#818cf8"
            name={labelContractors}
            className={styles['chart-bar']}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
