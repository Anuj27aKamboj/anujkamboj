import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { FontScale } from '@/types';

interface FontScaleContextValue {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
}

const FontScaleContext = createContext<FontScaleContextValue | null>(null);

const VALID_SCALES: FontScale[] = [0.9, 1.0, 1.1, 1.2];

function clampScale(value: number): FontScale {
  const nearest = VALID_SCALES.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
  return nearest;
}

interface FontScaleProviderProps {
  children: ReactNode;
}

export function FontScaleProvider({ children }: FontScaleProviderProps) {
  const [fontScale, setFontScaleRaw] = useLocalStorage<FontScale>(
    'portfolio-font-scale',
    1.0
  );

  // Apply --font-scale to :root whenever it changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-scale',
      String(fontScale)
    );
  }, [fontScale]);

  const setFontScale = (scale: FontScale) => {
    setFontScaleRaw(clampScale(scale));
  };

  return (
    <FontScaleContext.Provider value={{ fontScale, setFontScale }}>
      {children}
    </FontScaleContext.Provider>
  );
}

export function useFontScale(): FontScaleContextValue {
  const ctx = useContext(FontScaleContext);
  if (!ctx)
    throw new Error('useFontScale must be used inside FontScaleProvider');
  return ctx;
}
