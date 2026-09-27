import type { MouseEvent } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, Clock, Download, Mail, MapPin } from "lucide-react";
import { FaGithub as Github, FaLinkedinIn as Linkedin } from "react-icons/fa";
import { about, experience, profile, EXPERIENCE_YEARS } from "@/data/portfolio";
import photo from "@/assets/profile.jpg";
import Typewriter from "./Typewriter";

const ease = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
} as const;

const current = experience.find((j) => j.current);

export default function Hero() {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, 60]);

  // Gentle 3D tilt that follows the cursor over the photo.
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  const socials = [
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
    ...(profile.github ? [{ href: profile.github, label: "GitHub", Icon: Github }] : []),
  ];

  const stats = [
    { value: `${EXPERIENCE_YEARS}+`, label: "Years building backends" },
    { value: `${about.highlights[2].value()}%`, label: "Faster API responses" },
    { value: `${about.highlights[3].value()}`, label: "Microservices shipped" },
  ];

  return (
    <section id="home" className="relative mx-auto flex min-h-svh max-w-6xl items-center px-4 pt-28 pb-20 sm:px-6">
      <div className="grid w-full items-center gap-16 md:grid-cols-[1.3fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          {profile.openToWork && (
            <motion.div variants={item} className="glass mb-8 inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-sm">
              <span className="relative flex h-2.5 w-2.5 ml-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-muted">Open to new opportunities</span>
            </motion.div>
          )}

          <motion.h1 variants={item} className="text-5xl leading-[1.02] font-bold sm:text-6xl lg:text-[5.25rem]">
            {profile.firstName}
            <br />
            <span className="text-shimmer">{profile.lastName}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 flex h-8 items-center gap-3 font-display text-lg font-medium whitespace-nowrap sm:text-2xl">
            <span className="bg-gradient-brand h-px w-10" />
            <Typewriter words={profile.roles} />
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-brand group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-medium text-white shadow-xl shadow-brand/30"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Let&apos;s talk
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href={profile.resume}
              download="Sridhar-Ramamoorthy-Resume.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-7 py-3.5 font-medium transition-colors hover:border-brand"
            >
              <Download size={18} /> Resume
            </motion.a>
            <div className="flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {(profile.city || profile.noticePeriod) && (
            <motion.div variants={item} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {profile.city && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} className="text-brand" /> {profile.city}
                </span>
              )}
              {profile.noticePeriod && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={15} className="text-brand" /> Notice period: {profile.noticePeriod}
                </span>
              )}
            </motion.div>
          )}

          <motion.dl variants={item} className="mt-12 flex max-w-lg divide-x divide-line">
            {stats.map((s) => (
              <div key={s.label} className="flex-1 px-4 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-gradient font-display text-3xl font-bold">{s.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative mx-auto w-72 sm:w-80 lg:w-[22rem]"
        >
          {/* Soft glow */}
          <div className="bg-gradient-brand absolute inset-8 -z-10 rounded-full opacity-50 blur-3xl" />

          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
            className="relative"
          >
            {/* Rotating gradient ring */}
            <div
              className="animate-spin-slow absolute -inset-2 rounded-full opacity-90 blur-[2px]"
              style={{ background: "conic-gradient(from 0deg, var(--brand), var(--brand-2), transparent 60%, var(--brand))" }}
            />
            <div className="relative aspect-square overflow-hidden rounded-full border-4 border-bg bg-surface-2">
              <img src={photo} alt={profile.name} className="h-full w-full object-cover" loading="eager" />
            </div>
          </motion.div>

          {current && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{ opacity: { delay: 0.9 }, x: { delay: 0.9, ease }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              className="glass absolute bottom-2 -left-4 rounded-2xl px-4 py-3 shadow-xl sm:-left-10"
            >
              <p className="text-xs text-muted">Currently at</p>
              <p className="font-display font-semibold">{current.company}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1.1 }, x: { delay: 1.1, ease }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            className="glass absolute top-2 -right-4 rounded-2xl px-4 py-3 shadow-xl sm:-right-20"
          >
            <p className="font-mono text-xs text-brand">&lt;/&gt;</p>
            <p className="font-display text-sm font-semibold">Java · Spring Boot</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
            transition={{ opacity: { delay: 1.3 }, x: { delay: 1.3, ease }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
            className="glass absolute top-[38%] -left-6 rounded-2xl px-4 py-3 shadow-xl sm:-left-28"
          >
            <p className="font-mono text-xs text-brand-2">$ deploy</p>
            <p className="font-display text-sm font-semibold">DevOps · Docker · K8s</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
