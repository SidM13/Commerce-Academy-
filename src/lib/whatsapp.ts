import { site } from '../data/site';

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const defaultWaMessage =
  'Hello AGCA, I would like to know more about the tuition and academic support you offer.';

interface WaEnquiry {
  name?: string;
  educationLevel?: string;
  course?: string;
  subjects?: string[];
  mode?: string;
  timing?: string;
  notes?: string;
}

/** Builds the prefilled WhatsApp message from whatever the student has entered so far. */
export function buildEnquiryMessage(e: WaEnquiry) {
  const course = e.course?.trim() || 'commerce';
  const subjects = (e.subjects ?? []).filter(Boolean);
  const subjectPart = subjects.length ? ` and ${subjects.join(', ')}` : '';
  const lines = [
    `Hello AGCA, I am interested in tuition for ${course}${subjectPart}. Please share the available academic support options.`,
  ];
  const details: string[] = [];
  if (e.name?.trim()) details.push(`Name: ${e.name.trim()}`);
  if (e.educationLevel) details.push(`Current level: ${e.educationLevel}`);
  if (e.mode) details.push(`Preferred mode: ${e.mode}`);
  if (e.timing) details.push(`Preferred timing: ${e.timing}`);
  if (e.notes?.trim()) details.push(`Notes: ${e.notes.trim()}`);
  if (details.length) lines.push('', ...details);
  return lines.join('\n');
}
