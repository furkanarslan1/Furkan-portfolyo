'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/app/[lang]/dictionaries'

const words: Record<Locale, string[]> = {
  tr: ['Frontend Developer.', 'Yazılım Geliştiricisi.'],
  en: ['Frontend Developer.', 'Software Developer.'],
}

export default function HeroTypewriter({ locale }: { locale: Locale }) {
  const list = words[locale]
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = list[wordIdx]

    if (typing) {
      if (display.length < current.length) {
        const t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setWordIdx((i) => (i + 1) % list.length)
        setTyping(true)
      }
    }
  }, [display, typing, wordIdx, list])

  return (
    <p className="text-xl sm:text-2xl font-mono text-white/80">
      {'<'}
      {display}
      <span className="inline-block w-0.5 h-5 bg-white/80 ml-0.5 align-middle animate-pulse" />
      {'>'}
    </p>
  )
}