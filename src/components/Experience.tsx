import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Briefcase, CheckCircle2, ChevronDown } from "lucide-react";
import { experience, impactTerms } from "@/data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";

const VISIBLE_POINTS = 3;

// Bold the metrics and standout phrases so skimmers catch the impact.
const escape = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const impactRe = new RegExp(`(\\d+%|${impactTerms.map(escape).join("|")})`, "g");
function highlight(text: string): ReactNode[] {
  return text.split(impactRe).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-fg">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function Point({ text }: { text: string }) {
  return (
    <li className="flex gap-2 text-sm text-muted">
      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-2" />
      <span>{highlight(text)}</span>
    </li>
  );
}

function ProjectCard({ project: p }: { project: (typeof experience)[number]["projects"][number] }) {
  const [open, setOpen] = useState(false);
  const extra = p.points.slice(VISIBLE_POINTS);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-brand/50"
    >
      <h4 className="text-lg font-semibold">{p.name}</h4>
      <p className="text-sm font-medium text-brand">{p.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
      <ul className="mt-4 space-y-2">
        {p.points.slice(0, VISIBLE_POINTS).map((pt) => (
          <Point key={pt} text={pt} />
        ))}
      </ul>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2 overflow-hidden pt-2"
          >
            {extra.map((pt) => (
              <Point key={pt} text={pt} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {extra.length > 0 && (
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          {open ? "Show less" : `Show ${extra.length} more`}
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      )}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.tech.map((t) => (
          <span key={t} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-xs text-muted">
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <Section id="experience" eyebrow="experience" title={<>Where I&apos;ve <span className="text-gradient">worked</span></>}>
      <div ref={ref} className="relative pl-8 md:pl-12">
        {/* Timeline track + progress line drawn on scroll */}
        <div className="absolute top-2 bottom-0 left-[11px] w-px bg-line md:left-[19px]" />
        <motion.div
          style={{ scaleY }}
          className="bg-gradient-brand absolute top-2 bottom-0 left-[10px] w-[3px] origin-top rounded-full md:left-[18px]"
        />

        {experience.map((job) => (
          <div key={job.company} className="relative mb-16 last:mb-0">
            <Reveal className="mb-8">
              <span className="absolute top-1 -left-8 grid h-6 w-6 place-items-center rounded-full border-2 border-brand bg-bg md:-left-12 md:h-10 md:w-10">
                <Briefcase size={14} className="text-brand md:hidden" />
                <Briefcase size={18} className="hidden text-brand md:block" />
                {job.current && <span className="absolute inset-0 animate-ping rounded-full border-2 border-brand opacity-40" />}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-2xl font-bold">{job.company}</h3>
                {job.current && (
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-sm text-muted">
                {job.role} · {job.period}
              </p>
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-2">
              {job.projects.map((p, i) => (
                <Reveal key={p.name} delay={(i % 2) * 0.1} className={job.projects.length === 1 ? "lg:col-span-2" : ""}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
