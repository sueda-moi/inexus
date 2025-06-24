export interface Department {
  title: string;
  children?: string[];
}

export interface OrgChartData {
  ceo: string;
  departments: Department[];
}
