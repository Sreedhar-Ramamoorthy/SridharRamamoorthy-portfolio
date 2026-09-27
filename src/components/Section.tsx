import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <Reveal className="mb-14 md:mb-16">
        <p className="mb-3 font-mono text-sm text-brand">
          <span className="text-muted">//</span> {eyebrow}
        </p>
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
