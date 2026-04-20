'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { type Locale } from '@/app/[lang]/dictionaries'
import LocaleSwitcher from './LocaleSwitcher'

type NavItem = { label: string; href: string }

export default function MobileMenu({
  navItems,
  locale,
}: {
  navItems: NavItem[]
  locale: Locale
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button aria-label="Menüyü aç" className="p-1">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-8 pt-16">
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium hover:opacity-60 transition-opacity"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <LocaleSwitcher locale={locale} />
      </SheetContent>
    </Sheet>
  )
}
