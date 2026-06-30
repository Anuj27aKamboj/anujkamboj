import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { experience } from '@/data/experience';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ExperienceItem } from '@/types';

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
}

function TimelineItemCard({ item, index }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      animate={
        prefersReduced
          ? {}
          : isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.35, delay: index * 0.1, ease: 'easeOut' }}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-1 w-3 h-3 rounded-full border-2 flex-shrink-0"
        style={{
          background: 'var(--accent)',
          borderColor: 'var(--bg)',
          boxShadow: '0 0 0 2px var(--accent)',
        }}
        aria-hidden="true"
      />

      {/* Date badge */}
      <p
        style={{ fontSize: 'var(--text-xs)' }}
        className="font-medium text-[var(--accent)] mb-2 uppercase tracking-wider"
      >
        {item.startDate} – {item.endDate}
      </p>

      {/* Role + company */}
      <div className="mb-4">
        <h3
          style={{ fontSize: 'var(--text-xl)' }}
          className="font-semibold text-[var(--text-primary)]"
        >
          {item.role}
        </h3>
        {item.companyUrl ? (
          <a
            href={item.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 'var(--text-base)' }}
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            aria-label={`${item.company} (opens in new tab)`}
          >
            {item.company} ↗
          </a>
        ) : (
          <p
            style={{ fontSize: 'var(--text-base)' }}
            className="text-[var(--text-muted)]"
          >
            {item.company}
          </p>
        )}
      </div>

      {/* Contributions */}
      <ul className="flex flex-col gap-2.5" role="list">
        {item.contributions.map((contribution, i) => (
          <li
            key={i}
            className="flex items-start gap-3"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <span
              className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: 'var(--text-muted)' }}
              aria-hidden="true"
            />
            <span className="text-[var(--text-muted)] leading-relaxed">
              {contribution}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="experience-heading"
    >
      <div className="container">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <SectionHeading
            title="Experience"
            subtitle="Where I have worked and what I built there."
          />

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[5px] top-2 bottom-0 w-px"
              style={{ background: 'var(--border)' }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-12">
              {experience.map((item, index) => (
                <TimelineItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
