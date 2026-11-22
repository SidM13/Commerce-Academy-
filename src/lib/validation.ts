export const validateName = (v: string) =>
  v.trim().length < 2 ? 'Please enter your full name.' : /\d/.test(v) ? 'Name should not contain numbers.' : '';

/** Accepts Indian mobile numbers with optional +91 / 0 prefix and spaces or dashes. */
export const normalizeMobile = (v: string) => v.replace(/[\s-]/g, '').replace(/^(\+91|0091|91(?=\d{10}$)|0)/, '');

export const validateMobile = (v: string) =>
  !v.trim()
    ? 'Please enter your mobile number.'
    : /^[6-9]\d{9}$/.test(normalizeMobile(v))
      ? ''
      : 'Please enter a valid 10-digit Indian mobile number.';

export const validateEmail = (v: string, required = true) =>
  !v.trim()
    ? required
      ? 'Please enter your email address.'
      : ''
    : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
      ? ''
      : 'Please enter a valid email address.';

/** Minimum time (ms) a human needs to fill the form — faster submissions are treated as bots. */
export const MIN_FILL_TIME = 3000;
