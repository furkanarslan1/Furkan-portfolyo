import '@/app/globals.css'
import { Toaster } from '@/components/ui/sonner'

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}