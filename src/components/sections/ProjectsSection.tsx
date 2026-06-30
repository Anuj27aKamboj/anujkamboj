import { Code2, ExternalLink, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { BorderGlow } from "@/components/react-bits/BorderGlow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ProjectData } from "@/types";

interface ProjectCardProps {
  project: ProjectData;
}

function ProjectCard({ project }: ProjectCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReduced ? {} : { y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <BorderGlow className="h-full flex flex-col overflow-hidden">
        {/* Screenshot */}
        <div
          className="relative w-full overflow-hidden flex-shrink-0"
          style={{ aspectRatio: "16/9", background: "var(--surface-elevated)" }}
        >
          <img
            src={project.screenshotUrl}
            alt={project.screenshotAlt}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const fallback = img.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <div
            className="absolute inset-0 items-center justify-center"
            style={{ background: "var(--surface-elevated)", display: "none" }}
            aria-hidden="true"
          >
            <span
              style={{ fontSize: "var(--text-sm)" }}
              className="text-[var(--text-muted)]"
            >
              {project.title}
            </span>
          </div>
        </div>

        {/* Card content — flex column, full remaining height */}
        <div className="flex flex-col flex-1 p-6">
          <h3
            style={{ fontSize: "var(--text-xl)" }}
            className="font-semibold text-[var(--text-primary)] mb-2"
          >
            {project.title}
          </h3>

          <p
            style={{ fontSize: "var(--text-sm)" }}
            className="text-[var(--text-muted)] leading-relaxed mb-4"
          >
            {project.description}
          </p>

          <ul className="flex flex-col gap-1.5 mb-5" role="list">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <CheckCircle2
                  size={13}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--accent)" }}
                  aria-hidden="true"
                />
                <span
                  style={{ fontSize: "var(--text-xs)" }}
                  className="text-[var(--text-muted)]"
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  fontSize: "var(--text-xs)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Spacer pushes the button row to the bottom, regardless of content length above */}
          <div className="flex-1" />

          {/* Action buttons — pinned to bottom, same row across all cards */}
          <div
            className="flex items-center justify-between gap-3 pt-5"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={"GitHub repository for " + project.title}
              className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] transition-colors"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: "var(--text-secondary)",
                background: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                padding: "10px 16px",
              }}
            >
              <Code2 size={15} aria-hidden="true" />
              Code
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={"Live demo for " + project.title}
              className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] transition-colors"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: "#ffffff",
                background: "var(--accent)",
                padding: "10px 16px",
              }}
            >
              <ExternalLink size={15} aria-hidden="true" />
              Live demo
            </a>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <SectionHeading
          id="projects-heading"
          title="Featured projects"
          subtitle="Things I have built that I am proud of."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
