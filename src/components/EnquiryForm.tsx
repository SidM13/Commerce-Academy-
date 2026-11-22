import { useMemo, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, LoaderCircle, PhoneCall, Plus, Send, X } from 'lucide-react';
import { courses, getCourse, levelLabels } from '../data/courses';
import { buildEnquiryMessage, waLink } from '../lib/whatsapp';
import { NotConfiguredError, submitEnquiry } from '../lib/submitEnquiry';
import { MIN_FILL_TIME, normalizeMobile, validateEmail, validateMobile, validateName } from '../lib/validation';
import { ConsentCheckbox, Field, Honeypot, StatusMessage, type SubmitStatus } from './form';
import { describe } from './describe';
import { WhatsAppIcon } from './ui';
import { btn } from './btn';

const educationLevels = [
  'Class 11',
  'Class 12',
  'Undergraduate student',
  'Postgraduate student',
  'Professional course student (CA / CMA / ICWA)',
  'Working professional',
  'Other',
];
const modes = ['Online', 'Offline', 'Either'] as const;
const timings = ['Morning', 'Afternoon', 'Evening', 'Weekends', 'Flexible'];

type Errors = Partial<Record<'fullName' | 'mobile' | 'email' | 'educationLevel' | 'course' | 'subjects' | 'consent', string>>;

