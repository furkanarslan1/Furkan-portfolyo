'use server'

import { db } from '@/lib/db'
import { galleryImages } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary/upload'

export async function uploadGalleryImage(formData: FormData) {
  const file = formData.get('file') as File
  if (!file || file.size === 0) throw new Error('Dosya seçilmedi')

  const { url, publicId } = await uploadToCloudinary(file, 'portfolio/gallery')

  const existing = await db.select().from(galleryImages).orderBy(galleryImages.order)
  const maxOrder = existing.length > 0 ? Math.max(...existing.map((i) => i.order)) : -1

  await db.insert(galleryImages).values({
    imageUrl: url,
    imagePublicId: publicId,
    order: maxOrder + 1,
  })

  revalidatePath('/admin/gallery')
  revalidatePath('/tr')
  revalidatePath('/en')
}

export async function deleteGalleryImage(id: number, publicId: string) {
  await deleteFromCloudinary(publicId)
  await db.delete(galleryImages).where(eq(galleryImages.id, id))
  revalidatePath('/admin/gallery')
  revalidatePath('/tr')
  revalidatePath('/en')
}
