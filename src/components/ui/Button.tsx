import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-md)] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)] active:scale-[0.98]",
    outline:
      "bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] hover:border-[var(--text-muted)] active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-[var(--text-sm)]",
    md: "px-5 py-2.5 text-[var(--text-sm)]",
    lg: "px-8 py-3.5 text-[var(--text-base)]",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

/** Anchor-styled as a Button — for external links */
interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: LinkButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-md)] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 select-none";

  const variants = {
    primary:
      "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)] active:scale-[0.98]",
    outline:
      "bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] hover:border-[var(--text-muted)] active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-[var(--text-sm)]",
    md: "px-5 py-2.5 text-[var(--text-sm)]",
    lg: "px-8 py-3.5 text-[var(--text-base)]",
  };

  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
