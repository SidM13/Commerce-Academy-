# Asha Gyan Commerce Academy (AGCA) — Website

React 18 + TypeScript + Vite + Tailwind CSS. Pages: Home, Courses, Subjects, About, Enquiry, Contact, Privacy, Terms.

```bash
npm install
npm run dev       # local development
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## ⚠️ Required before launch: form delivery

Enquiry, callback and contact forms send email via [Web3Forms](https://web3forms.com) (free, no server).

1. Go to web3forms.com and create an access key using **agca19677@gmail.com** (submissions are emailed there).
2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY=<your key>`.
3. On your host (Vercel / Netlify), add the same environment variable and redeploy.

Without the key, forms **do not pretend to succeed** — they show "Online submissions are not available yet" and
offer WhatsApp instead. WhatsApp links (`wa.me/918920250283`) work with no configuration.

Spam protection: honeypot field (`botcheck`), minimum fill-time check, required consent, client-side validation.

## Deployment

**Live (GitHub Pages):** https://sidm13.github.io/Commerce-Academy-/

Every push to `main` builds and deploys automatically via `.github/workflows/deploy.yml`
(it sets `VITE_BASE=/Commerce-Academy-/` and `VITE_SITE_URL` for the sub-path). To enable enquiry emails on
the live site, add a repository secret **`VITE_WEB3FORMS_KEY`** (Settings → Secrets and variables → Actions)
and re-run the workflow.

When the `www.agcasm.com` domain is connected, remove `VITE_BASE` / `VITE_SITE_URL` from the workflow
(the site then serves from `/` with canonical URLs on agcasm.com).

### Other hosts

Static site — deploy `dist/`. SPA rewrites are included for Vercel (`vercel.json`) and Netlify (`public/_redirects`).
Point the `www.agcasm.com` domain at the host; canonical URLs and `sitemap.xml` already use it.

## Content to verify / fill in

All content comes from the academy poster. Nothing (fees, durations, faculty, results, address, hours, testimonials)
has been invented. Please supply/confirm:

| Item | Where |
| --- | --- |
| Centre addresses (Faridabad, Gurugram) — PIN codes can be added | `src/data/site.ts` → `serviceAreas` |
| Business hours | `src/data/site.ts` → `hours` |
| Founder/Director, Faculty, History, Campus photos, Achievements | `src/pages/About.tsx` → `placeholders` |
| Full form of **"ESSB"** (kept as printed on poster) | `src/data/subjects.ts` |
| Subjects listed per course (indicative, editable) | `src/data/courses.ts` |
| Privacy Policy & Terms wording (generic templates) | `src/pages/Legal.tsx` |
| Hero/About/Enquiry photos are free Unsplash stock of Indian students — replace with real campus photos when available | `public/images/` |
| Higher-resolution original logo file (current seal is cropped from the poster) | `public/logo-agca.png` — regenerate with `scripts/crop-logo.mjs` or replace directly |

## Structure

```
src/data/       site details, courses, subjects, features (edit content here)
src/lib/        whatsapp link builder, Web3Forms submit, validation
src/components/ layout, navbar, footer, enquiry form, shared UI
src/pages/      one file per page
```
