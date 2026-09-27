import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { profile } from "@/data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-fg placeholder:text-muted/60 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // No form service configured: hand off to the visitor's mail app.
    if (!WEB3FORMS_KEY) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...data,
          subject: `Portfolio: ${data.subject}`,
          from_name: data.name,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const cards = [
    { Icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
    { Icon: FaLinkedinIn, label: "LinkedIn", value: "sridhar-ramamoorthy", href: profile.linkedin },
    { Icon: MapPin, label: "Location", value: profile.location },
  ];

  return (
    <Section id="contact" eyebrow="contact" title={<>Let&apos;s build <span className="text-gradient">something</span></>}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="space-y-4">
          <p className="mb-6 text-lg text-muted">
            Have a role, a project or just want to say hi? My inbox is always open — I usually reply within a day.
          </p>

          <button
            onClick={copyEmail}
            className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-surface p-5 text-left transition-colors hover:border-brand"
          >
            <span className="bg-gradient-brand grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white">
              <Mail size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-muted">Email</span>
              <span className="block truncate font-medium">{profile.email}</span>
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "y" : "n"}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className={copied ? "text-emerald-500" : "text-muted group-hover:text-brand"}
                aria-live="polite"
              >
                {copied ? <Check size={18} aria-label="Copied" /> : <Copy size={18} aria-label="Copy email" />}
              </motion.span>
            </AnimatePresence>
          </button>

          {cards.map(({ Icon, label, value, href }) => {
            const inner = (
              <>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-brand">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">{label}</span>
                  <span className="block truncate font-medium">{value}</span>
                </span>
              </>
            );
            const cls = "flex items-center gap-4 rounded-2xl border border-line bg-surface p-5";
            return href ? (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={`${cls} transition-colors hover:border-brand`}>
                {inner}
              </a>
            ) : (
              <div key={label} className={cls}>
                {inner}
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Name</span>
                <input name="name" required minLength={2} autoComplete="name" placeholder="Your name" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputClass} />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">Subject</span>
              <input name="subject" required minLength={3} placeholder="Java developer role at …" className={inputClass} />
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">Message</span>
              <textarea name="message" required minLength={10} rows={5} placeholder="Tell me a little about it" className={`${inputClass} resize-y`} />
            </label>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-brand mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-medium text-white shadow-lg shadow-brand/20 disabled:opacity-70"
            >
              {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {status === "sending" ? "Sending…" : "Send message"}
            </motion.button>

            <AnimatePresence>
              {(status === "sent" || status === "error") && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className={`mt-4 text-center text-sm ${status === "sent" ? "text-emerald-500" : "text-red-500"}`}
                >
                  {status === "sent"
                    ? "Thanks! Your message is on its way — I'll get back to you soon."
                    : `Couldn't send right now. Please email me at ${profile.email}.`}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
