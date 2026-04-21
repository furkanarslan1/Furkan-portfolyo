"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { type Locale } from "@/app/[lang]/dictionaries";
import LocaleSwitcher from "./LocaleSwitcher";

type NavItem = { label: string; href: string };

export default function MobileMenu({
  navItems,
  locale,
}: {
  navItems: NavItem[];
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Menüyü aç"
          className="p-1 text-white/70 hover:text-white transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col border-l border-white/8 pt-20 pb-10 px-6 overflow-hidden"
        style={{ background: "#0a0a0f" }}
      >
        {/* Animated blobs — same as site background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute -top-20 -left-10 w-72 h-72 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(109,40,217,0.55), transparent 70%)",
              animation: "blob1 9s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-10 right-0 w-60 h-60 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(67,56,202,0.5), transparent 70%)",
              animation: "blob2 12s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)",
              animation: "blob3 7s ease-in-out infinite",
            }}
          />
        </div>

        {/* İsim */}
        <p className="text-base font-semibold text-white mb-2">
          <span className="text-white/30">&lt; </span>
          Furkan Arslan
          <span className="text-white/30"> /&gt;</span>
        </p>

        {/* Nav linkleri — scrolled header stili */}
        <nav className="flex flex-col gap-3 flex-1 mt-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-white/70 hover:text-white transition-all duration-200 px-4 py-2"
              style={{
                background: "rgba(10,10,15,0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1rem",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Alt kısım */}
        <div className="flex items-center justify-between border-t border-white/8 pt-6">
          <LocaleSwitcher locale={locale} />
          <p className="text-xs text-white/20">© 2026</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
