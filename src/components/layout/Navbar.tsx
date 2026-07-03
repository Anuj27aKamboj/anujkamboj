import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { GooeyNav } from '@/components/react-bits/GooeyNav';
import { MobileDrawer } from './MobileDrawer';
import { navItems, personal } from '@/data/personal';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

const SECTION_IDS = navItems.map((item) => item.id);

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn('fixed top-0 left-0 right-0 z-30 transition-all duration-200', scrolled ? 'py-4' : 'py-6')}
        style={{
          background: scrolled ? 'color-mix(in srgb, var(--bg) 85%, transparent)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="container flex items-center justify-between">
          <a
            href="#"
            aria-label="Back to top"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection(SECTION_IDS[0]);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <span
              className="w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center text-white font-bold flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
              style={{ background: 'var(--accent)', fontSize: 'var(--text-sm)' }}
              aria-hidden="true"
            >
              {personal.name.charAt(0)}{personal.name.charAt(5)}
            </span>
            <span
              className="font-semibold text-[var(--text-primary)] hidden sm:block"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {personal.name}
            </span>
          </a>

          <GooeyNav
            items={navItems}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          <button
            className="lg:hidden p-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </>
  );
}