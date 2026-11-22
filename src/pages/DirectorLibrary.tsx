import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronUp, UserRound } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/ui';
import { btn } from '../components/btn';
import { B } from '../lib/base';

const director = {
  name: 'Dr. Savita Manchanda',
  /** Set to an image path (e.g. '/images/director.webp') once the real photograph is supplied. */
  photo: `${B}images/director-savita-manchanda.webp` as string | null,
};

const sections = [
  { id: 'directors-message', label: 'Director’s Message' },
  { id: 'library-resource-centre', label: 'Library Resource Centre' },
];

function GoldRule({ invert = false }: { invert?: boolean }) {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="h-0.5 flex-1 bg-gold" />
      <BookOpen className={`h-7 w-7 ${invert ? 'text-gold' : 'text-gold'}`} strokeWidth={1.75} />
      <span className="h-0.5 flex-1 bg-gold" />
    </div>
  );
}

/** Left-hand timeline nav that highlights the section in view. */
function SectionNav() {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav aria-label="On this page" className="relative">
      <span className="absolute bottom-3 left-[7px] top-3 w-0.5 bg-teal" aria-hidden="true" />
      <ul className="space-y-6">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="relative pl-7">
              <span
                className={`absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-teal ${on ? 'bg-teal' : 'bg-white'}`}
                aria-hidden="true"
              />
              <a
                href={`#${s.id}`}
                aria-current={on ? 'true' : undefined}
                className={`block rounded-xl px-3 py-2 font-display text-[15px] font-bold leading-snug text-teal-600 transition-colors ${
                  on ? 'bg-teal-50' : 'hover:bg-teal-50/60'
                }`}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function DirectorLibrary() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Seo
        path="/director-library"
        title="Director’s Message & Library Resource Centre"
        description="A message from Dr. Savita Manchanda, Director of Asha Gyan Commerce Academy, and an overview of our Library Resource Centre (LRC) with commerce and management books."
      />

      {/* Header band */}
      <section className="bg-navy">
        <div className="container-site py-12 text-center sm:py-14">
          <h1 className="text-3xl font-extrabold !text-white sm:text-5xl">Guided Reading Journey</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            A message from the Director and a closer look at our Library Resource Centre (LRC)
          </p>
          <div className="mx-auto mt-7 max-w-3xl">
            <GoldRule invert />
          </div>
        </div>
      </section>

      {/* Director's message */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[190px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-36 border-r-2 border-gold/60 pr-6">
              <SectionNav />
            </div>
          </aside>

          <div id="directors-message" className="scroll-mt-32">
            <div className="flex items-center gap-6">
              <h2 className="shrink-0 text-3xl font-extrabold !text-burgundy sm:text-4xl">Director&rsquo;s Message</h2>
              <span className="hidden h-0.5 flex-1 bg-gold sm:block" aria-hidden="true" />
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-[260px_1fr]">
              <Reveal>
                <figure className="mx-auto w-full max-w-[260px]">
                  {director.photo ? (
                    <img
                      src={director.photo}
                      alt={`Portrait of ${director.name}, Director`}
                      width={280}
                      height={362}
                      className="aspect-[280/362] w-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className="flex aspect-[13/17] w-full flex-col items-center justify-center border-2 border-dashed border-navy/20 bg-mist p-6 text-center"
                      data-placeholder="true"
                    >
                      <UserRound className="h-14 w-14 text-navy/25" aria-hidden="true" />
                      <p className="mt-3 text-sm font-semibold text-navy/60">Director&rsquo;s photograph</p>
                      <p className="mt-1 text-xs text-slate-500">To be added</p>
                    </div>
                  )}
                  <figcaption className="bg-navy px-4 py-2.5 text-center font-display font-bold text-white">
                    {director.name}
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.06}>
                <div>
                  <blockquote className="relative border-b-2 border-gold/70 pb-5 pl-8 pr-6">
                    <span className="absolute left-0 top-0 font-serif text-5xl leading-none text-burgundy" aria-hidden="true">
                      &ldquo;
                    </span>
                    <p className="font-display text-lg font-bold italic leading-relaxed text-navy sm:text-xl">
                      If you are planning for a year, sow rice;
                      <br />
                      If you are planning for a decade, plant trees;
                      <br />
                      If you are planning for a lifetime, educate people.
                    </p>
                    <span className="absolute bottom-3 right-0 font-serif text-5xl leading-none text-burgundy" aria-hidden="true">
                      &rdquo;
                    </span>
                  </blockquote>

                  <p className="mt-6 font-display text-lg font-bold">Dear Students,</p>
                  <div id="director-letter" className="mt-3 space-y-4 leading-relaxed text-slate-700">
                    <p>
                      All quality institutions are the outcome of vision, ideas, aspirations and dreams of some dedicated
                      and enterprising dynamic persons who thought beyond today towards a better and brighter tomorrow.
                      Asha Gyan Commerce Academy was also conceptualized by a visionary person and accompanied team of
                      committed and caring people who have been planning{expanded ? '' : '…'}
                    </p>
                    {expanded && (
                      <div
                        className="rounded-xl border-2 border-dashed border-navy/15 bg-mist p-5 text-sm text-slate-600"
                        data-placeholder="true"
                      >
                        The remainder of the Director&rsquo;s message will be added here once the full text is provided.
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls="director-letter"
                    onClick={() => setExpanded((v) => !v)}
                    className={btn('secondary', 'md', 'mt-6')}
                  >
                    {expanded ? (
                      <>
                        Show less <ChevronUp className="h-4 w-4" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Continue reading <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Library Resource Centre */}
      <section
        id="library-resource-centre"
        className="scroll-mt-28 border-t-4 border-gold bg-navy py-14 sm:py-16"
        aria-labelledby="lrc-heading"
      >
        <div className="container-site">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <img
                src={`${B}images/lrc-saraswati.webp`}
                alt="Illustration of Goddess Saraswati, the goddess of knowledge, rising from an open book"
                width={428}
                height={419}
                loading="lazy"
                decoding="async"
                className="mx-auto w-full max-w-md rounded-sm shadow-lift"
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div>
                <h2 id="lrc-heading" className="text-3xl font-extrabold leading-tight !text-white sm:text-4xl">
                  Our LRC
                  <br />
                  (Library Resource Centre)
                </h2>
                <span className="mt-5 block h-0.5 w-full max-w-md bg-gold" aria-hidden="true" />
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
                  Our well stocked library provides access to a wide range of commerce and management books covering all
                  subjects. The effective use of library services is well assured at the Asha Gyan Commerce Academy.
                </p>
                <Link
                  to="/enquiry"
                  className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-6 font-semibold text-burgundy shadow-sm transition-colors hover:bg-gold-50"
                >
                  Ask About the LRC <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="mt-14">
            <GoldRule invert />
          </div>
        </div>
      </section>
    </>
  );
}
