"use client";

import { useEffect, useState } from "react";
import { type Locale } from "@/app/[lang]/dictionaries";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileMenu from "./MobileMenu";

type Dict = {
  nav: {
    about: string;
    skills: string;
    experience?: string;
    projects: string;
    contact: string;
  };
};

export default function Header({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: dict.nav.about, href: "#about" },
    { label: dict.nav.skills, href: "#skills" },
    { label: dict.nav.projects, href: "#projects" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Progress bar */}
      {progress > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 z-50">
          <div
            className="h-full transition-[width] duration-75"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #6d28d9, #a78bfa, #818cf8, #38bdf8, #a78bfa, #6d28d9)",
              backgroundSize: "200% auto",
              animation: "progress-flow 2.5s linear infinite",
              boxShadow: "0 0 8px 1px rgba(167,139,250,0.6)",
            }}
          />
        </div>
      )}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="text-lg font-semibold tracking-tight text-white">
          <span className="text-white/30">&lt; </span>
          Furkan Arslan
          <span className="text-white/30"> /&gt;</span>
        </a>

        <nav
          className="hidden md:flex items-center gap-1 transition-all duration-300"
          style={
            scrolled
              ? {
                  background: "rgba(10,10,15,0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "1rem",
                  padding: "8px 16px",
                }
              : {}
          }
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-1"
            >
              {item.label}
            </a>
          ))}
          <div className={scrolled ? "ml-2" : "ml-6"}>
            <LocaleSwitcher locale={locale} />
          </div>
        </nav>

        <div className="flex md:hidden text-white">
          <MobileMenu navItems={navItems} locale={locale} />
        </div>
      </div>
    </header>
  );
}
