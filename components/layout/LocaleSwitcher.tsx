'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type Locale } from '@/app/[lang]/dictionaries'

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(next: Locale) {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  return (
    <button
      onClick={() => switchLocale(locale === 'tr' ? 'en' : 'tr')}
      className="text-sm font-medium uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
    >
      {locale === 'tr' ? 'EN' : 'TR'}
    </button>
  )
}
