import { Link } from 'react-router-dom';
import { B } from '../lib/base';

/** Original AGCA seal (cropped unaltered from the academy poster) with the academy wordmark. */
export function Logo({ invert = false, compact = false }: { invert?: boolean; compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3 rounded-lg" aria-label="Asha Gyan Commerce Academy — Home">
      <img
        src={`${B}logo-agca.png`}
        alt=""
        width={52}
        height={52}
        className={`${compact ? 'h-11 w-11' : 'h-12 w-12 sm:h-[52px] sm:w-[52px]'} shrink-0 drop-shadow-sm`}
      />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span
          className={`font-display text-[15px] font-extrabold uppercase tracking-wide sm:text-base ${invert ? 'text-white' : 'text-burgundy'}`}
        >
          Asha Gyan
        </span>
        <span
          className={`mt-1 font-display text-[11px] font-bold uppercase tracking-[0.14em] sm:text-xs ${invert ? 'text-white/70' : 'text-navy'}`}
        >
          Commerce Academy
        </span>
      </span>
    </Link>
  );
}
