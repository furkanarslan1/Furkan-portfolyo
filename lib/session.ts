import { getIronSession, type IronSessionData } from 'iron-session'
import { cookies } from 'next/headers'

declare module 'iron-session' {
  interface IronSessionData {
    admin?: { loggedIn: boolean }
  }
}

const sessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict' as const,
    maxAge: 60 * 60 * 8, // 8 saat
  },
}

export async function getSession() {
  const cookieStore = await cookies()
  return getIronSession<IronSessionData>(cookieStore, sessionOptions)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session.admin?.loggedIn) {
    throw new Error('Unauthorized')
  }
}