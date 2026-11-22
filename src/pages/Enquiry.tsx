import { CalendarCheck, Mail, MessagesSquare, Phone, ShieldCheck } from 'lucide-react';
import { Seo } from '../components/Seo';
import { EnquiryForm } from '../components/EnquiryForm';
import { PageHero, WhatsAppIcon } from '../components/ui';
import { mailHref, site, telHref } from '../data/site';
import { defaultWaMessage, waLink } from '../lib/whatsapp';
import { B } from '../lib/base';

const steps = [
  { icon: MessagesSquare, title: 'Share your requirements', text: 'Tell us your course, subjects and preferred learning mode.' },
  { icon: Phone, title: 'We get in touch', text: 'Our team reviews your enquiry and contacts you to understand your needs.' },
  { icon: CalendarCheck, title: 'Explore your options', text: 'We help you find suitable tuition support, subject to availability.' },
];

export default function Enquiry() {
  return (
    <>
      <Seo
        path="/enquiry"
        title="Student Enquiry & Academic Counselling"
        description="Request personalized commerce tuition or a callback from AGCA. Share your course, subjects and preferred learning mode, or enquire directly on WhatsApp."
      />
      <PageHero
        eyebrow="Student enquiry & academic counselling"
        title="Request Personalized Tuition"
        intro="Share your course, subjects and learning requirements. We’ll get back to you to discuss suitable academic support."
      />

      <section className="py-12 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            <EnquiryForm />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start" aria-label="How enquiries work">
            <img
              src={`${B}images/two-students-640.webp`}
              srcSet={`${B}images/two-students-640.webp 640w, ${B}images/two-students-1024.webp 1024w`}
              sizes="(min-width: 1024px) 340px, 100vw"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              alt="Two college students looking through a textbook together"
              className="hidden aspect-[4/3] w-full rounded-2xl object-[center_30%] object-cover shadow-card lg:block"
            />
            <div className="card p-6">
              <h2 className="text-lg font-bold">What happens next?</h2>
              <ol className="mt-5 space-y-5">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-gold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="mt-0.5 text-sm text-slate-600">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-navy p-6 text-white">
              <h2 className="text-lg font-bold !text-white">Prefer to talk directly?</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer" className="flex min-h-[40px] items-center gap-3 hover:text-gold">
                    <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={telHref} className="flex min-h-[40px] items-center gap-3 hover:text-gold">
                    <Phone className="h-5 w-5 text-gold" aria-hidden="true" /> Call {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={mailHref} className="flex min-h-[40px] items-center gap-3 break-all hover:text-gold">
                    <Mail className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" /> {site.email}
                  </a>
                </li>
              </ul>
            </div>

            <p className="flex gap-3 text-sm text-slate-600">
              <ShieldCheck className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
              Your details are used only to respond to your enquiry and are never sold or shared for marketing.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
