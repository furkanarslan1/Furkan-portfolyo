'use client'

import { SiGithub } from 'react-icons/si'

export default function GithubLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
    >
      <SiGithub size={16} />
      {label}
    </a>
  )
}
