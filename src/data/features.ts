import {
  BookOpenText,
  ClipboardCheck,
  Compass,
  GraduationCap,
  Languages,
  MonitorPlay,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

export interface Feature {
  title: string;
  text: string;
  icon: LucideIcon;
}

/** The eight key features from the AGCA poster. */
export const features: Feature[] = [
  {
    title: 'Experienced & Qualified Teachers',
    text: 'Learn from educators who explain concepts clearly and guide you through every stage of your syllabus.',
    icon: GraduationCap,
  },
  {
    title: 'Comprehensive Study Material',
    text: 'Structured notes and practice resources designed to support revision and exam preparation.',
    icon: BookOpenText,
  },
  {
    title: 'Small Batches & Personalized Attention',
    text: 'Smaller groups mean more time for your questions and learning at a pace that suits you.',
    icon: UsersRound,
  },
  {
    title: 'State-of-the-Art E-Classrooms',
    text: 'Modern digital classrooms that make explanations more visual, interactive and engaging.',
    icon: MonitorPlay,
  },
  {
    title: 'Weekend Spoken English Classes',
    text: 'Build communication confidence alongside your academics with dedicated weekend sessions.',
    icon: Languages,
  },
  {
    title: 'Career Counselling & Personality Development',
    text: 'Guidance on academic and career choices, plus support in building confidence and soft skills.',
    icon: Compass,
  },
  {
    title: 'Regular Doubt-Clearing Sessions & Test Series',
    text: 'Clear doubts as they arise and track your progress through regular tests and practice.',
    icon: ClipboardCheck,
  },
  {
    title: 'Air-Conditioned Campus with Surveillance',
    text: 'A comfortable, air-conditioned learning space with surveillance for a safe study environment.',
    icon: ShieldCheck,
  },
];
