'use client'

import { useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import { uploadImage } from '@/lib/actions/upload'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

type Props = {
  folder: string
  value: string
  publicId: string
  onChange: (url: string, publicId: string) => void
  label?: string
}

export default function ImageUploader({ folder, value, publicId, onChange, label = 'Görsel' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)

    const fd = new FormData()
    fd.append('file', file)

    startTransition(async () => {
      try {
        const result = await uploadImage(fd, folder)
        onChange(result.url, result.publicId)
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        console.error('[ImageUploader]', msg)
        setError(`Yükleme başarısız: ${msg}`)
      }
    })
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpg,image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFile}
      />

      {value ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
          <Image src={value} alt={label} fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange('', '')}
            className="absolute top-2 right-2 bg-background/80 rounded-full p-1 hover:bg-background transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-video rounded-lg border border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/30 transition-colors"
        >
          <Upload size={20} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Tıkla veya sürükle</p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={() => inputRef.current?.click()}
      >
        {pending ? 'Yükleniyor...' : value ? 'Değiştir' : 'Görsel Seç'}
      </Button>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}