import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookMarked, Globe, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { Seo } from '../components/Seo';
import { CtaBand } from '../components/CtaBand';
import { ButtonLink, ExternalButton, Reveal, SealBadge, SectionHeading, WhatsAppIcon } from '../components/ui';
import { features } from '../data/features';
import { homeCourses, levelShort } from '../data/courses';
import { subjectCategories } from '../data/subjects';
import { site, telHref } from '../data/site';
import { defaultWaMessage, waLink } from '../lib/whatsapp';
import { B } from '../lib/base';

const programPills = ['11th & 12th (Com.)', 'B.Com', 'M.Com', 'BBA', 'MBA', 'CA', 'CMA', 'ICWA'];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="bg-grid-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
      <div className="absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-teal/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />

      <div className="container-site relative grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.08fr_1fr] lg:gap-14 lg:pb-24 lg:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-50 px-3.5 py-1.5 text-xs font-semibold text-gold-600">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> {site.tagline}
          </p>
          <h1 className="mt-5 text-[2.15rem] font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
            Building Strong Foundations for{' '}
            <span className="bg-gradient-to-r from-burgundy to-[#B23A55] bg-clip-text text-transparent">Academic</span>{' '}
            &amp; <span className="text-teal">Professional Success</span>
          </h1>
          <p className="mt-5 text-lg font-medium leading-relaxed text-navy/85 sm:text-xl">
            Personalized Commerce Education for Classes 11–12, B.Com, M.Com, BBA, MBA, CA, CMA and More.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
            Tell us your course or subject, and we&rsquo;ll help you find the right academic support with experienced
            educators, structured learning resources, and personalized attention.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/courses" size="lg">
              Explore Our Courses <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/enquiry" variant="outline" size="lg">
              Get Free Course Guidance
            </ButtonLink>
          </div>
          <ul className="mt-9 flex flex-wrap gap-2" aria-label="Programs we support">
            {programPills.map((p) => (
              <li key={p} className="rounded-full bg-navy/[0.05] px-3 py-1 text-xs font-semibold text-navy/75">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
          <div className="absolute -inset-3 -z-0 rotate-2 rounded-[2rem] bg-gradient-to-br from-gold via-burgundy to-navy opacity-90" aria-hidden="true" />
          <picture>
            <img
              src={`${B}images/hero-ganesha-800.webp`}
              srcSet={`${B}images/hero-ganesha-480.webp 480w, ${B}images/hero-ganesha-800.webp 800w, ${B}images/hero-ganesha-1057.webp 1057w`}
              sizes="(min-width: 640px) 448px, 384px"
              width={1057}
              height={1350}
              alt="Golden idol of Lord Ganesha adorned with marigold garlands, with lit diyas in front"
              className="relative aspect-[1057/1350] w-full rounded-[1.75rem] object-cover shadow-lift"
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

function BeyondAcademics() {
  const corner = 'absolute h-7 w-7 border-navy sm:h-9 sm:w-9';
  return (
    <figure
      className="relative flex h-full flex-col overflow-hidden rounded-2xl shadow-lift"
      aria-labelledby="beyond-heading"
      style={{
        background:
          'linear-gradient(160deg, #FF9933 0%, #FFB566 14%, #FFF3E2 34%, #FFFFFF 50%, #EAF6E6 66%, #7CC46B 86%, #138808 100%)',
      }}
    >
      <div className="flex flex-1 flex-col px-6 pb-6 pt-8 sm:px-10 sm:pt-10">
        <h3
          id="beyond-heading"
          className="border-b-2 border-burgundy/70 pb-4 text-center font-display text-2xl font-extrabold uppercase tracking-[0.08em] text-navy sm:text-3xl"
        >
          Beyond Academics
        </h3>
        <div className="relative mt-7 flex flex-1 items-center border-2 border-navy p-1.5">
          <div className="relative flex h-full w-full items-center border border-navy px-5 py-10 sm:px-9 sm:py-14">
            <span className={`${corner} -left-px -top-px border-b-2 border-r-2`} aria-hidden="true" />
            <span className={`${corner} -right-px -top-px border-b-2 border-l-2`} aria-hidden="true" />
            <span className={`${corner} -bottom-px -left-px border-r-2 border-t-2`} aria-hidden="true" />
            <span className={`${corner} -bottom-px -right-px border-l-2 border-t-2`} aria-hidden="true" />
            <blockquote className="font-display text-lg font-bold leading-snug text-navy sm:text-[1.4rem] sm:leading-[1.4]">
              We believe that it is our responsibility to develop not only good students, professionals &amp; managers,
              rather to develop good humans and citizens to meet the vision of India 2047. Along with learning
              academics, we ensure to develop skills in students and nurture values in them to finally meet the goal of
              making India the global India.
            </blockquote>
          </div>
        </div>
        <figcaption className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-navy">
          <Globe className="h-4 w-4" aria-hidden="true" /> {site.websiteDisplay}
        </figcaption>
      </div>
    </figure>
  );
}

function WhyAgca() {
  return (
    <section id="why-agca" className="scroll-mt-28 bg-mist py-20 sm:py-24" aria-labelledby="why-heading">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="Why choose AGCA"
            title={<span id="why-heading">Everything you need to learn with confidence</span>}
            intro="A focused learning environment built around personal attention, structured resources and continuous support."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <Reveal className="h-full">
            <BeyondAcademics />
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <li key={f.title}>
                <Reveal delay={(i % 2) * 0.06} className="h-full">
                  <div className="card group relative h-full overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <span className="absolute right-5 top-5 font-display text-sm font-bold text-navy/15" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold transition-colors duration-300 group-hover:bg-burgundy group-hover:text-white">
                      <f.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-base font-bold leading-snug">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.text}</p>
                    <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-burgundy via-gold to-teal transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <div className="card mt-8 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <span className="flex shrink-0 items-center sm:border-r sm:border-gold/50 sm:pr-8">
              <MessageSquare className="h-10 w-10 text-gold" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="text-xl font-extrabold sm:text-2xl">Have a question or want to know more?</h3>
              <p className="mt-1 text-slate-600">Get in touch with AGCA and we&rsquo;ll be happy to guide you.</p>
            </div>
            <ButtonLink to="/enquiry" size="lg" className="!bg-teal hover:!bg-teal-600">
              Send an Enquiry <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PopularCourses() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="courses-heading">
      <div className="container-site">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Popular courses"
              title={<span id="courses-heading">Commerce tuition for every stage</span>}
              intro="From school-level commerce to professional certifications — personalized support across the programmes students need most."
            />
            <ButtonLink to="/courses" variant="outline" className="shrink-0">
              View all courses <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {homeCourses.map((c, i) => (
            <li key={c.key}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <article className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-lift">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal-600">
                      {levelShort[c.level]}
                    </span>
                    <span className="font-display text-lg font-extrabold text-burgundy">{c.shortName}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-snug">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.overview}</p>
                  {c.subjects.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Subject areas for ${c.shortName}`}>
                      {c.subjects.slice(0, 4).map((s) => (
                        <li key={s} className="rounded-md bg-mist px-2 py-1 text-xs text-navy/75">
                          {s}
                        </li>
                      ))}
                      {c.subjects.length > 4 && (
                        <li className="rounded-md px-2 py-1 text-xs text-slate-500">+{c.subjects.length - 4} more</li>
                      )}
                    </ul>
                  )}
                  <div className="mt-auto pt-6">
                    <Link
                      to={c.enquiryHref}
                      className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-burgundy hover:gap-2.5 hover:text-burgundy-600"
                      aria-label={`Enquire about ${c.name}`}
                    >
                      Enquire About This Course <ArrowRight className="h-4 w-4 transition-all" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SubjectsPreview() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-24" aria-labelledby="subjects-heading">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-teal/20 blur-3xl" aria-hidden="true" />
      <div className="container-site relative">
        <Reveal>
          <SectionHeading
            invert
            eyebrow="Subjects we teach"
            title={<span id="subjects-heading">Specialised support across commerce disciplines</span>}
            intro="Taxation, accountancy, statistics, management, economics and business law — taught with clarity and care."
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjectCategories.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <Link
                  to={`/subjects#${s.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:border-gold/40 hover:bg-white/[0.08]"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold !text-white">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{s.items.join(' · ')}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink to="/subjects" variant="light">
            <BookMarked className="h-4 w-4" aria-hidden="true" /> Explore all subjects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="pb-20" aria-label="Quick contact">
      <div className="container-site">
        <div className="card grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto]">
          <SealBadge size="md" className="hidden sm:flex" />
          <div>
            <h2 className="text-2xl font-extrabold">Speak With an Academic Advisor</h2>
            <p className="mt-2 text-slate-600">
              Serving students in Faridabad &amp; Gurugram (Gurgaon). Ask about your subject, learning mode or batch availability — we&rsquo;re a call or message away.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ExternalButton href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer" variant="whatsapp">
              <WhatsAppIcon /> Enquire on WhatsApp
            </ExternalButton>
            <ExternalButton href={telHref} variant="outline">
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phoneDisplay}
            </ExternalButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="Asha Gyan Commerce Academy (AGCA) | Commerce Tuition in Faridabad & Gurugram"
        description="Personalized commerce tuition in Faridabad and Gurugram (Gurgaon) for Classes 11–12, B.Com, M.Com, BBA, MBA, CA and CMA. Accountancy, taxation, business studies and more with experienced teachers and small batches."
      />
      <Hero />
      <WhyAgca />
      <PopularCourses />
      <SubjectsPreview />
      <CtaBand />
      <ContactStrip />
    </>
  );
}
