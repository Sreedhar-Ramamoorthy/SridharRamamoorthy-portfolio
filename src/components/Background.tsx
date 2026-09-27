import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

// Fixed ambient backdrop: slow aurora blobs plus a soft glow that follows the cursor.
export default function Background() {
  const x = useSpring(useMotionValue(-1000), { stiffness: 80, damping: 20 });
  const y = useSpring(useMotionValue(-1000), { stiffness: 80, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(500px circle at ${x}px ${y}px, color-mix(in oklab, var(--brand) 12%, transparent), transparent 70%)`;

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-aurora absolute -top-48 -left-40 h-[34rem] w-[34rem] rounded-full bg-brand/20 blur-3xl" />
      <div
        className="animate-aurora absolute top-1/4 -right-48 h-[30rem] w-[30rem] rounded-full bg-brand-2/15 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-aurora absolute -bottom-32 left-1/3 h-[26rem] w-[26rem] rounded-full bg-pink-500/10 blur-3xl"
        style={{ animationDelay: "-12s" }}
      />
      <motion.div className="absolute inset-0" style={{ background: glow }} />
    </div>
  );
}
