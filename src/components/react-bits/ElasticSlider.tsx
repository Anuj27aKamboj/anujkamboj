import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { FontScale } from '@/types';

interface ElasticSliderProps {
  value: FontScale;
  onChange: (value: FontScale) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

const SCALE_LABELS: Record<number, string> = {
  0.9: 'A−',
  1.0: 'A',
  1.1: 'A+',
  1.2: 'A++',
};

export function ElasticSlider({
  value,
  onChange,
  min = 0.9,
  max = 1.2,
  step = 0.1,
  label = 'Text size',
  className,
}: ElasticSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value);
    // Snap to nearest valid FontScale
    const snapped = Math.round(raw * 10) / 10;
    onChange(snapped as FontScale);
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <span
          style={{ fontSize: 'var(--text-xs)' }}
          className="text-[var(--text-muted)] font-medium uppercase tracking-wider"
        >
          {label}
        </span>
        <span
          style={{ fontSize: 'var(--text-sm)' }}
          className="text-[var(--accent)] font-semibold min-w-[2.5rem] text-right"
        >
          {SCALE_LABELS[value] ?? `${Math.round(value * 100)}%`}
        </span>
      </div>

      {/* Track + thumb */}
      <div className="relative flex items-center h-5">
        {/* Track background */}
        <div
          className="absolute inset-y-0 my-auto h-1 w-full rounded-full"
          style={{ background: 'var(--border)' }}
        />
        {/* Filled track */}
        <div
          className="absolute inset-y-0 my-auto h-1 rounded-full transition-all duration-100"
          style={{
            width: `${percentage}%`,
            background: 'var(--accent)',
          }}
        />
        {/* Native input (invisible but functional) */}
        <input
          ref={inputRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={SCALE_LABELS[value]}
          className="absolute w-full opacity-0 cursor-pointer h-5 z-10"
          style={{ margin: 0 }}
        />
        {/* Custom thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white transition-transform duration-150 pointer-events-none"
          style={{
            left: `${percentage}%`,
            background: 'var(--accent)',
            transform: `translateX(-50%) translateY(-50%) scale(${isDragging ? 1.2 : 1})`,
            boxShadow: isDragging ? '0 0 0 4px rgba(99,102,241,0.2)' : 'var(--shadow-sm)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-0.5">
        {[0.9, 1.0, 1.1, 1.2].map((scale) => (
          <button
            key={scale}
            onClick={() => onChange(scale as FontScale)}
            aria-label={`Set text size to ${Math.round(scale * 100)}%`}
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            style={{
              fontSize: `calc(${scale} * 0.6rem)`,
              fontWeight: value === scale ? 600 : 400,
              color: value === scale ? 'var(--accent)' : undefined,
            }}
          >
            A
          </button>
        ))}
      </div>
    </div>
  );
}
