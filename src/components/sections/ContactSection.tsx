import { Mail, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LinkButton } from '@/components/ui/Button';
import { personal, socialLinks } from '@/data/personal';
import { cn } from '@/lib/utils';
import type { SocialLink } from '@/types';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const iconMap: Record<SocialLink['icon'], React.FC> = {
  github:   GitHubIcon,
  linkedin: LinkedInIcon,
  mail:     () => <Mail size={22} aria-hidden="true" />,
};

const emailSubject = encodeURIComponent('Hey Anuj — Let us connect');
const emailBody = encodeURIComponent(
  `Hi Anuj,\n\nI came across your portfolio and was impressed by your work.\n\nI would love to connect and explore potential opportunities.\n\nLooking forward to hearing from you.\n\nBest regards`
);
const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${personal.email}&su=${emailSubject}&body=${emailBody}`;

export function ContactSection() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="flex flex-col items-center text-center" style={{ maxWidth: '640px', margin: '0 auto' }}>

          <SectionHeading
            id="contact-heading"
            title="Get in touch"
            subtitle="Open to frontend roles and interesting projects. Email is the best way to reach me."
            align="center"
          />

          {/* Social cards */}
          <div className="grid grid-cols-3 gap-4 w-full" style={{ marginBottom: '16px' }}>
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              const href = link.icon === 'mail' ? gmailUrl : link.url;

              return (
                <a
                  key={link.label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    link.icon === 'github'
                      ? 'GitHub profile'
                      : link.icon === 'linkedin'
                      ? 'LinkedIn profile'
                      : 'Send an email via Gmail'
                  }
                  className={cn(
                    'group flex flex-col items-center gap-3 rounded-[var(--radius-xl)]',
                    'transition-all duration-200 hover:-translate-y-1'
                  )}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    padding: '24px 16px',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 flex-shrink-0"
                    style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
                  >
                    <Icon />
                  </div>
                  <span
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                    className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Primary CTA */}
          <div
            className="flex flex-col items-center w-full rounded-[var(--radius-2xl)]"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: '32px 24px',
              gap: '16px',
            }}
          >
            <p
              style={{ fontSize: 'var(--text-base)' }}
              className="text-[var(--text-muted)] max-w-sm"
            >
              Prefer email? Drop me a line and I will get back to you within a day or two.
            </p>
            <LinkButton
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="primary"
              aria-label={'Send email to ' + personal.email}
            >
              Send me an email
              <ArrowRight size={16} aria-hidden="true" />
            </LinkButton>
            <p style={{ fontSize: 'var(--text-xs)' }} className="text-[var(--text-muted)]">
              {personal.email}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}