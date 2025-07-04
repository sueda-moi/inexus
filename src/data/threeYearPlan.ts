// src/data/threeYearPlan.ts

export type ThreeYearPlanEntry = {
  year: string;      
  revenue: number;   
  employees: number;
  contractors: number;
};

export const threeYearPlanData: ThreeYearPlanEntry[] = [
  {
    year: '2023年',
    revenue: 18.5,
    employees: 150,
    contractors: 70,
  },
  {
    year: '2024年',
    revenue: 21.0,
    employees: 160,
    contractors: 100,
  },
  {
    year: '2025年',
    revenue: 25.0,
    employees: 180,
    contractors: 120,
  },
];
