import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppIcon } from './ui';
import { defaultWaMessage, waLink } from '../lib/whatsapp';

/** Scroll to top on route change, or to the #hash target if present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function FloatingWhatsApp() {
  return (
    <a
      href={waLink(defaultWaMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AGCA on WhatsApp"
      className="group fixed bottom-5 right-5 z-30 inline-flex h-14 items-center gap-2 rounded-full bg-[#107C41] pl-4 pr-4 text-white shadow-lift transition-all hover:bg-[#0C6A37] sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline">Enquire on WhatsApp</span>
    </a>
  );
}

export function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
