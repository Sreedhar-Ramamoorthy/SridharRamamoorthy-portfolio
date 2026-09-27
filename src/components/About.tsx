import { motion } from "motion/react";
import { Award, GraduationCap, MapPin } from "lucide-react";
import { about, certifications, education, profile } from "@/data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";
import Counter from "./Counter";

export default function About() {
  return (
    <Section id="about" eyebrow="about me" title={<>Engineer who cares about <span className="text-gradient">what ships</span></>}>
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="text-lg leading-relaxed">{about.summary()}</p>
          <p className="mt-5 leading-relaxed text-muted">{about.detail}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
            <MapPin size={16} className="text-brand" /> {profile.location}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {about.highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 0.08} className="rounded-2xl border border-line bg-surface p-5">
                <div className="text-gradient font-display text-3xl font-bold">
                  <Counter to={h.value()} decimals={h.decimals ?? 0} suffix={h.suffix} />
                </div>
                <div className="mt-1 text-sm text-muted">{h.label}</div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
              <GraduationCap className="text-brand" /> Education
            </h3>
          </Reveal>
          <div className="space-y-4">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={0.1 + i * 0.1}>
                <motion.div
                  whileHover={{ x: 6 }}
                  className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6"
                >
                  <span className="bg-gradient-brand absolute inset-y-0 left-0 w-1" />
                  <p className="font-mono text-xs text-brand">{e.period}</p>
                  <h4 className="mt-2 text-lg font-semibold">{e.degree}</h4>
                  <p className="mt-1 text-muted">{e.school}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <h3 className="mt-10 mb-4 flex items-center gap-2 text-xl font-semibold">
              <Award className="text-brand" /> Certifications
            </h3>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.name} className="rounded-2xl border border-line bg-surface px-5 py-4">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
