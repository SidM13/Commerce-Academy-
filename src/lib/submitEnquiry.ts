/**
 * Delivers form submissions by email through Web3Forms (https://web3forms.com).
 * Requires VITE_WEB3FORMS_KEY in .env — without it, submissions fail loudly instead of pretending to succeed.
 */
const ENDPOINT = 'https://api.web3forms.com/submit';

export class NotConfiguredError extends Error {
  constructor() {
    super('Online form submissions are not configured yet.');
    this.name = 'NotConfiguredError';
  }
}

export const isFormConfigured = () => Boolean(import.meta.env.VITE_WEB3FORMS_KEY);

export async function submitEnquiry(
  subject: string,
  fields: Record<string, string>,
  botcheck: string,
): Promise<void> {
  const key = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!key) throw new NotConfiguredError();

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: key,
      subject,
      from_name: 'AGCA Website',
      botcheck, // Web3Forms honeypot: must be empty
      ...fields,
    }),
  });

  let data: { success?: boolean; message?: string } = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON response handled below */
  }
  if (!res.ok || !data.success) {
    throw new Error(data.message || `Submission failed (HTTP ${res.status}).`);
  }
}
