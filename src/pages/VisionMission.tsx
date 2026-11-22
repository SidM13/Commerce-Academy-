import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/ui';
import { btn } from '../components/btn';
import { B } from '../lib/base';

/** Double-ruled frame with small square corner ornaments, as on the academy's printed boards. */
function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  const corner = 'absolute h-3.5 w-3.5 border-[1.5px] border-navy bg-white sm:h-4 sm:w-4';
  return (
    <div className={`relative border-[1.5px] border-navy p-[3px] ${className}`}>
      <div className="relative h-full border border-navy/70">
        <span className={`${corner} -left-[5px] -top-[5px]`} aria-hidden="true" />
        <span className={`${corner} -right-[5px] -top-[5px]`} aria-hidden="true" />
        <span className={`${corner} -bottom-[5px] -left-[5px]`} aria-hidden="true" />
        <span className={`${corner} -bottom-[5px] -right-[5px]`} aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

function AcademyName({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold italic tracking-tight text-burgundy ${className}`}>
      Asha Gyan Commerce Academy
    </span>
  );
}

export default function VisionMission() {
  return (
    <>
      <Seo
        path="/vision-mission"
        title="Vision & Mission"
        description="The vision, mission and quality policy of Asha Gyan Commerce Academy — preparing youth to be personally and professionally competent, and contributing to excellence in commerce education."
      />

      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-mist" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-48 -right-40 h-[28rem] w-[40rem] rounded-full bg-mist" aria-hidden="true" />

        <div className="container-site relative py-14 sm:py-20">
          <header className="mx-auto max-w-3xl text-center">
            <p className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-burgundy sm:text-sm">
              <span className="h-px w-10 bg-gold sm:w-16" aria-hidden="true" />
              Asha Gyan Commerce Academy
              <span className="h-px w-10 bg-gold sm:w-16" aria-hidden="true" />
            </p>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">Vision &amp; Mission</h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Our guiding vision and mission that shape our academic purpose and actions.
            </p>
          </header>

          <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Vision + Mission board */}
            <Reveal>
              <article className="border border-navy/25 bg-white p-5 shadow-card sm:p-7">
                <div className="flex items-center justify-center gap-3">
                  <img src={`${B}logo-agca.png`} alt="" width={242} height={242} className="h-12 w-12 sm:h-14 sm:w-14" />
                  <AcademyName className="text-xl sm:text-[1.7rem]" />
                </div>

                <Frame className="mt-5">
                  <section aria-labelledby="vision-heading" className="px-5 py-6 sm:px-7">
                    <h2 id="vision-heading" className="text-center text-xl font-extrabold uppercase tracking-wide !text-burgundy">
                      Vision
                    </h2>
                    <p className="mt-3 leading-loose text-navy/90">
                      To prepare youth for enlightened leading roles in all walks of life, by making them personally and
                      professionally competent and self reliant to face the challenges of life.
                    </p>
                  </section>
                </Frame>

                <Frame className="mt-6">
                  <section aria-labelledby="mission-heading" className="px-5 py-6 sm:px-7">
                    <h2 id="mission-heading" className="text-center text-xl font-extrabold uppercase tracking-wide !text-burgundy">
                      Mission
                    </h2>
                    <p className="mt-3 leading-loose text-navy/90">
                      Mission of the Asha Gyan Commerce Academy is to contribute towards excellence in commerce education
                      to make the society, industry as well as the nation strong in education heritage.
                    </p>
                  </section>
                </Frame>
              </article>
            </Reveal>

            {/* Quality policy board */}
            <Reveal delay={0.08}>
              <article className="border border-navy/25 bg-white p-5 shadow-card sm:p-7" aria-labelledby="quality-heading">
                <Frame>
                  <div className="px-5 py-8 text-center sm:px-8 sm:py-10">
                    <img src={`${B}logo-agca.png`} alt="" width={242} height={242} className="mx-auto h-20 w-20 sm:h-24 sm:w-24" />
                    <AcademyName className="mt-3 block text-2xl sm:text-[1.75rem]" />
                    <h2 id="quality-heading" className="mt-2 text-base font-extrabold uppercase tracking-wide !text-burgundy sm:text-lg">
                      Our Quality Policy
                    </h2>
                    <p className="mt-4 text-left text-lg leading-relaxed text-navy sm:text-xl">
                      To develop high quality professionals who reflect and demonstrate values through continuous efforts
                      and showing enhancement in quality learning.
                    </p>
                  </div>
                </Frame>
              </article>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl bg-mist p-6 shadow-card sm:flex-row sm:items-center sm:gap-8 sm:p-8">
              <h2 className="border-l-4 border-gold pl-5 text-2xl font-extrabold sm:text-3xl">Have a Query?</h2>
              <p className="flex-1 text-slate-600 sm:text-lg">Get in touch with us for more information.</p>
              <Link to="/contact" className={btn('secondary', 'lg')}>
                Contact Us <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
