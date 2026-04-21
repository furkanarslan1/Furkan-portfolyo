import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import '../globals.css'
import { getDictionary, hasLocale } from './dictionaries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const BASE_URL = 'https://furkanarslan.dev'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  const isTr = lang === 'tr'

  const title = 'Furkan Arslan'
  const description = isTr
    ? 'Full Stack Developer — Next.js, TypeScript, Node.js ile modern web uygulamaları geliştiriyorum.'
    : 'Full Stack Developer — Building modern web applications with Next.js, TypeScript and Node.js.'

  return {
    title: { default: title, template: `%s | ${title}` },
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: { tr: `${BASE_URL}/tr`, en: `${BASE_URL}/en` },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}`,
      siteName: title,
      locale: isTr ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [{ url: `${BASE_URL}/og.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  }
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

  const dict = await getDictionary(lang)

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-[#0a0a0f] text-foreground">
        {/* Global animated background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(109,40,217,0.55), transparent 70%)',
              animation: 'blob1 9s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-10 right-0 w-80 h-80 rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(67,56,202,0.5), transparent 70%)',
              animation: 'blob2 12s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)',
              animation: 'blob3 7s ease-in-out infinite',
            }}
          />
        </div>
        <Header dict={dict} locale={lang} />
        {children}
        <Footer />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FBFQMDV536" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FBFQMDV536');
        `}</Script>
      </body>
    </html>
  )
}
