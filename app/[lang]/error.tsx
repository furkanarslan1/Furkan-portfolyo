'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Bir şeyler ters gitti.</h2>
        <p className="text-muted-foreground text-sm">{error.message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="text-sm underline underline-offset-4 text-white/60 hover:text-white transition-colors"
          >
            Tekrar dene
          </button>
          <Link
            href="."
            className="text-sm underline underline-offset-4 text-white/60 hover:text-white transition-colors"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  )
}