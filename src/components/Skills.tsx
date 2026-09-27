import { motion } from "motion/react";
import { skillGroups } from "@/data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";
import TechIcon from "./TechIcon";

const all = skillGroups.flatMap((g) => g.skills).filter((s, i, arr) => arr.findIndex((x) => x.icon === s.icon) === i);

function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="animate-marquee flex w-max shrink-0 gap-3 py-1.5 hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...all, ...all].map((s, i) => (
          <span
            key={i}
            aria-hidden={i >= all.length}
            className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm whitespace-nowrap"
          >
            <TechIcon name={s.icon} size={16} />
            {s.name.replace(/ \(.*\)/, "")}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" eyebrow="tech stack" title={<>Tools I <span className="text-gradient">build with</span></>}>
      <Reveal className="mb-14 space-y-3">
        <Marquee />
        <Marquee reverse />
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal
            key={group.title}
            delay={gi * 0.08}
            className="group relative rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-brand/50"
          >
            <h3 className="text-xl font-semibold">{group.title}</h3>
            <p className="mt-1 mb-5 text-sm text-muted">{group.blurb}</p>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-wrap gap-2"
            >
              {group.skills.map((s) => (
                <motion.li
                  key={s.name}
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2 text-sm"
                >
                  <TechIcon name={s.icon} size={16} />
                  {s.name}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
