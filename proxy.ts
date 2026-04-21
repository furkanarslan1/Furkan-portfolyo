import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session'

const locales = ['tr', 'en'] as const
const defaultLocale = 'tr'

const sessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict' as const,
    maxAge: 60 * 60 * 8,
  },
}

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const preferred = acceptLanguage.split(',')[0].split('-')[0]
  return locales.includes(preferred as (typeof locales)[number]) ? preferred : defaultLocale
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin route koruması
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const response = NextResponse.next()
    const session = await getIronSession<{ admin?: { loggedIn: boolean } }>(
      request,
      response,
      sessionOptions
    )

    if (!session.admin?.loggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return response
  }

  // Locale redirect (admin ve login hariç)
  if (pathname.startsWith('/admin')) return

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
}