import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ChevronDown, Search, SearchX, SlidersHorizontal } from 'lucide-react';
import { Seo } from '../components/Seo';
import { CtaBand } from '../components/CtaBand';
import { PageHero } from '../components/ui';
import { btn } from '../components/btn';
import { allCourseSubjects, courses, levelLabels, levelShort, type Course, type CourseLevel } from '../data/courses';
import { subjectCategories } from '../data/subjects';

const levels = Object.keys(levelLabels) as CourseLevel[];

/** Map a catalogue subject (e.g. "GST") to course subjects via the subject categories, for broader search. */
function matches(course: Course, q: string) {
  if (!q) return true;
  const needle = q.toLowerCase();
  const hay = [course.name, course.shortName, course.overview, ...course.subjects].join(' ').toLowerCase();
  if (hay.includes(needle)) return true;
  // Category-level match: searching "taxation" finds courses with tax subjects.
  return subjectCategories.some(
    (cat) =>
      (cat.name.toLowerCase().includes(needle) || cat.items.some((i) => i.toLowerCase().includes(needle))) &&
      course.subjects.some((s) => cat.items.includes(s) || cat.name === s),
  );
}

function CourseItem({ course, open, onToggle }: { course: Course; open: boolean; onToggle: () => void }) {
  const panelId = `course-panel-${course.id}`;
  return (
    <article
      className={`card overflow-hidden transition-all duration-300 ${open ? 'border-teal/40 shadow-lift' : 'hover:shadow-lift'}`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy font-display text-xs font-extrabold text-gold">
            {course.shortName.replace('Class ', '')}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-lg font-bold leading-snug text-navy">{course.name}</span>
            <span className="mt-1 block text-sm leading-relaxed text-slate-600">{course.overview}</span>
          </span>
          <ChevronDown
            className={`mt-1 h-5 w-5 shrink-0 text-navy/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div id={panelId} hidden={!open} className="border-t border-navy/10 bg-mist/60 p-5 sm:p-6">
        {course.subjects.length > 0 ? (
          <>
            <p className="text-sm font-semibold text-navy">Subjects we can help with</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {course.subjects.map((s) => (
                <li key={s} className="rounded-full border border-navy/10 bg-white px-3 py-1 text-sm text-navy/80">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Don&rsquo;t see your paper? Mention it in your enquiry — support is offered subject to availability.
            </p>
          </>
        ) : (
          <p className="text-sm text-slate-600">
            Tell us your course and the subjects you&rsquo;re studying, and we&rsquo;ll help you explore available academic
            support.
          </p>
        )}
        <Link to={`/enquiry?course=${course.id}`} className={btn('secondary', 'md', 'mt-5')}>
          Enquire About {course.shortName === 'Other' ? 'Your Subject' : course.shortName}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function Courses() {
  const [params, setParams] = useSearchParams();
  const level = (params.get('level') as CourseLevel | null) ?? null;
  const activeLevel = level && levels.includes(level) ? level : null;
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const setLevel = (l: CourseLevel | null) => {
    const next = new URLSearchParams(params);
    if (l) next.set('level', l);
    else next.delete('level');
    setParams(next, { replace: true });
  };

  const results = useMemo(
    () =>
      courses.filter(
        (c) =>
          (!activeLevel || c.level === activeLevel) &&
          (!subject || c.subjects.includes(subject) || c.level === 'custom') &&
          matches(c, query.trim()),
      ),
    [activeLevel, subject, query],
  );

  const filtered = Boolean(activeLevel || subject || query.trim());
  const reset = () => {
    setQuery('');
    setSubject('');
    setLevel(null);
  };

  return (
    <>
      <Seo
        path="/courses"
        title="Courses & Programs — B.Com, M.Com, BBA, MBA, CA, CMA Tuition"
        description="Explore commerce tuition for Class 11 and 12, B.Com, BBA, M.Com, MBA, CA, CMA and ICWA. Search by course or subject and request personalized academic support."
      />
      <PageHero
        eyebrow="Courses & programs"
        title="Find the right academic support for your course"
        intro="Search by course or subject, filter by level, and select a programme to see the subjects we can help you with."
      />

      <section className="py-12 sm:py-16" aria-label="Course explorer">
        <div className="container-site">
          {/* Search & filters */}
          <div className="card -mt-20 relative z-10 p-4 sm:-mt-24 sm:p-6">
            <div className="grid gap-3 md:grid-cols-[1fr_260px]">
              <div className="relative">
                <label htmlFor="course-search" className="sr-only">
                  Search courses or subjects
                </label>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="course-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a course or subject — e.g. GST, MBA, Cost Accounting"
                  className="field py-3 pl-12"
                />
              </div>
              <div className="relative">
                <label htmlFor="subject-filter" className="sr-only">
                  Filter by subject
                </label>
                <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <select
                  id="subject-filter"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="field py-3 pl-10"
                >
                  <option value="">All subjects</option>
                  {allCourseSubjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by course level">
              {[null, ...levels].map((l) => {
                const on = activeLevel === l;
                return (
                  <button
                    key={l ?? 'all'}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setLevel(l)}
                    className={`min-h-[40px] rounded-full border px-4 text-sm font-medium transition-colors ${
                      on ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-white text-navy hover:border-navy/40'
                    }`}
                  >
                    {l ? levelShort[l] : 'All levels'}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-8 text-sm text-slate-600" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? 'programme' : 'programmes'} found
            {filtered && (
              <button type="button" onClick={reset} className="ml-3 font-semibold text-teal hover:underline">
                Clear filters
              </button>
            )}
          </p>

          {results.length === 0 ? (
            <div className="card mt-6 flex flex-col items-center p-10 text-center">
              <SearchX className="h-10 w-10 text-navy/30" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold">No matching programmes</h2>
              <p className="mt-2 max-w-md text-slate-600">
                We may still be able to help. Tell us what you&rsquo;re studying and we&rsquo;ll help you explore available
                academic support.
              </p>
              <Link to={`/enquiry?course=other${query ? `&subject=${encodeURIComponent(query)}` : ''}`} className={btn('secondary', 'md', 'mt-6')}>
                Ask About Your Subject
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-12">
              {levels.map((l) => {
                const group = results.filter((c) => c.level === l);
                if (!group.length) return null;
                return (
                  <section key={l} aria-labelledby={`level-${l}`}>
                    <h2 id={`level-${l}`} className="flex items-center gap-3 text-xl font-extrabold sm:text-2xl">
                      <span className="h-6 w-1 rounded-full bg-burgundy" aria-hidden="true" />
                      {levelLabels[l]}
                    </h2>
                    <div className="mt-5 grid items-start gap-4 lg:grid-cols-2">
                      {group.map((c) => (
                        <CourseItem
                          key={c.id}
                          course={c}
                          open={openId === c.id}
                          onToggle={() => setOpenId((cur) => (cur === c.id ? null : c.id))}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
