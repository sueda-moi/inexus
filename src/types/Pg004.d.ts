export interface Department {
  title: string;
  children?: string[];
}

export interface OrgChartData {
  ceo: string;
  departments: Department[];
}

export type Project = {
  title: string;
  responsibility: string;
  phase: string;
  technology: string;
};

export type BusinessField = {
  category: string;
  projects: Project[];
};

export type ProjectLabels = {
  project_name: string;
  role: string;
  phase: string;
  tech_stack: string;
};

export interface ThreeYearPlanItem {
  year: string;
  title: string;
  details: string[];
}

export interface Service {
  title: string;
  desc: string;
  fields?: Pg004ServiceField[]; // Always an array of FieldItem like objects
}

export interface Pg004ServiceField {
  type: 'subheader' | 'item'; // Renamed 'title' to 'subheader' for clarity
  text: string;
}
