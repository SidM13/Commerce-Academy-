import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/ui';
import { btn } from '../components/btn';
import { mailHref, site } from '../data/site';
import { B } from '../lib/base';

// NOTE: These are general templates. Have them reviewed by AGCA (and legal counsel if required) before launch.

export function Privacy() {
  return (
    <>
      <Seo path="/privacy" title="Privacy Policy" description="How Asha Gyan Commerce Academy collects and uses information submitted through this website." />
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-14">
        <div className="container-site prose-legal max-w-3xl">
          <p>
            This policy explains how {site.name} (&ldquo;AGCA&rdquo;, &ldquo;we&rdquo;) handles information you share through
            this website.
          </p>
          <h2>Information we collect</h2>
          <p>When you submit an enquiry, callback request or contact form, we collect the details you provide, such as:</p>
          <ul>
            <li>Your name, mobile number and email address</li>
            <li>Your education level, course, subjects and learning preferences</li>
            <li>Any additional information you choose to include in your message</li>
          </ul>
          <h2>How we use it</h2>
          <p>
            We use this information only to respond to your enquiry, discuss suitable academic support and contact you by
            phone, WhatsApp or email about your request. We do not sell your information or share it for third-party
            marketing.
          </p>
          <h2>How it is delivered</h2>
          <p>
            Form submissions are delivered to our email inbox via a third-party form-delivery service (Web3Forms). If you
            choose to contact us through WhatsApp, your message is handled under WhatsApp&rsquo;s own terms and privacy
            policy.
          </p>
          <h2>Your choices</h2>
          <p>
            You may ask us to update or delete the information you have shared at any time by emailing{' '}
            <a href={mailHref} className="text-teal underline">
              {site.email}
            </a>
            .
          </p>
          <h2>Contact</h2>
          <p>
            For any privacy questions, contact us at{' '}
            <a href={mailHref} className="text-teal underline">
              {site.email}
            </a>{' '}
            or {site.phoneDisplay}.
          </p>
        </div>
      </section>
    </>
  );
}

export function Terms() {
  return (
    <>
      <Seo path="/terms" title="Terms & Conditions" description="Terms for using the Asha Gyan Commerce Academy website." />
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <section className="py-14">
        <div className="container-site prose-legal max-w-3xl">
          <p>By using this website, you agree to the following terms.</p>
          <h2>Information on this website</h2>
          <p>
            Course and subject information is provided for general guidance. Availability of tuition for any course,
            subject, batch, timing or learning mode is subject to confirmation by AGCA.
          </p>
          <h2>Enquiries</h2>
          <p>
            Submitting an enquiry does not guarantee admission or a place in any batch. We will contact you to discuss
            your requirements and available options.
          </p>
          <h2>Content</h2>
          <p>
            The AGCA name, logo and website content belong to {site.name} and may not be reused without permission.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href={mailHref} className="text-teal underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page not found" description="The page you were looking for could not be found." />
      <section className="py-24">
        <div className="container-site text-center">
          <img src={`${B}logo-agca.png`} alt="" width={242} height={242} className="mx-auto h-28 w-28 drop-shadow-lg" />
          <p className="mt-6 font-display text-6xl font-extrabold text-burgundy">404</p>
          <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
          <p className="mt-3 text-slate-600">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/" className={btn('primary')}>
              Go to Home
            </Link>
            <Link to="/courses" className={btn('outline')}>
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
