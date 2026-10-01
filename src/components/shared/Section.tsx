import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export const Section = ({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <section
      id={id}
      className={cn("mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20", className)}
    >
      {children}
    </section>
  );
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-widest text-red">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-lg text-muted">{description}</p>}
    </div>
  );
};