export function EnquiryForm() {
  const [params] = useSearchParams();
  const initialCourse = getCourse(params.get('course'))?.id ?? '';
  const schoolHint = params.get('level') === 'class-11-12';
  const initialSubject = params.get('subject');

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [courseId, setCourseId] = useState(initialCourse);
  const [otherCourse, setOtherCourse] = useState('');
  const [selected, setSelected] = useState<string[]>(initialSubject ? [initialSubject] : []);
  const [customSubject, setCustomSubject] = useState('');
  const [mode, setMode] = useState<string>('Either');
  const [timing, setTiming] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [botcheck, setBotcheck] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmitStatus>({ state: 'idle' });
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const course = getCourse(courseId);
  const courseHint = schoolHint && !courseId ? 'Choose Class 11 or Class 12 Commerce' : undefined;
  const suggestions = useMemo(() => {
    if (course) return course.subjects;
    if (schoolHint) return getCourse('class-12')!.subjects;
    return [];
  }, [course, schoolHint]);
  const chips = useMemo(() => Array.from(new Set([...suggestions, ...selected])), [suggestions, selected]);

  const courseLabel = course ? (course.id === 'other' ? otherCourse.trim() || 'a commerce subject' : course.name) : '';
  const waText = buildEnquiryMessage({
    name: fullName,
    educationLevel,
    course: courseLabel,
    subjects: selected,
    mode,
    timing,
    notes,
  });

  const toggle = (s: string) =>
    setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const addCustom = () => {
    const s = customSubject.trim();
    if (s && !selected.includes(s)) setSelected((cur) => [...cur, s]);
    setCustomSubject('');
  };

  const validate = (kind: 'enquiry' | 'callback'): Errors => {
    const e: Errors = {};
    const n = validateName(fullName);
    if (n) e.fullName = n;
    const m = validateMobile(mobile);
    if (m) e.mobile = m;
    if (kind === 'enquiry') {
      const em = validateEmail(email);
      if (em) e.email = em;
      if (!educationLevel) e.educationLevel = 'Please select your current education level.';
      if (!courseId) e.course = 'Please select a course or program.';
      else if (courseId === 'other' && !otherCourse.trim()) e.course = 'Please tell us your course or program.';
      if (selected.length === 0 && !customSubject.trim())
        e.subjects = 'Please select at least one subject, or type your own.';
    } else {
      const em = validateEmail(email, false);
      if (em) e.email = em;
    }
    if (!consent) e.consent = 'Please confirm that we may contact you about your enquiry.';
    return e;
  };

  const send = async (kind: 'enquiry' | 'callback', ev?: FormEvent) => {
    ev?.preventDefault();
    if (status.state === 'submitting') return;
    const subjects = customSubject.trim() ? [...selected, customSubject.trim()] : selected;
    const e = validate(kind);
    setErrors(e);
    if (Object.keys(e).length) {
      setStatus({ state: 'idle' });
      // Focus the first invalid control.
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    if (botcheck) return; // Honeypot tripped: silently drop (bots only).
    if (Date.now() - startedAt.current < MIN_FILL_TIME) {
      setStatus({ state: 'error', message: 'That was submitted unusually fast. Please wait a moment and try again.' });
      return;
    }

    setStatus({ state: 'submitting' });
    try {
      await submitEnquiry(
        kind === 'callback'
          ? `Callback request — ${fullName.trim()}`
          : `New enquiry — ${courseLabel || 'Course not specified'} — ${fullName.trim()}`,
        {
          'Enquiry Type': kind === 'callback' ? 'Callback request' : 'Course enquiry',
          'Full Name': fullName.trim(),
          Mobile: `+91 ${normalizeMobile(mobile)}`,
          email: email.trim(),
          replyto: email.trim(),
          'Education Level': educationLevel || '—',
          'Course / Program': courseLabel || '—',
          'Subjects': subjects.join(', ') || '—',
          'Preferred Mode': mode,
          'Preferred Timing': timing || '—',
          'Additional Requirements': notes.trim() || '—',
          Consent: 'Yes',
        },
        botcheck,
      );
      setStatus({
        state: 'success',
        message:
          kind === 'callback'
            ? `Thank you, ${fullName.trim().split(' ')[0]}. Your callback request has been received — our team will call you on +91 ${normalizeMobile(mobile)}.`
            : `Thank you, ${fullName.trim().split(' ')[0]}. Your enquiry has been received — our team will get in touch with you soon.`,
      });
    } catch (err) {
      setStatus(
        err instanceof NotConfiguredError
          ? { state: 'error', message: err.message, notConfigured: true }
          : { state: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' },
      );
    }
  };

  if (status.state === 'success') {
    return (
      <div className="card p-6 sm:p-10">
        <StatusMessage status={status} waText={waText} />
        <p className="mt-5 text-sm text-slate-600">
          Need a quicker response? You can also message us on WhatsApp with your enquiry details.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={waLink(waText)} target="_blank" rel="noopener noreferrer" className={btn('whatsapp')}>
            <WhatsAppIcon /> Continue on WhatsApp
          </a>
          <button type="button" className={btn('outline')} onClick={() => window.location.reload()}>
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  const submitting = status.state === 'submitting';

  return (
    <form ref={formRef} noValidate onSubmit={(e) => send('enquiry', e)} className="card relative p-5 sm:p-8">
      <Honeypot value={botcheck} onChange={setBotcheck} />
      <p className="text-sm text-slate-500">
        Fields marked <span className="text-burgundy">*</span> are required.
      </p>

      <fieldset className="mt-6">
        <legend className="font-display text-lg font-bold">Your details</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field id="fullName" label="Full Name" required error={errors.fullName}>
              <input
                {...describe('fullName', errors.fullName)}
                className="field"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Field>
          </div>
          <Field id="mobile" label="Mobile Number" required error={errors.mobile} hint="10-digit number; WhatsApp preferred">
            <div className="flex">
              <span className="inline-flex items-center rounded-l-xl border border-r-0 border-navy/15 bg-mist px-3 text-sm text-slate-600">
                +91
              </span>
              <input
                {...describe('mobile', errors.mobile, '10-digit number; WhatsApp preferred')}
                className="field rounded-l-none"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </Field>
          <Field id="email" label="Email Address" required error={errors.email}>
            <input
              {...describe('email', errors.email)}
              className="field"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-navy/10 pt-6">
        <legend className="sr-only">Academic requirements</legend>
        <h3 className="text-lg font-bold" aria-hidden="true">
          Academic requirements
        </h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field id="educationLevel" label="Current Education Level" required error={errors.educationLevel}>
            <select
              {...describe('educationLevel', errors.educationLevel)}
              className="field"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
            >
              <option value="">Select your level</option>
              {educationLevels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </Field>
          <Field
            id="course"
            label="Course / Program"
            required
            error={errors.course}
            hint={courseHint}
          >
            <select
              {...describe('course', errors.course, courseHint)}
              className="field"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">Select a course</option>
              {(Object.keys(levelLabels) as (keyof typeof levelLabels)[]).map((lvl) => (
                <optgroup key={lvl} label={levelLabels[lvl]}>
                  {courses
                    .filter((c) => c.level === lvl)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </Field>
          {courseId === 'other' && (
            <div className="sm:col-span-2">
              <Field id="otherCourse" label="Your Course / Program" required>
                <input
                  {...describe('otherCourse')}
                  className="field"
                  placeholder="e.g. B.Com (Hons), PGDM, CS Foundation"
                  value={otherCourse}
                  onChange={(e) => setOtherCourse(e.target.value)}
                />
              </Field>
            </div>
          )}
        </div>

        {/* Smart subject selection */}
        <div className="mt-6">
          <p id="subjects-label" className="field-label">
            Subject(s) Requiring Tuition <span className="text-burgundy" aria-hidden="true">*</span>
          </p>
          <p className="text-sm text-slate-500">
            {chips.length
              ? course
                ? `Common subjects for ${course.shortName} — select all that apply, or add your own.`
                : 'Select all that apply, or add your own.'
              : 'Select a course to see relevant subjects, or type your subject below.'}
          </p>
          {chips.length > 0 && (
            <div role="group" aria-labelledby="subjects-label" className="mt-3 flex flex-wrap gap-2">
              {chips.map((s) => {
                const on = selected.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(s)}
                    className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors ${
                      on
                        ? 'border-teal bg-teal text-white'
                        : 'border-navy/15 bg-white text-navy hover:border-teal hover:text-teal'
                    }`}
                  >
                    {on ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                    {s}
                  </button>
                );
              })}
            </div>
          )}
          <div className="mt-3 flex gap-2">
            <label htmlFor="customSubject" className="sr-only">
              Add another subject
            </label>
            <input
              id="customSubject"
              className="field"
              placeholder="Can't find your subject? Type it here"
              value={customSubject}
              aria-invalid={errors.subjects ? true : undefined}
              aria-describedby={errors.subjects ? 'subjects-error' : undefined}
              onChange={(e) => setCustomSubject(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustom();
                }
              }}
            />
            <button type="button" onClick={addCustom} className={btn('outline', 'md', 'shrink-0')}>
              Add
            </button>
          </div>
          {errors.subjects && (
            <p id="subjects-error" className="field-error">
              {errors.subjects}
            </p>
          )}
          {selected.length > 0 && (
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium">Selected:</span> {selected.join(', ')}
              <button
                type="button"
                onClick={() => setSelected([])}
                className="ml-2 inline-flex items-center gap-1 text-teal underline-offset-2 hover:underline"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" /> Clear
              </button>
            </p>
          )}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <fieldset>
            <legend className="field-label">Preferred Learning Mode</legend>
            <div className="grid grid-cols-3 gap-2">
              {modes.map((m) => (
                <label
                  key={m}
                  className={`flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl border text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal ${
                    mode === m ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-white hover:border-navy/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={m}
                    checked={mode === m}
                    onChange={() => setMode(m)}
                    className="sr-only"
                  />
                  {m}
                </label>
              ))}
            </div>
          </fieldset>
          <Field id="timing" label="Preferred Class Timing (IST)" optional>
            <select {...describe('timing')} className="field" value={timing} onChange={(e) => setTiming(e.target.value)}>
              <option value="">No preference</option>
              {timings.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field id="notes" label="Additional Academic Requirements" optional>
              <textarea
                {...describe('notes')}
                className="field min-h-[110px]"
                placeholder="Board or university (e.g. CBSE, ICSE/ISC, State Board, your university), semester, exam dates, topics you find difficult, etc."
                value={notes}
                maxLength={1500}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      <div className="mt-8 space-y-5 border-t border-navy/10 pt-6">
        <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent} />
        <StatusMessage status={status} waText={waText} />
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="submit" disabled={submitting} className={btn('secondary', 'lg')}>
            {submitting ? (
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-5 w-5" aria-hidden="true" />
            )}
            {submitting ? 'Sending…' : 'Submit Enquiry'}
          </button>
          <button type="button" disabled={submitting} onClick={() => send('callback')} className={btn('outline', 'lg')}>
            <PhoneCall className="h-5 w-5" aria-hidden="true" /> Request a Callback
          </button>
          <a href={waLink(waText)} target="_blank" rel="noopener noreferrer" className={btn('whatsapp', 'lg')}>
            <WhatsAppIcon /> Enquire via WhatsApp
          </a>
        </div>
        <p className="text-xs text-slate-500">
          &ldquo;Request a Callback&rdquo; needs only your name and mobile number. &ldquo;Enquire via WhatsApp&rdquo; opens
          WhatsApp with the details you&rsquo;ve entered so far.
        </p>
      </div>
    </form>
  );
}
