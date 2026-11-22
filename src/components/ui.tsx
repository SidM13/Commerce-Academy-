import { Link } from 'react-router-dom';
import type { ComponentProps, ReactNode } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';

import { btn, type Size, type Variant } from './btn';
import { B } from '../lib/base';

export function ButtonLink({
  to,
  variant,
  size,
  className = '',
  ...rest
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link to={to} className={btn(variant, size, className)} {...rest} />;
}

export function ExternalButton({
  variant,
  size,
  className = '',
  ...rest
}: ComponentProps<'a'> & { variant?: Variant; size?: Size }) {
  return <a className={btn(variant, size, className)} {...rest} />;
}

/** Official-style WhatsApp glyph (lucide has no brand icons). */
export function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.42 9.42 0 0 1-1.45-5.03c0-5.21 4.24-9.45 9.46-9.45 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.69c0 5.21-4.24 9.45-9.45 9.45zm8.05-17.5A11.32 11.32 0 0 0 12.04.67C5.77.67.66 5.77.66 12.05c0 2 .52 3.96 1.52 5.69L.57 23.67l6.06-1.59a11.36 11.36 0 0 0 5.41 1.38h.01c6.27 0 11.38-5.1 11.38-11.38 0-3.04-1.18-5.9-3.34-8.05z" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  as: Tag = 'h2',
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
  invert?: boolean;
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className={`eyebrow ${invert ? '!text-gold' : ''}`}>{eyebrow}</p>}
      <Tag
        className={`mt-3 text-3xl font-extrabold leading-tight sm:text-4xl ${invert ? '!text-white' : ''}`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${invert ? 'text-white/75' : 'text-slate-600'}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

/** Subtle fade-up on scroll. Disabled for users who prefer reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <LazyMotion features={domAnimation}>
    <m.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
    </LazyMotion>
  );
}

/** The original AGCA seal on a soft gold halo — used in empty header/strip space across pages. */
export function SealBadge({ className = '', size = 'lg' }: { className?: string; size?: 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'h-40 w-40 lg:h-48 lg:w-48' : 'h-24 w-24 sm:h-28 sm:w-28';
  return (
    <div className={`relative shrink-0 items-center justify-center ${className}`} aria-hidden="true">
      <div className="absolute inset-0 scale-125 rounded-full bg-gold/25 blur-2xl" />
      <div className="absolute inset-0 scale-[1.12] rounded-full border border-gold/40" />
      <img src={`${B}logo-agca.png`} alt="" width={242} height={242} className={`relative ${dims} drop-shadow-xl`} />
    </div>
  );
}

/** Interior page header with navy band and subtle grid. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-burgundy/30 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative flex items-center justify-between gap-10 py-16 sm:py-20">
        <div className="min-w-0">
          <p className="eyebrow !text-gold">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight !text-white sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{intro}</p>}
          {children}
        </div>
        <SealBadge className="hidden md:flex" />
      </div>
    </section>
  );
}
