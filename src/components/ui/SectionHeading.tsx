import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center', className)}>
      <h2
        id={id}
        style={{ fontSize: 'var(--text-section)' }}
        className="font-bold text-[var(--text-primary)] tracking-tight leading-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{ fontSize: 'var(--text-xl)', marginTop: '8px' }}
          className={cn(
            'font-semibold text-[var(--text-muted)] max-w-xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}