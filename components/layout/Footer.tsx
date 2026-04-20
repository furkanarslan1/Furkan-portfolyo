'use client'

import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { Mail } from 'lucide-react'

const links = [
  {
    label: 'furkanarslandev@gmail.com',
    href: 'mailto:furkanarslandev@gmail.com',
    icon: Mail,
    isReactIcon: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/furkan-arslan-w',
    icon: FaLinkedinIn,
    isReactIcon: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/furkanarslan1',
    icon: SiGithub,
    isReactIcon: true,
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-8 px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-sm">
          © {new Date().getFullYear()} Furkan Arslan
        </p>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
            >
              <link.icon size={16} />
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}