import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Lightfall from "@/components/react-bits/Lightfall";
import { LinkButton } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { heroIcons } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/context/ThemeContext";

const FLOAT_CONFIGS = [
  { delay: 0, duration: 3.2, x: 0, y: -8 },
  { delay: 0.4, duration: 3.8, x: 4, y: -6 },
  { delay: 0.8, duration: 4.1, x: -4, y: -10 },
  { delay: 1.2, duration: 3.5, x: 2, y: -7 },
  { delay: 0.6, duration: 4.4, x: -2, y: -9 },
  { delay: 1.6, duration: 3.9, x: 3, y: -6 },
];

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const { resolvedTheme } = useTheme(); // ✅ inside the component
  const isDark = resolvedTheme === "dark";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Lightfall WebGL background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Lightfall
          colors={["#ffdb6d", "#F43F5E", "#F97316"]}
          backgroundColor="#6366F1"
          speed={0.6}
          streakCount={2}
          streakWidth={0.8}
          streakLength={0.8}
          glow={0.7}
          density={0.6}
          twinkle={1}
          zoom={1.5}
          backgroundGlow={isDark ? 0.3 : 0.2}
          opacity={isDark ? 1 : 0.75}
          mouseInteraction
          mouseStrength={0.6}
          mouseRadius={0.5}
        />
      </div>

      {/* Radial gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
         background: isDark
            ? "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 10%, var(--bg) 100%)"
            : "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 35%, var(--bg) 95%)",
        }}
      />

      <div className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Content ── */}
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 1, y: prefersReduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0 }}
              style={{ fontSize: "var(--text-sm)", marginBottom: "12px" }}
              className="font-medium text-[var(--accent)] tracking-wide"
            >
              Available for new opportunities
            </motion.p>

            <motion.h1
              initial={{ opacity: 1, y: prefersReduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 }}
              style={{
                fontSize: "var(--text-hero)",
                fontWeight: 700,
                marginBottom: "12px",
              }}
              className="text-[var(--text-primary)] tracking-tight leading-none"
            >
              {personal.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 1, y: prefersReduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ fontSize: "var(--text-3xl)", marginBottom: "20px" }}
              className="font-semibold text-[var(--text-secondary)] tracking-tight"
            >
              {personal.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 1, y: prefersReduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              style={{ fontSize: "var(--text-lg)", marginBottom: "32px" }}
              className="text-[var(--text-muted)] leading-relaxed"
            >
              {personal.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 1, y: prefersReduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="flex flex-wrap gap-3"
            >
              <LinkButton
                href="#projects"
                size="lg"
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Projects
                <ArrowRight size={16} aria-hidden="true" />
              </LinkButton>

              <LinkButton
                href={personal.resumeUrl}
                size="lg"
                variant="outline"
                download
                aria-label="Download resume PDF"
              >
                <Download size={16} aria-hidden="true" />
                Resume
              </LinkButton>
            </motion.div>
          </div>

          {/* ── Right: Floating icons ── */}
          <div
            className="hidden lg:grid grid-cols-3 gap-6 place-items-center"
            aria-hidden="true"
          >
            {heroIcons.map((icon, i) => {
              const config = FLOAT_CONFIGS[i % FLOAT_CONFIGS.length];
              return (
                <motion.div
                  key={icon.name}
                  animate={
                    prefersReduced
                      ? {}
                      : { y: [0, config.y, 0], x: [0, config.x, 0] }
                  }
                  transition={{
                    delay: config.delay,
                    duration: config.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className="w-16 h-16 rounded-[var(--radius-xl)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    {icon.iconUrl ? (
                      <img
                        src={icon.iconUrl}
                        alt=""
                        className="w-full h-full object-contain"
                        loading="eager"
                      />
                    ) : (
                      <span
                        style={{ fontSize: "var(--text-xs)", padding: "0 4px" }}
                        className="text-[var(--text-muted)] font-medium text-center"
                      >
                        {icon.name}
                      </span>
                    )}
                  </div>
                  <span
                    style={{ fontSize: "var(--text-xs)" }}
                    className="text-[var(--text-muted)] font-medium"
                  >
                    {icon.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
