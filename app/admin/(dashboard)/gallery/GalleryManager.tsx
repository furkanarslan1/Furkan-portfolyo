'use client'

import { useRef, useTransition } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { Trash2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { uploadGalleryImage, deleteGalleryImage } from '@/lib/actions/gallery'
import type { InferSelectModel } from 'drizzle-orm'
import type { galleryImages } from '@/lib/db/schema'

type GalleryImage = InferSelectModel<typeof galleryImages>

export default function GalleryManager({ images }: { images: GalleryImage[] }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pending, startTransition] = useTransition()

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    startTransition(async () => {
      try {
        await uploadGalleryImage(fd)
        toast.success('Fotoğraf yüklendi')
      } catch {
        toast.error('Yükleme başarısız')
      }
    })
    e.target.value = ''
  }

  function handleDelete(id: number, publicId: string) {
    startTransition(async () => {
      try {
        await deleteGalleryImage(id, publicId)
        toast.success('Fotoğraf silindi')
      } catch {
        toast.error('Silme başarısız')
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Upload */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpg,image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleUpload}
      />
      <Button
        onClick={() => inputRef.current?.click()}
        disabled={pending}
        className="gap-2"
      >
        <Upload size={15} />
        {pending ? 'Yükleniyor...' : 'Fotoğraf Ekle'}
      </Button>

      {/* Grid */}
      {images.length === 0 ? (
        <div className="rounded-xl border border-border p-12 text-center text-muted-foreground">
          Henüz fotoğraf eklenmedi.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-border">
              <Image
                src={img.imageUrl}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
              <button
                onClick={() => handleDelete(img.id, img.imagePublicId)}
                disabled={pending}
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={20} className="text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
