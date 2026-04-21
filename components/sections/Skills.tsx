"use client";

import { useEffect, useState } from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiSass,
  SiRedux,
  SiAxios,
  SiGit,
  SiGithub,
  SiZod,
  SiShadcnui,
} from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { TbDatabase } from "react-icons/tb";
import { MdPhoneAndroid } from "react-icons/md";
import { IconType } from "react-icons";

type SkillsDict = {
  title: string;
  subtitle: string;
};

type Skill = {
  name: string;
  icon: IconType;
  color: string;
};

const skills: Skill[] = [
  { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
  { name: "CSS3", icon: SiCss, color: "#1572b6" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "React", icon: FaReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
  { name: "SCSS", icon: SiSass, color: "#cc6699" },
  { name: "shadcn/ui", icon: SiShadcnui, color: "#ffffff" },
  { name: "Redux Toolkit", icon: SiRedux, color: "#764abc" },
  { name: "Zustand", icon: TbDatabase, color: "#a78bfa" },
  { name: "React Hook Form", icon: FaReact, color: "#ec5990" },
  { name: "Zod", icon: SiZod, color: "#3e67b1" },
  { name: "Axios", icon: SiAxios, color: "#5a29e4" },
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "Responsive / Mobile First", icon: MdPhoneAndroid, color: "#34d399" },
];

export default function Skills({ dict }: { dict: SkillsDict }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredIndex !== null) return;
    let i = 0;
    const interval = setInterval(() => {
      setActiveIndex(i);
      i = (i + 1) % skills.length;
    }, 400);
    return () => clearInterval(interval);
  }, [hoveredIndex]);

  return (
    <section id="skills" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {dict.title}
          </h2>
          <p className="text-white/50 text-base">{dict.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, i) => {
            const isHovered = hoveredIndex === i;
            const isActive = activeIndex === i && !isHovered;

            return (
              <div
                key={skill.name}
                className="group flex flex-col items-center gap-3 rounded-2xl p-4 transition-all duration-300 cursor-default"
                style={{
                  background: isHovered
                    ? "rgba(255,255,255,0.07)"
                    : isActive
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isHovered ? skill.color + "88" : isActive ? skill.color + "66" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: isHovered
                    ? `0 0 24px 4px ${skill.color}55`
                    : isActive
                      ? `0 0 18px 3px ${skill.color}44`
                      : "none",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <skill.icon
                  size={32}
                  style={{ color: skill.color }}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-xs text-white/60 text-center leading-tight group-hover:text-white/90 transition-colors">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
