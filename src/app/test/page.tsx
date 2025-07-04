'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const data = [
  { year: '2023年', revenue: 18.5 },
  { year: '2024年', revenue: 21 },
  { year: '2025年', revenue: 25 },
];

export default function TestPage() {
  return (
    <div style={{ width: '100%', height: '400px', background: 'white' }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
