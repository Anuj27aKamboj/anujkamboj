import { SectionHeading } from '@/components/ui/SectionHeading';

const strengths = [
  {
    label: 'React & TypeScript',
    description: 'Comfortable building and maintaining React apps with TypeScript — hooks, component composition, and clean prop interfaces.',
  },
  {
    label: 'Responsive UI',
    description: 'Turning Figma designs into pixel-accurate, mobile-first interfaces using Tailwind CSS with attention to spacing and typography.',
  },
  {
    label: 'Performance Basics',
    description: 'Familiar with lazy loading, image optimization, and keeping bundle size in check to hit reasonable Lighthouse scores.',
  },
  {
    label: 'Clean Code Habits',
    description: 'Writing readable, consistent code — meaningful naming, small focused components, and not over-abstracting before it is needed.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container my-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

          {/* ── Left: About me ── */}
          <div className="flex flex-col">
            <SectionHeading
              id="about-heading"
              title="About me"
              subtitle="How I work and what I care about."
            />
            <p
              style={{ fontSize: 'var(--text-base)', lineHeight: '1.8' }}
              className="text-[var(--text-secondary)]"
            >
              Frontend developer based in Gurugranm with 2.5 years of experience building React applications — from internal dashboards to consumer-facing products. I focus on fast initial loads, accessible interactions, and code that the next developer can understand without a walkthrough.
            </p>
            <p
              style={{ fontSize: 'var(--text-base)', lineHeight: '1.8', marginTop: '1rem' }}
              className="text-[var(--text-muted)]"
            >
              I start with the user goal and work backwards — questioning whether an animation helps before adding it, checking contrast before calling a design done, writing components with clear prop interfaces rather than threading state through layers of children.
            </p>
          </div>

          {/* ── Right: What I bring ── */}
          <div className="flex flex-col">
            <p
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
              className="text-[var(--text-muted)]"
            >
              What I bring
            </p>

            <ul className="flex flex-col gap-3" role="list">
              {strengths.map((s) => (
                <li
                  key={s.label}
                  className="flex gap-4 rounded-[var(--radius-lg)] transition-colors"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    padding: '14px 16px',
                  }}
                >
                  <div
                    className="w-1 flex-shrink-0 rounded-full self-stretch"
                    style={{ background: 'var(--accent)', minHeight: '100%' }}
                    aria-hidden="true"
                  />
                  <div>
                    <p
                      style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: '4px' }}
                      className="text-[var(--text-primary)]"
                    >
                      {s.label}
                    </p>
                    <p
                      style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}
                      className="text-[var(--text-muted)]"
                    >
                      {s.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}