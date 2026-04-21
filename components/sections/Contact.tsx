'use client'

import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { Mail, ArrowUpRight } from 'lucide-react'
import type { Locale } from '@/app/[lang]/dictionaries'

const contacts = [
  {
    label: 'Mail',
    value: 'furkanarslandev@gmail.com',
    href: 'mailto:furkanarslandev@gmail.com',
    Icon: Mail,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.15)',
  },
  {
    label: 'LinkedIn',
    value: 'furkan-arslan-w',
    href: 'https://www.linkedin.com/in/furkan-arslan-w',
    Icon: FaLinkedinIn,
    color: '#0a66c2',
    glow: 'rgba(10,102,194,0.15)',
  },
  {
    label: 'GitHub',
    value: 'furkanarslan1',
    href: 'https://github.com/furkanarslan1',
    Icon: SiGithub,
    color: '#ffffff',
    glow: 'rgba(255,255,255,0.08)',
  },
]

const text = {
  tr: {
    eyebrow: 'İletişime Geç',
    heading: ['Birlikte', 'çalışmak için'],
    sub: 'Aklınızda bir proje varsa veya sadece merhaba demek istiyorsanız, yeni fikirleri ve fırsatları konuşmaya her zaman açığım.',
  },
  en: {
    eyebrow: 'Get In Touch',
    heading: ["Let's work", 'together'],
    sub: "If you have a project in mind or just want to say hello, I'm always open to discussing new ideas and opportunities.",
  },
}

export default function Contact({ locale }: { locale: Locale }) {
  const t = text[locale]

  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">

          {/* Left: text */}
          <div className="flex-1 flex flex-col gap-6">
            <p className="text-sm font-mono text-indigo-400 tracking-widest uppercase">
              {t.eyebrow}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              {t.heading[0]}
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa, #818cf8)' }}
              >
                {t.heading[1]}
              </span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed max-w-md">
              {t.sub}
            </p>
          </div>

          {/* Right: contact cards */}
          <div className="flex flex-col gap-4 w-full lg:max-w-sm">
            {contacts.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = c.glow
                  ;(e.currentTarget as HTMLElement).style.borderColor = c.color + '55'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px 0 ${c.glow}`
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <c.Icon size={18} color={c.color} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-white/40 uppercase tracking-wider">{c.label}</span>
                  <span className="text-sm text-white/80 truncate">{c.value}</span>
                </div>
                <ArrowUpRight
                  size={16}
                  className="ml-auto text-white/20 group-hover:text-white/60 transition-colors shrink-0"
                />
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}