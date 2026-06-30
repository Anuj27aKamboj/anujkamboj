import { SectionHeading } from '@/components/ui/SectionHeading';
import { LogoLoop, type LogoItem } from '@/components/react-bits/LogoLoop';
import { skillsRowTop, skillsRowBottom } from '@/data/skills';
import type { SkillItem } from '@/types';

function toLogoItems(items: SkillItem[]): LogoItem[] {
  return items.map((item) => ({
    src: item.iconUrl ?? '',
    alt: item.iconAlt ?? item.name,
    title: item.name,
  }));
}

export function SkillsSection() {
  const topLogos = toLogoItems(skillsRowTop);
  const bottomLogos = toLogoItems(skillsRowBottom);

  return (
    <section
      id="skills"
      className="section"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="skills-heading"
    >
      <div className="container" style={{ marginBottom: '48px' }}>
        <SectionHeading
          id="skills-heading"
          title="Skills"
          subtitle="Technologies I work with day to day."
          align="center"
        />
      </div>

      <div className="sr-only">
        <ul>
          {[...skillsRowTop, ...skillsRowBottom].map((s) => (
            <li key={s.name}>{s.name}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col h-" style={{ gap: '36px' }} aria-hidden="true">
        <LogoLoop
          logos={topLogos}
          speed={40}
          direction="left"
          logoHeight={40}
          gap={48}
          pauseOnHover
          fadeOut
          fadeOutColor="var(--surface)"
          scaleOnHover
          ariaLabel="Core technologies"
        />
        <LogoLoop
          logos={bottomLogos}
          speed={40}
          direction="right"
          logoHeight={40}
          gap={48}
          pauseOnHover
          fadeOut
          fadeOutColor="var(--surface)"
          scaleOnHover
          ariaLabel="Tools and platforms"
        />
      </div>
    </section>
  );
}