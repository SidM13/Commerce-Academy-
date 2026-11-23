import {
  Award,
  BookOpenCheck,
  Briefcase,
  HeartHandshake,
  Lightbulb,
  Target,
  UserRound,
  UsersRound,
  Wrench,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { Seo } from '../components/Seo';
import { CtaBand } from '../components/CtaBand';
import { PageHero, Reveal, SectionHeading } from '../components/ui';
import { B } from '../lib/base';

const commitments: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Academic excellence', text: 'High standards of teaching aligned with each student’s curriculum and goals.', icon: Award },
  { title: 'Individual attention', text: 'Small batches so every student’s questions are heard and addressed.', icon: UserRound },
  { title: 'Conceptual understanding', text: 'Learning the “why” behind every concept, not just memorising steps.', icon: Lightbulb },
  { title: 'Practical learning', text: 'Connecting theory to real-world commerce, business and finance.', icon: Wrench },
  { title: 'Career-focused guidance', text: 'Counselling and personality development to support future choices.', icon: Briefcase },
  { title: 'Supportive environment', text: 'A comfortable, safe and encouraging space in which to learn.', icon: HeartHandshake },
];

const pillars = [
  {
    title: 'Our Teaching Philosophy',
    icon: Target,
    text: 'We believe strong foundations lead to lasting success. Teaching at AGCA focuses on clarity of concepts, steady practice and building the confidence students need to apply what they learn.',
  },
  {
    title: 'Our Academic Approach',
    icon: BookOpenCheck,
    text: 'Structured study material, regular doubt-clearing sessions and test series help students revise systematically and track their progress throughout the academic year.',
  },
  {
    title: 'Personalized Learning',
    icon: Sparkles,
    text: 'Every student learns differently. Small batches allow educators to understand individual strengths and gaps, and adapt their guidance accordingly.',
  },
  {
    title: 'Student Support',
    icon: UsersRound,
    text: 'Beyond the syllabus, students can benefit from weekend spoken English classes, career counselling and personality development to grow with confidence.',
  },
];

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        title="About AGCA — Personalized Commerce Education"
        description="Asha Gyan Commerce Academy is committed to academic excellence, individual attention, conceptual understanding and career-focused guidance for commerce students."
      />
      <PageHero
        eyebrow="About AGCA"
        title="Empowering Students Through Personalized Commerce Education"
        intro="Asha Gyan Commerce Academy provides personalized tuitions and academic support for commerce students — from Classes 11–12 through undergraduate, postgraduate and professional programmes."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={`${B}images/students-writing-1024.webp`}
              srcSet={`${B}images/students-writing-640.webp 640w, ${B}images/students-writing-1024.webp 1024w, ${B}images/students-writing-1600.webp 1600w`}
              sizes="(min-width: 1024px) 45vw, 100vw"
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
              alt="A small group of students writing notes together during a class"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading
              align="left"
              eyebrow="Who we are"
              title="A learning space built around the student"
              intro="We bring together experienced and qualified teachers, comprehensive study material and modern e-classrooms in small batches, so that every student receives the attention they need to understand concepts deeply and perform with confidence."
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20" aria-labelledby="commit-heading">
        <div className="container-site">
          <SectionHeading eyebrow="Our commitment" title={<span id="commit-heading">What we stand for</span>} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <div className="card h-full p-6">
                    <c.icon className="h-7 w-7 text-burgundy" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <div className="relative h-full overflow-hidden rounded-2xl border-l-4 border-gold bg-white p-7 shadow-card">
                <p.icon className="h-7 w-7 text-teal" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-extrabold">{p.title}</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
