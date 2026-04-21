'use client'

import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiGit, SiCss, SiPostgresql, SiFigma,
} from 'react-icons/si'
import type { Locale } from '@/app/[lang]/dictionaries'

type AboutDict = { title: string; description: string }

/* ─── orbit ring config ─── */
const rings = [
  {
    radius: 88,
    duration: 7,
    icons: [
      { Icon: SiTypescript, color: '#3178c6', label: 'TypeScript' },
      { Icon: SiReact,      color: '#61dafb', label: 'React' },
    ],
  },
  {
    radius: 142,
    duration: 13,
    icons: [
      { Icon: SiNextdotjs,    color: '#ffffff', label: 'Next.js' },
      { Icon: SiTailwindcss,  color: '#38bdf8', label: 'Tailwind' },
      { Icon: SiNodedotjs,    color: '#68a063', label: 'Node.js' },
    ],
  },
  {
    radius: 196,
    duration: 20,
    icons: [
      { Icon: SiGit,        color: '#f05032', label: 'Git' },
      { Icon: SiCss,        color: '#264de4', label: 'CSS' },
      { Icon: SiFigma,      color: '#a259ff', label: 'Figma' },
      { Icon: SiPostgresql, color: '#336791', label: 'PostgreSQL' },
    ],
  },
]

function OrbitSystem() {
  const size = 420

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {rings.map((ring, ri) => (
        <div key={ri}>
          {/* Ring circle */}
          <div
            className="absolute rounded-full"
            style={{
              top: '50%', left: '50%',
              width: ring.radius * 2,
              height: ring.radius * 2,
              marginTop: -ring.radius,
              marginLeft: -ring.radius,
              border: '1px dashed rgba(255,255,255,0.08)',
            }}
          />

          {/* Icons on ring */}
          {ring.icons.map((item, ii) => {
            const totalItems = ring.icons.length
            /* negative delay = start mid-animation so icons spread evenly */
            const delay = -((ii / totalItems) * ring.duration)
            const iconSize = ri === 0 ? 22 : ri === 1 ? 20 : 18

            return (
              <div
                key={ii}
                className="absolute"
                style={{
                  top: '50%', left: '50%',
                  width: 0, height: 0,
                  animation: `spin-orbit ${ring.duration}s linear ${delay}s infinite`,
                }}
              >
                <div
                  className="absolute flex items-center justify-center rounded-full"
                  style={{
                    width: iconSize + 16,
                    height: iconSize + 16,
                    top: -(ring.radius + (iconSize + 16) / 2),
                    left: -(iconSize + 16) / 2,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(4px)',
                    animation: `spin-counter ${ring.duration}s linear ${delay}s infinite`,
                  }}
                >
                  <item.Icon size={iconSize} color={item.color} title={item.label} />
                </div>
              </div>
            )
          })}
        </div>
      ))}

      {/* Center: JavaScript */}
      <div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          top: '50%', left: '50%',
          width: 72, height: 72,
          marginTop: -36, marginLeft: -36,
          background: 'rgba(247,220,111,0.08)',
          border: '1px solid rgba(247,220,111,0.3)',
          boxShadow: '0 0 24px 6px rgba(247,220,111,0.15)',
        }}
      >
        <SiJavascript size={32} color="#f7dc6f" />
      </div>
    </div>
  )
}

export default function About({
  dict,
  locale,
  aboutContent,
}: {
  dict: AboutDict
  locale: Locale
  aboutContent: Record<string, string> | null
}) {
  const titleKey = locale === 'tr' ? 'titleTr' : 'titleEn'
  const descKey  = locale === 'tr' ? 'descTr'  : 'descEn'

  const title = aboutContent?.[titleKey] || dict.title
  const desc  = aboutContent?.[descKey]  || dict.description

  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-5xl flex flex-col lg:flex-row items-center gap-16">
        {/* Orbit */}
        <div className="shrink-0">
          <OrbitSystem />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div>
            <p className="text-sm font-mono text-indigo-400 mb-2 tracking-widest uppercase">
              {locale === 'tr' ? 'Ben kimim?' : 'Who am I?'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {title}
            </h2>
          </div>

          <p className="text-white/60 text-base leading-relaxed max-w-lg">
            {desc}
          </p>
        </div>
      </div>
    </section>
  )
}