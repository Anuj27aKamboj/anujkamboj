import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { NavItem } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export function MobileDrawer({
  isOpen,
  onClose,
  items,
  activeSection,
  setActiveSection,
}: MobileDrawerProps) {
  const prefersReduced = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus close button when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleNavClick = (href: string, sectionId: string) => {
    // suppressActiveSection(2500);
    setActiveSection(sectionId);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  };

  const duration = prefersReduced ? 0 : 0.25;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={onClose}
            className="fixed inset-0 z-40 lg:hidden"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(2px)",
            }}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col lg:hidden"
            style={{
              background: "var(--surface)",
              borderLeft: "1px solid var(--border)",
            }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <span
                style={{ fontSize: "var(--text-sm)" }}
                className="font-semibold text-[var(--text-muted)] uppercase tracking-widest"
              >
                Navigation
              </span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close navigation menu"
                className="p-2 rounded-[var(--radius-md)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile navigation" className="flex-1 px-4 py-6">
              <ul className="flex flex-col gap-1" role="list">
                {items.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <motion.a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href, item.id);
                        }}
                        aria-current={isActive ? "page" : undefined}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: prefersReduced ? 0 : index * 0.05 + 0.1,
                          duration: prefersReduced ? 0 : 0.2,
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] transition-colors"
                        style={{
                          fontSize: "var(--text-base)",
                          fontWeight: isActive ? 600 : 400,
                          color: isActive
                            ? "var(--accent)"
                            : "var(--text-secondary)",
                          background: isActive
                            ? "var(--accent-subtle)"
                            : "transparent",
                        }}
                      >
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: "var(--accent)" }}
                            aria-hidden="true"
                          />
                        )}
                        {item.label}
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
