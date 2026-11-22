import { Link } from 'react-router-dom';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { WhatsAppIcon } from './ui';
import { mailHref, site, telHref } from '../data/site';
import { levelLabels } from '../data/courses';
import { defaultWaMessage, waLink } from '../lib/whatsapp';

const quick = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/director-library', label: 'Director & Library' },
  { to: '/vision-mission', label: 'Vision & Mission' },
  { to: '/courses', label: 'Courses & Programs' },
  { to: '/subjects', label: 'Subjects We Teach' },
  { to: '/enquiry', label: 'Student Enquiry' },
  { to: '/contact', label: 'Contact Us' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white/75">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-site relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo invert />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Asha Gyan Commerce Academy offers personalized tuitions and academic support for commerce students — from
            Classes 11–12 to undergraduate, postgraduate and professional programmes.
          </p>
          <a
            href={waLink(defaultWaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold text-white hover:bg-white/10"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp
          </a>
        </div>

        <nav aria-label="Quick links" className="lg:col-span-2">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider !text-gold">Quick Links</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quick.map((q) => (
              <li key={q.to}>
                <Link to={q.to} className="hover:text-white">
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Course categories" className="lg:col-span-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider !text-gold">Course Categories</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {Object.entries(levelLabels).map(([k, v]) => (
              <li key={k}>
                <Link to={`/courses?level=${k}`} className="hover:text-white">
                  {v}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider !text-gold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/contact" className="inline-flex items-start gap-2.5 hover:text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {site.serviceAreas.map((a) => (
                    <span key={a.city} className="block">
                      {a.street}, {a.city}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
            <li>
              <a href={telHref} className="inline-flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" /> {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={mailHref} className="inline-flex items-center gap-2.5 break-all hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.url} className="inline-flex items-center gap-2.5 hover:text-white">
                <Globe className="h-4 w-4 text-gold" aria-hidden="true" /> {site.websiteDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© 2026 Asha Gyan Commerce Academy. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
