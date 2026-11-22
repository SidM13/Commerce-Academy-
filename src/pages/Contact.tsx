import { useRef, useState, type FormEvent } from 'react';
import { Clock, Globe, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Seo } from '../components/Seo';
import { PageHero, WhatsAppIcon } from '../components/ui';
import { btn } from '../components/btn';
import { ConsentCheckbox, Field, Honeypot, StatusMessage, type SubmitStatus } from '../components/form';
import { describe } from '../components/describe';
import { mailHref, serviceAreaText, site, telHref } from '../data/site';
import { defaultWaMessage, waLink } from '../lib/whatsapp';
import { NotConfiguredError, submitEnquiry } from '../lib/submitEnquiry';
import { MIN_FILL_TIME, normalizeMobile, validateEmail, validateMobile, validateName } from '../lib/validation';

type Errors = Partial<Record<'name' | 'phone' | 'cemail' | 'message' | 'consent', string>>;

function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [botcheck, setBotcheck] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmitStatus>({ state: 'idle' });
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const waText = `Hello AGCA,${name.trim() ? ` this is ${name.trim()}.` : ''} ${message.trim() || 'I would like to get in touch.'}`;

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status.state === 'submitting') return;
    const e: Errors = {};
    const n = validateName(name);
    if (n) e.name = n;
    const p = validateMobile(phone);
    if (p) e.phone = p;
    const em = validateEmail(email, false);
    if (em) e.cemail = em;
    if (message.trim().length < 10) e.message = 'Please enter a message of at least 10 characters.';
    if (!consent) e.consent = 'Please confirm that we may contact you about your message.';
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    if (botcheck) return;
    if (Date.now() - startedAt.current < MIN_FILL_TIME) {
      setStatus({ state: 'error', message: 'That was submitted unusually fast. Please wait a moment and try again.' });
      return;
    }
    setStatus({ state: 'submitting' });
    try {
      await submitEnquiry(
        `Website contact message — ${name.trim()}`,
        {
          'Enquiry Type': 'Contact form message',
          Name: name.trim(),
          Mobile: `+91 ${normalizeMobile(phone)}`,
          email: email.trim(),
          replyto: email.trim(),
          Message: message.trim(),
          Consent: 'Yes',
        },
        botcheck,
      );
      setStatus({ state: 'success', message: 'Thank you — your message has been received. We’ll get back to you soon.' });
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setConsent(false);
    } catch (err) {
      setStatus(
        err instanceof NotConfiguredError
          ? { state: 'error', message: err.message, notConfigured: true }
          : { state: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' },
      );
    }
  };

  const submitting = status.state === 'submitting';
  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="card relative space-y-5 p-5 sm:p-8" aria-labelledby="contact-form-heading">
      <Honeypot value={botcheck} onChange={setBotcheck} />
      <h2 id="contact-form-heading" className="text-2xl font-extrabold">
        Get in Touch
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full Name" required error={errors.name}>
          <input {...describe('name', errors.name)} className="field" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field id="phone" label="Mobile Number" required error={errors.phone}>
          <input
            {...describe('phone', errors.phone)}
            className="field"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Field>
      </div>
      <Field id="cemail" label="Email Address" optional error={errors.cemail}>
        <input
          {...describe('cemail', errors.cemail)}
          className="field"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field id="message" label="Message" required error={errors.message}>
        <textarea
          {...describe('message', errors.message)}
          className="field min-h-[130px]"
          maxLength={1500}
          placeholder="How can we help you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Field>
      <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent} />
      <StatusMessage status={status} waText={waText} />
      <button type="submit" disabled={submitting} className={btn('secondary', 'lg', 'w-full sm:w-auto')}>
        {submitting ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
        {submitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

function ServiceAreas() {
  const [active, setActive] = useState(0);
  const area = site.serviceAreas[active];
  const fullAddress = `${area.street}, ${area.city}, ${area.state}`;
  const query = `${fullAddress}, India`;
  return (
    <div className="card p-6">
      <h2 className="flex items-center gap-2.5 text-lg font-bold">
        <MapPin className="h-5 w-5 text-burgundy" aria-hidden="true" /> Our Centres
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        AGCA provides tuition and academic support at two locations:
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" aria-label="AGCA centres">
        {site.serviceAreas.map((a, i) => (
          <li key={a.city}>
            <button
              type="button"
              aria-pressed={active === i}
              aria-label={`Show ${a.city} centre on map`}
              onClick={() => setActive(i)}
              className={`flex h-full w-full flex-col items-start rounded-xl border p-4 text-left transition-colors ${
                active === i ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-white text-navy hover:border-navy/40'
              }`}
            >
              <span className="font-display text-base font-bold">
                {a.city}
                {a.alt && <span className={`font-sans text-xs font-medium ${active === i ? 'text-white/70' : 'text-slate-500'}`}> ({a.alt})</span>}
              </span>
              <address className={`mt-1 text-sm not-italic leading-relaxed ${active === i ? 'text-white/85' : 'text-slate-600'}`}>
                {a.street},<br />
                {a.city}, {a.state}
              </address>
            </button>
          </li>
        ))}
      </ul>
      <iframe
        key={query}
        title={`Map showing the AGCA ${area.city} centre, ${fullAddress}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="mt-4 aspect-[4/3] w-full rounded-xl border-0 bg-mist"
      />
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
      >
        Get directions to the {area.city} centre →
      </a>
    </div>
  );
}

export default function Contact() {
  const cards = [
    { icon: Phone, label: 'Phone', value: site.phoneDisplay, href: telHref, cta: 'Tap to call' },
    { icon: WhatsAppIcon, label: 'WhatsApp', value: site.phoneDisplay, href: waLink(defaultWaMessage), cta: 'Start a chat', external: true },
    { icon: Mail, label: 'Email', value: site.email, href: mailHref, cta: 'Send an email' },
    { icon: Globe, label: 'Website', value: site.websiteDisplay, href: site.url, cta: 'Visit website' },
  ];

  return (
    <>
      <Seo
        path="/contact"
        title="Contact Us"
        description="Visit Asha Gyan Commerce Academy at House No. 50, Sector 8, Faridabad or House No. 414, Sector 40, Gurugram (Gurgaon). Call or WhatsApp +91 8920250283."
      />
      <PageHero
        eyebrow="Contact us"
        title="We’re here to help"
        intro={`Providing commerce tuition in ${serviceAreaText}. Reach us by phone, WhatsApp or email — or send us a message using the form below.`}
      />

      <section className="py-12 sm:py-16">
        <div className="container-site">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="card group flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-colors group-hover:bg-burgundy group-hover:text-white">
                    <c.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">{c.label}</span>
                  <span className="mt-1 break-all font-display text-[17px] font-bold text-navy">{c.value}</span>
                  <span className="mt-3 text-sm font-semibold text-teal">{c.cta} →</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <ContactForm />
            <div className="space-y-5">
              <ServiceAreas />
              {site.address && (
                <div className="card p-6">
                  <h2 className="flex items-center gap-2.5 text-lg font-bold">
                    <MapPin className="h-5 w-5 text-burgundy" aria-hidden="true" /> Campus Address
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate-700">{site.address}</p>
                  <iframe
                    title="Map showing the AGCA campus location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="mt-4 aspect-[4/3] w-full rounded-xl border-0"
                  />
                </div>
              )}
              <div className="card p-6">
                <h2 className="flex items-center gap-2.5 text-lg font-bold">
                  <Clock className="h-5 w-5 text-burgundy" aria-hidden="true" /> Business Hours
                </h2>
                {site.hours ? (
                  <dl className="mt-3 space-y-2 text-sm">
                    {site.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-4">
                        <dt className="text-slate-600">{h.days}</dt>
                        <dd className="font-semibold">{h.hours}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-3 text-sm text-slate-600" data-placeholder="true">
                    Business hours will be updated soon. Please call or message us to check availability.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
