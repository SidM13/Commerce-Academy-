export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'gold' | 'light';
export type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-700 shadow-sm',
  secondary: 'bg-burgundy text-white hover:bg-burgundy-600 shadow-sm',
  outline: 'border border-navy/20 bg-white text-navy hover:border-navy/40 hover:bg-mist',
  ghost: 'text-navy hover:bg-navy/5',
  whatsapp: 'bg-[#107C41] text-white hover:bg-[#0C6A37] shadow-sm',
  gold: 'bg-gold text-navy hover:bg-[#D3B680] shadow-sm',
  light: 'border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20',
};
const sizes: Record<Size, string> = {
  sm: 'min-h-[40px] px-4 text-sm',
  md: 'min-h-[44px] px-5 text-[15px]',
  lg: 'min-h-[52px] px-6 text-base',
};

export const btn = (variant: Variant = 'primary', size: Size = 'md', extra = '') =>
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${extra}`;

