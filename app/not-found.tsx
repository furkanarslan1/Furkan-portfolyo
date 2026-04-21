import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-white/20">404</h1>
          <p className="text-muted-foreground">Sayfa bulunamadı.</p>
          <Link
            href="/tr"
            className="inline-block text-sm underline underline-offset-4 text-white/60 hover:text-white transition-colors"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </body>
    </html>
  )
}