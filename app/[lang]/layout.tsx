import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { hasLocale, type Locale } from './dictionaries'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Furkan Arslan',
  description: 'Full Stack Developer Portfolio',
}

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }]
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  )
}