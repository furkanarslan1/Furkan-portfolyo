import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['tr', 'en'] as const
const defaultLocale = 'tr'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const preferred = acceptLanguage.split(',')[0].split('-')[0]
  return locales.includes(preferred as (typeof locales)[number]) ? preferred : defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|api|admin|favicon.ico|.*\\..*).*)'],
}