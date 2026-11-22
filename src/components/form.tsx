import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhatsAppIcon } from './ui';
import { waLink } from '../lib/whatsapp';

export function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="text-burgundy" aria-hidden="true">
            {' '}*
          </span>
        )}
        {optional && <span className="font-normal text-slate-500"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Visually hidden honeypot field — real visitors never see or fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="botcheck">Leave this field empty</label>
      <input
        id="botcheck"
        name="botcheck"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function ConsentCheckbox({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'consent-error' : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy/30 text-teal focus:ring-teal"
        />
        <label htmlFor="consent" className="text-sm leading-relaxed text-slate-600">
          I agree that AGCA may contact me by phone, WhatsApp or email about my enquiry. My details will be used only
          to respond to this request, as described in the{' '}
          <Link to="/privacy" className="font-medium text-teal underline underline-offset-2 hover:text-teal-600">
            Privacy Policy
          </Link>
          .
        </label>
      </div>
      {error && (
        <p id="consent-error" className="field-error ml-8">
          {error}
        </p>
      )}
    </div>
  );
}

export type SubmitStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string; notConfigured?: boolean };

export function StatusMessage({ status, waText }: { status: SubmitStatus; waText: string }) {
  return (
    <div role="status" aria-live="polite">
      {status.state === 'error' && (
        <div className="flex gap-3 rounded-xl border border-burgundy/20 bg-burgundy-50 p-4 text-sm text-burgundy">
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">
              {status.notConfigured ? 'Online submissions are not available yet.' : 'Your enquiry could not be sent.'}
            </p>
            <p className="mt-1 text-burgundy/90">
              {status.notConfigured
                ? 'Your enquiry has NOT been sent. Please reach us directly on WhatsApp or by phone — your details will be included in the WhatsApp message.'
                : `${status.message} Please try again, or contact us directly on WhatsApp.`}
            </p>
            <a
              href={waLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#107C41] px-4 font-semibold text-white hover:bg-[#0C6A37]"
            >
              <WhatsAppIcon className="h-4 w-4" /> Send via WhatsApp instead
            </a>
          </div>
        </div>
      )}
      {status.state === 'success' && (
        <div className="flex gap-3 rounded-xl border border-teal/25 bg-teal-50 p-4 text-sm text-teal-600">
          <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="font-medium">{status.message}</p>
        </div>
      )}
    </div>
  );
}
