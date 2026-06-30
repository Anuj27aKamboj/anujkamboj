import { useRef, useEffect, useState } from "react";
import "./GooeyNav.css";
import type { NavItem } from "@/types";
import { useTheme } from "@/context/ThemeContext";

interface GooeyNavProps {
  items: NavItem[];
  activeSection: string;
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
}

export function GooeyNav({
  items,
  activeSection,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { resolvedTheme } = useTheme();

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeSection),
  );
  const [internalActive, setInternalActive] = useState(activeIndex);
  // Suppresses ALL scroll-driven syncs for a fixed window after a manual
  // click, since IntersectionObserver can fire multiple times during the
  // multi-hundred-ms smooth-scroll animation, not just once.
  const suppressUntilRef = useRef(0);

  useEffect(() => {
    if (Date.now() < suppressUntilRef.current) return;
    setInternalActive(activeIndex);
  }, [activeIndex]);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (
    distance: number,
    pointIndex: number,
    totalPoints: number,
  ): [number, number] => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (
    i: number,
    t: number,
    d: [number, number],
    r: number,
  ) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLSpanElement) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("gooey-particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty(
          "--color",
          `var(--color-${p.color}, var(--accent))`,
        );
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("gooey-point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // particle already removed
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement>,
    index: number,
    href: string,
  ) => {
    e.preventDefault();
    const liEl = e.currentTarget;

    suppressUntilRef.current = Date.now() + 1000;
    setInternalActive(index);
    updateEffectPosition(liEl);

    if (filterRef.current) {
      filterRef.current.querySelectorAll(".gooey-particle").forEach((p) => {
        try {
          filterRef.current!.removeChild(p);
        } catch {
          /* already removed */
        }
      });
    }

    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth; // force reflow
      textRef.current.classList.add("active");
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
    href: string,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement as HTMLLIElement;
      if (liEl) {
        handleClick(
          {
            currentTarget: liEl,
            preventDefault: () => {},
          } as React.MouseEvent<HTMLLIElement>,
          index,
          href,
        );
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const lis = navRef.current.querySelectorAll("li");
    const activeLi = lis[internalActive] as HTMLElement | undefined;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }

    const ro = new ResizeObserver(() => {
      const currentLi = navRef.current?.querySelectorAll("li")[
        internalActive
      ] as HTMLElement | undefined;
      if (currentLi) updateEffectPosition(currentLi);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [internalActive]);

  return (
    <div
      className="gooey-nav-container hidden md:block"
      ref={containerRef}
      style={
        {
          "--gooey-item-color": "var(--text-secondary)",
          "--gooey-active-color":
            resolvedTheme === "dark" ? "#09090B" : "#FAFAFA",
          "--gooey-pill-bg": resolvedTheme === "dark" ? "#FAFAFA" : "#18181B",
          "--gooey-filter-bg": resolvedTheme === "dark" ? "#09090B" : "#FAFAFA",
          "--color-1": resolvedTheme === "dark" ? "#FAFAFA" : "#18181B",
          "--color-2": resolvedTheme === "dark" ? "#FAFAFA" : "#18181B",
          "--color-3": resolvedTheme === "dark" ? "#FAFAFA" : "#18181B",
          "--color-4": resolvedTheme === "dark" ? "#FAFAFA" : "#18181B",
        } as React.CSSProperties
      }
    >
      <nav aria-label="Main navigation">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={item.id}
              className={internalActive === index ? "active" : ""}
              onClick={(e) => handleClick(e, index, item.href)}
              tabIndex={0}
              role="link"
              onKeyDown={(e) =>
                handleKeyDown(
                  e as unknown as React.KeyboardEvent<HTMLAnchorElement>,
                  index,
                  item.href,
                )
              }
            >
              <a
                href={item.href}
                aria-current={internalActive === index ? "page" : undefined}
                tabIndex={-1}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
}
