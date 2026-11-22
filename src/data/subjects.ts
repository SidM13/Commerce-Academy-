import { BarChart3, Briefcase, Calculator, LineChart, Receipt, Scale, type LucideIcon } from 'lucide-react';

export interface SubjectCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  items: string[];
  programs: string[];
}

/** Subject categories exactly as listed on the AGCA poster. */
export const subjectCategories: SubjectCategory[] = [
  {
    id: 'taxation',
    name: 'Taxation',
    icon: Receipt,
    description:
      'Understand direct and indirect tax concepts, computations and provisions with step-by-step guidance.',
    items: ['Income Tax', 'Goods and Services Tax (GST)', 'Indirect Tax', 'Corporate Tax'],
    programs: ['B.Com', 'M.Com', 'CA', 'CMA', 'ICWA'],
  },
  {
    id: 'accountancy',
    name: 'Accountancy',
    icon: Calculator,
    description:
      'From journal entries to corporate financial statements and costing — build accuracy and conceptual depth.',
    items: ['Financial Accounting', 'Corporate Accounting', 'Cost Accounting', 'Management Accounting'],
    programs: ['Class 11–12', 'B.Com', 'BBA', 'M.Com', 'CA', 'CMA', 'ICWA'],
  },
  {
    id: 'statistics',
    name: 'Statistics & Quantitative Studies',
    icon: BarChart3,
    description:
      'Develop comfort with numbers through structured practice in quantitative techniques and business mathematics.',
    items: ['Quantitative Techniques', 'Business Mathematics'],
    programs: ['B.Com', 'BBA', 'MBA', 'CA', 'CMA'],
  },
  {
    id: 'management',
    name: 'Management',
    icon: Briefcase,
    description:
      'Grasp management frameworks and their real-world application across projects, markets and resources.',
    items: ['Project Management', 'Marketing Management', 'Resource Management'],
    programs: ['BBA', 'MBA', 'M.Com'],
  },
  {
    id: 'economics',
    name: 'Economics & Research',
    icon: LineChart,
    description:
      'Make sense of economic theory, econometric models and research design with clear, practical explanations.',
    items: ['Economics', 'Econometrics', 'Operations Research', 'Research Methodology'],
    programs: ['Class 11–12', 'B.Com', 'M.Com', 'MBA', 'CA', 'CMA'],
  },
  {
    id: 'laws',
    name: 'Business Laws & Communication',
    icon: Scale,
    description:
      'Learn legal provisions, corporate regulations and professional communication with a clear, structured approach.',
    // "ESSB" retained exactly as printed on the poster — pending confirmation of its full form.
    items: ['Business Law', 'Corporate Law', 'Business Communication', 'International Trade', 'ESSB'],
    programs: ['B.Com', 'BBA', 'M.Com', 'MBA', 'CA', 'CMA'],
  },
];
