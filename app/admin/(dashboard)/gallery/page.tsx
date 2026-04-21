import { db } from '@/lib/db'
import { galleryImages } from '@/lib/db/schema'
import GalleryManager from './GalleryManager'

export default async function GalleryPage() {
  const images = await db.select().from(galleryImages).orderBy(galleryImages.order)

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Galeri</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Ana sayfada gösterilecek fotoğrafları yönetin.
        </p>
      </div>
      <GalleryManager images={images} />
    </div>
  )
}
