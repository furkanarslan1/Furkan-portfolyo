import Image from "next/image";
import { type Locale } from "@/app/[lang]/dictionaries";

type HeroDict = {
  greeting: string;
  role: string;
  subtitle: string;
  cta_projects: string;
  cta_contact: string;
};

export default function Hero({
  dict,
}: {
  dict: HeroDict;
  locale: Locale;
}) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Top heading */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">
          {dict.greeting} Furkan!
        </h1>
        <p className="text-xl sm:text-2xl font-mono text-white/80">
          {"<"}Frontend Developer.
          <span className="inline-block w-0.5 h-5 bg-white ml-0.5 align-middle animate-pulse" />
          {">"}
        </p>
      </div>

      {/* Photo + Text row */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Photo */}
        <div className="shrink-0 relative w-64 sm:w-72 aspect-3/4 rounded-3xl overflow-hidden md:mb-8">
          <Image
            src="/hero.png"
            alt="Furkan Arslan"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Right text */}
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <div className="animated-border-image rounded-2xl p-5">
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              {dict.subtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="#projects"
              className="breathe inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white"
              style={{ background: "transparent" }}
            >
              {dict.cta_projects}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}