import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Sun, Moon, X } from 'lucide-react';
import { ElasticSlider } from '@/components/react-bits/ElasticSlider';
import { useTheme } from '@/context/ThemeContext';
import { useFontScale } from '@/context/FontScaleContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { FontScale } from '@/types';

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const { fontScale, setFontScale } = useFontScale();
  const prefersReduced = useReducedMotion();

  const duration = prefersReduced ? 0 : 0.2;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      aria-label="Accessibility controls"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Accessibility settings"
            aria-modal="false"
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ duration, ease: 'easeOut' }}
            className="w-64 rounded-xl p-4 flex flex-col gap-4"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between">
              <span
                style={{ fontSize: 'var(--text-xs)' }}
                className="font-semibold text-(--text-muted) uppercase tracking-wider"
              >
                Accessibility
              </span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close accessibility panel"
                className="p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
              >
                <X size={14} aria-hidden="true" style={{ color: 'var(--accent)'}}/>
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border)' }} />

            {/* Theme toggle */}
            <div className="flex items-center justify-between">
              <span
                style={{ fontSize: 'var(--text-sm)' }}
                className="text-[var(--text-secondary)] font-medium"
              >
                Theme
              </span>
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] transition-colors"
                style={{
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}
              >
                {resolvedTheme === 'dark' ? (
                  <>
                    <Sun size={14} aria-hidden="true" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon size={14} aria-hidden="true" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border)' }} />

            {/* Font scale slider */}
            <ElasticSlider
              value={fontScale}
              onChange={(v) => setFontScale(v as FontScale)}
              label="Text size"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close accessibility panel' : 'Open accessibility panel'}
        aria-expanded={isOpen}
        whileHover={{ scale: prefersReduced ? 1 : 1.05 }}
        whileTap={{ scale: prefersReduced ? 1 : 0.95 }}
        className="w-11 h-11 rounded-full flex items-center justify-center transition-colors shadow-lg"
        style={{
          background: isOpen ? 'var(--accent)' : 'var(--surface)',
          border: '1px solid var(--border)',
          color: isOpen ? '#ffffff' : 'var(--text-secondary)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <Settings size={18} aria-hidden="true" />
      </motion.button>
    </div>
  );
}
