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
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 gün
  },
}

export async function getSession() {
  const cookieStore = await cookies()
  return getIronSession<IronSessionData>(cookieStore, sessionOptions)
}