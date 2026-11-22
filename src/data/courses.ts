export type CourseLevel = 'school' | 'ug' | 'pg' | 'professional' | 'custom';

export interface Course {
  id: string;
  name: string;
  shortName: string;
  level: CourseLevel;
  overview: string;
  /** Subject areas students in this programme commonly seek support with. Used for filters and enquiry chips. */
  subjects: string[];
}

export const levelLabels: Record<CourseLevel, string> = {
  school: 'School-Level Commerce',
  ug: 'Undergraduate Programs',
  pg: 'Postgraduate Programs',
  professional: 'Professional Programs',
  custom: 'Customized Academic Support',
};

export const levelShort: Record<CourseLevel, string> = {
  school: 'School',
  ug: 'Undergraduate',
  pg: 'Postgraduate',
  professional: 'Professional',
  custom: 'Custom',
};

export const courses: Course[] = [
  {
    id: 'class-11',
    name: 'Class 11 Commerce',
    shortName: 'Class 11',
    level: 'school',
    overview:
      'Build a confident start in commerce with clear fundamentals in accountancy, business studies and economics.',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'],
  },
  {
    id: 'class-12',
    name: 'Class 12 Commerce',
    shortName: 'Class 12',
    level: 'school',
    overview:
      'Focused board-year support with concept revision, regular practice and doubt-clearing across core commerce subjects.',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'],
  },
  {
    id: 'bcom',
    name: 'Bachelor of Commerce (B.Com)',
    shortName: 'B.Com',
    level: 'ug',
    overview:
      'Semester-wise academic support across accounting, taxation, law and quantitative subjects of the B.Com curriculum.',
    subjects: [
      'Financial Accounting',
      'Corporate Accounting',
      'Cost Accounting',
      'Business Law',
      'Income Tax',
      'Goods and Services Tax (GST)',
      'Statistics',
      'Business Mathematics',
      'Economics',
      'Business Communication',
    ],
  },
  {
    id: 'bba',
    name: 'Bachelor of Business Administration (BBA)',
    shortName: 'BBA',
    level: 'ug',
    overview:
      'Guided learning for core BBA papers, from business mathematics and accounting to marketing and communication.',
    subjects: [
      'Business Mathematics',
      'Financial Accounting',
      'Marketing Management',
      'Business Communication',
      'Business Law',
      'Economics',
      'Quantitative Techniques',
    ],
  },
  {
    id: 'mcom',
    name: 'Master of Commerce (M.Com)',
    shortName: 'M.Com',
    level: 'pg',
    overview:
      'Advanced subject support for M.Com students in accounting, taxation, economics and research-oriented papers.',
    subjects: [
      'Corporate Accounting',
      'Management Accounting',
      'Corporate Tax',
      'Econometrics',
      'Research Methodology',
      'International Trade',
      'Business Law',
    ],
  },
  {
    id: 'mba',
    name: 'Master of Business Administration (MBA)',
    shortName: 'MBA',
    level: 'pg',
    overview:
      'Subject-specific tuition for MBA coursework spanning management, marketing, economics and quantitative methods.',
    subjects: [
      'Management',
      'Marketing Management',
      'Economics',
      'Project Management',
      'Resource Management',
      'Operations Research',
      'Research Methodology',
      'Quantitative Techniques',
    ],
  },
  {
    id: 'ca',
    name: 'Chartered Accountancy (CA)',
    shortName: 'CA',
    level: 'professional',
    overview:
      'Structured support for CA aspirants in accounting, taxation, law and quantitative aptitude subjects.',
    subjects: [
      'Financial Accounting',
      'Corporate Accounting',
      'Cost Accounting',
      'Income Tax',
      'Goods and Services Tax (GST)',
      'Corporate Law',
      'Business Law',
      'Business Mathematics',
      'Statistics',
      'Economics',
    ],
  },
  {
    id: 'cma',
    name: 'Cost and Management Accountancy (CMA)',
    shortName: 'CMA',
    level: 'professional',
    overview:
      'Concept-driven tuition for CMA candidates in cost and management accounting, taxation and law.',
    subjects: [
      'Cost Accounting',
      'Management Accounting',
      'Financial Accounting',
      'Income Tax',
      'Indirect Tax',
      'Corporate Law',
      'Operations Research',
      'Business Mathematics',
      'Statistics',
    ],
  },
  {
    id: 'icwa',
    name: 'ICWA / Cost Accountancy',
    shortName: 'ICWA',
    level: 'professional',
    overview:
      'Academic support for students following ICWA / Cost Accountancy syllabi and related cost and management subjects.',
    subjects: [
      'Cost Accounting',
      'Management Accounting',
      'Financial Accounting',
      'Indirect Tax',
      'Corporate Law',
      'Quantitative Techniques',
    ],
  },
  {
    id: 'other',
    name: 'Other Commerce-Related Subjects',
    shortName: 'Other',
    level: 'custom',
    overview:
      "Studying something not listed here? Tell us your course and subject, and we'll help you explore suitable academic support.",
    subjects: [],
  },
];

export const getCourse = (id: string | null | undefined) => courses.find((c) => c.id === id);

/** Every distinct subject across all programmes, sorted alphabetically. */
export const allCourseSubjects = Array.from(new Set(courses.flatMap((c) => c.subjects))).sort();

/** Cards shown on the home page. Classes 11 & 12 are presented together, as on the poster. */
export const homeCourses = [
  {
    key: 'class-11-12',
    name: 'Classes 11 & 12 — Commerce',
    shortName: '11th & 12th',
    level: 'school' as CourseLevel,
    overview:
      'Strong school-level foundations with clear concepts, practice and regular doubt-clearing for commerce students.',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'],
    enquiryHref: '/enquiry?level=class-11-12',
  },
  ...courses
    .filter((c) => c.level !== 'school')
    .map((c) => ({
      key: c.id,
      name: c.name,
      shortName: c.shortName,
      level: c.level,
      overview: c.overview,
      subjects: c.subjects,
      enquiryHref: `/enquiry?course=${c.id}`,
    })),
];
