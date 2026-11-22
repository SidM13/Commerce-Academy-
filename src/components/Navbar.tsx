import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MapPin, Menu, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonLink, ExternalButton, WhatsAppIcon } from './ui';
import { navLinks, site, telHref } from '../data/site';
import { defaultWaMessage, waLink } from '../lib/whatsapp';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname, hash]);

  // Escape closes the menu; lock body scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (to: string) => (to.includes('#') ? pathname + hash === to : pathname === to && !hash);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled ? 'border-navy/10 bg-white/90 shadow-sm backdrop-blur-md' : 'border-transparent bg-white'
      }`}
    >
      {/* Top utility bar */}
      <div className="hidden bg-navy text-white/80 md:block">
        <div className="container-site flex h-9 items-center justify-between text-xs">
          <p className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" /> Commerce tuition in Faridabad &amp; Gurugram (Gurgaon)
          </p>
          <div className="flex items-center gap-5">
            <a href={telHref} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <nav aria-label="Main" className="container-site flex h-[72px] items-center justify-between gap-3">
        <Logo />

        <ul className="hidden items-center gap-0 xl:flex 2xl:gap-0.5">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={() =>
                  `relative whitespace-nowrap rounded-full border-2 px-1.5 py-1.5 text-[13.5px] font-medium 2xl:px-3 2xl:text-[14.5px] transition-colors ${
                    isActive(l.to) ? 'border-teal text-burgundy' : 'border-transparent text-navy/80 hover:text-navy'
                  }`
                }
                aria-current={isActive(l.to) ? 'page' : undefined}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 xl:flex">
          <ExternalButton
            href={waLink(defaultWaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="sr-only 2xl:not-sr-only">WhatsApp Us</span>
          </ExternalButton>
          <ButtonLink to="/enquiry" variant="secondary" size="sm">
            Enquire Now
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-navy/5 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 md:top-[108px] overflow-y-auto border-t border-navy/10 bg-white xl:hidden"
        >
          <ul className="container-site flex flex-col py-4">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={`flex min-h-[52px] items-center border-b border-navy/5 text-lg font-semibold ${
                    isActive(l.to) ? 'text-burgundy' : 'text-navy'
                  }`}
                  aria-current={isActive(l.to) ? 'page' : undefined}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="container-site flex flex-col gap-3 pb-10">
            <ButtonLink to="/enquiry" variant="secondary" size="lg">
              Enquire Now
            </ButtonLink>
            <ExternalButton
              href={waLink(defaultWaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon /> WhatsApp Us
            </ExternalButton>
            <ExternalButton href={telHref} variant="outline" size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" /> Call {site.phoneDisplay}
            </ExternalButton>
          </div>
        </div>
      )}
    </header>
  );
}
