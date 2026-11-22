import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, MessageSquareText } from 'lucide-react';
import { Seo } from '../components/Seo';
import { PageHero, Reveal, WhatsAppIcon } from '../components/ui';
import { btn } from '../components/btn';
import { subjectCategories } from '../data/subjects';
import { waLink } from '../lib/whatsapp';

export default function Subjects() {
  const { hash } = useLocation();
  const [open, setOpen] = useState<string[]>(() => (hash ? [hash.slice(1)] : [subjectCategories[0].id]));

  // Opening /subjects#taxation expands that category.
  useEffect(() => {
    if (hash) setOpen((cur) => (cur.includes(hash.slice(1)) ? cur : [...cur, hash.slice(1)]));
  }, [hash]);

  const toggle = (id: string) => setOpen((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const allOpen = open.length === subjectCategories.length;

  return (
    <>
      <Seo
        path="/subjects"
        title="Subjects We Teach — Accountancy, Taxation, Economics & Business Law Tuition"
        description="Commerce subject tuition: income tax, GST, financial and cost accounting, business mathematics, statistics, management, economics, econometrics, business law and more."
      />
      <PageHero
        eyebrow="Subjects we teach"
        title="Subject-wise support across commerce disciplines"
        intro="Explore our six subject areas. Expand any category to see the topics covered and the programmes they relate to."
      />

      <section className="py-14 sm:py-20">
        <div className="container-site">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(allOpen ? [] : subjectCategories.map((s) => s.id))}
              className="min-h-[40px] text-sm font-semibold text-teal hover:underline"
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
          <div className="mt-4 grid items-start gap-5 lg:grid-cols-2">
            {subjectCategories.map((cat, i) => {
              const isOpen = open.includes(cat.id);
              return (
                <Reveal key={cat.id} delay={(i % 2) * 0.06}>
                  <article id={cat.id} className={`card scroll-mt-32 overflow-hidden transition-shadow ${isOpen ? 'shadow-lift' : ''}`}>
                    <h2>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${cat.id}-panel`}
                        onClick={() => toggle(cat.id)}
                        className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                      >
                        <span
                          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            isOpen ? 'bg-burgundy text-white' : 'bg-navy text-gold'
                          }`}
                        >
                          <cat.icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="flex-1">
                          <span className="block font-display text-lg font-bold text-navy sm:text-xl">{cat.name}</span>
                          <span className="mt-0.5 block text-sm text-slate-500">{cat.items.length} subject areas</span>
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-navy/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                    </h2>
                    <div id={`${cat.id}-panel`} hidden={!isOpen} className="border-t border-navy/10 px-5 pb-6 pt-5 sm:px-6">
                      <p className="leading-relaxed text-slate-600">{cat.description}</p>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {cat.items.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 rounded-lg bg-mist px-3 py-2.5 text-sm font-medium text-navy">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                            {item}
                            {item === 'ESSB' && <span className="sr-only">(as listed by the academy)</span>}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Related programmes</p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {cat.programs.map((p) => (
                          <li key={p} className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-600">
                            {p}
                          </li>
                        ))}
                      </ul>
                      <Link to={`/enquiry?subject=${encodeURIComponent(cat.name)}`} className={btn('secondary', 'md', 'mt-6')}>
                        Request Tuition <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-14 flex flex-col items-start gap-6 rounded-3xl border border-gold/40 bg-gradient-to-br from-gold-50 to-white p-6 sm:p-10 md:flex-row md:items-center">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold/20 text-gold-600">
                <MessageSquareText className="h-7 w-7" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold">Can&rsquo;t find your subject?</h2>
                <p className="mt-2 leading-relaxed text-slate-700">
                  Tell us what you&rsquo;re studying, and we&rsquo;ll help you explore available academic support.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link to="/enquiry?course=other" className={btn('primary')}>
                  Ask About Your Subject
                </Link>
                <a
                  href={waLink('Hello AGCA, I am looking for tuition in a subject not listed on your website: ')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btn('whatsapp')}
                >
                  <WhatsAppIcon /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
