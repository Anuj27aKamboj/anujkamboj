import { useEffect, useRef, useState } from 'react';

export function useActiveSection(
  sectionIds: string[]
): [string, (id: string) => void] {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');
  const isManualRef = useRef(false);

  const setManualActive = (id: string) => {
    isManualRef.current = true;
    setActiveSection(id);
  };

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const getActive = () => {
      if (isManualRef.current) return;
      const scrollY = window.scrollY + window.innerHeight * 0.3;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveSection(current);
    };

    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        isManualRef.current = false;
        getActive();
      }, 800);
    };

    getActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, [sectionIds]);

  return [activeSection, setManualActive];
}