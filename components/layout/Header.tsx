import { type Locale } from '@/app/[lang]/dictionaries'
import LocaleSwitcher from './LocaleSwitcher'
import MobileMenu from './MobileMenu'

type Dict = {
  nav: {
    about: string
    skills: string
    experience?: string
    projects: string
    contact: string
  }
}

export default function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const navItems = [
    { label: dict.nav.about, href: '#about' },
    { label: dict.nav.skills, href: '#skills' },
    { label: dict.nav.projects, href: '#projects' },
    { label: dict.nav.contact, href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="text-lg font-semibold tracking-tight text-white">
          Furkan Arslan
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <LocaleSwitcher locale={locale} />
        </nav>

        <div className="flex md:hidden text-white">
          <MobileMenu navItems={navItems} locale={locale} />
        </div>
      </div>
    </header>
  )
}
