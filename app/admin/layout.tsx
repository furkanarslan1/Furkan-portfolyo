import '@/app/globals.css'

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  )
}