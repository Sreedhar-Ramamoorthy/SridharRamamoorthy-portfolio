import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navSections, profile } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useTheme();
  const { scrollY } = useScroll();

  // Hide while scrolling down, reveal on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setScrolled(y > 20);
  });

  // Track which section is in the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled || open ? "glass shadow-lg shadow-black/5" : "border border-transparent"
        }`}
      >
        <span className="w-9 md:w-36" aria-hidden />


        <ul className="hidden items-center gap-1 md:flex">
          {navSections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active === id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {dark ? <Moon size={16} /> : <Sun size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a
            href={profile.resume}
            download="Sridhar-Ramamoorthy-Resume.pdf"
            className="bg-gradient-brand hidden rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:inline-block"
          >
            Resume
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="glass mx-auto mt-2 flex max-w-6xl flex-col rounded-2xl p-2 md:hidden"
          >
            {navSections.map(({ id, label }, i) => (
              <motion.li
                key={id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 font-medium ${
                    active === id ? "bg-surface-2 text-fg" : "text-muted"
                  }`}
                >
                  {label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
