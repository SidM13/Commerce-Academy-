import { ArrowRight } from 'lucide-react';
import { ButtonLink, ExternalButton, Reveal, WhatsAppIcon } from './ui';
import { defaultWaMessage, waLink } from '../lib/whatsapp';

/** "Need Help With a Specific Course or Subject?" conversion section. */
export function CtaBand() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="cta-heading">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 sm:px-12 sm:py-16">
            <div className="bg-grid absolute inset-0" aria-hidden="true" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-teal/30 blur-3xl" aria-hidden="true" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="eyebrow !text-gold">Personalized guidance</p>
                <h2 id="cta-heading" className="mt-3 text-3xl font-extrabold leading-tight !text-white sm:text-4xl">
                  Need Help With a Specific Course or Subject?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  Every student&rsquo;s academic journey is different. Share your course, subjects, and learning
                  requirements, and we&rsquo;ll help you explore suitable tuition options, subject to availability.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                <ButtonLink to="/enquiry" variant="gold" size="lg" className="w-full sm:w-auto lg:w-72">
                  Find My Academic Support <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </ButtonLink>
                <ExternalButton
                  href={waLink(defaultWaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  size="lg"
                  className="w-full sm:w-auto lg:w-72"
                >
                  <WhatsAppIcon /> Enquire on WhatsApp
                </ExternalButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
