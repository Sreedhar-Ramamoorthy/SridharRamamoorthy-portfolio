import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name} · Built with React, Tailwind & Motion
        </p>
        <a href="#home" className="group inline-flex items-center gap-1.5 hover:text-fg">
          Back to top
          <ArrowUp size={15} className="transition-transform group-hover:-translate-y-1" />
        </a>
      </div>
    </footer>
  );
}
