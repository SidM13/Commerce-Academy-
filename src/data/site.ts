/**
 * Central institutional details. Everything here comes from the AGCA poster.
 * Fields set to `null` are intentionally left empty — fill them in only with verified information.
 */
export const site = {
  name: 'Asha Gyan Commerce Academy',
  shortName: 'AGCA',
  tagline: 'Personalized Tuitions & Academic Support',
  phoneDisplay: '+91 89202 50283',
  phoneE164: '+918920250283',
  whatsappNumber: '918920250283',
  email: 'agca19677@gmail.com',
  websiteDisplay: 'www.agcasm.com',
  /** Canonical site URL. Override per deployment with VITE_SITE_URL. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://www.agcasm.com',

  /** AGCA centres (addresses confirmed by the client). */
  serviceAreas: [
    { city: 'Faridabad', alt: null, state: 'Haryana', street: 'House No. 50, Sector 8' },
    { city: 'Gurugram', alt: 'Gurgaon', state: 'Haryana', street: 'House No. 414, Sector 40' },
  ] as { city: string; alt: string | null; state: string; street: string }[],

  // ---- Placeholders: add verified details before launch ----
  /** Full postal address, e.g. "Street, Area, City, State PIN". Enables the map + address card when set. */
  address: null as string | null,
  /** e.g. [{ days: 'Mon – Sat', hours: '9:00 AM – 7:00 PM' }] */
  hours: null as { days: string; hours: string }[] | null,
};

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/director-library', label: 'Director & Library' },
  { to: '/vision-mission', label: 'Vision & Mission' },
  { to: '/courses', label: 'Courses' },
  { to: '/subjects', label: 'Subjects' },
  { to: '/#why-agca', label: 'Why Choose Us' },
  { to: '/contact', label: 'Contact' },
];

export const serviceAreaText = 'Faridabad & Gurugram (Gurgaon), Haryana';

export const telHref = `tel:${site.phoneE164}`;
export const mailHref = `mailto:${site.email}`;
