import type { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { profile, projects } from "@/data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";

const accents = {
  violet: "from-violet-500/30 to-fuchsia-500/10",
  cyan: "from-cyan-500/30 to-sky-500/10",
  emerald: "from-emerald-500/30 to-teal-500/10",
};

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, color-mix(in oklab, var(--brand) 18%, transparent), transparent 70%)`;

  function onMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x);
    my.set(y);
    ry.set((x / r.width - 0.5) * 8);
    rx.set(-(y / r.height - 0.5) * 8);
  }
  function onLeave() {
    mx.set(-200);
    my.set(-200);
    rx.set(0);
    ry.set(0);
  }

  const link = project.github || project.live;

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface"
    >
      <motion.div aria-hidden style={{ background: spotlight }} className="pointer-events-none absolute inset-0 z-10" />
      <div className={`relative grid h-40 place-items-center bg-gradient-to-br ${accents[project.accent]}`}>
        <FolderGit2 size={48} className="text-fg/70 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
        {link && (
          <div className="relative z-20 mt-5 flex gap-4 text-sm font-medium">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand">
                <FaGithub /> Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand">
                <ExternalLink size={15} /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="side projects" title={<>Things I&apos;ve <span className="text-gradient">built</span></>}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      {profile.github && (
        <Reveal className="mt-12 text-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-medium transition-colors hover:border-brand"
          >
            <FaGithub size={18} /> More on GitHub
          </a>
        </Reveal>
      )}
    </Section>
  );
}
