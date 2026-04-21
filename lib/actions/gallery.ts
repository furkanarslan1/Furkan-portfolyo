'use server'

import { db } from '@/lib/db'
import { galleryImages } from '@/lib/db/schema'
import { eq, max } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary/upload'
import { requireAuth } from '@/lib/session'

export async function uploadGalleryImage(formData: FormData) {
  await requireAuth()
  const file = formData.get('file') as File
  if (!file || file.size === 0) throw new Error('Dosya seçilmedi')

  const { url, publicId } = await uploadToCloudinary(file, 'portfolio/gallery')

  const result = await db.select({ maxOrder: max(galleryImages.order) }).from(galleryImages)
  const maxOrder = result[0]?.maxOrder ?? -1

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
  await requireAuth()
  await deleteFromCloudinary(publicId)
  await db.delete(galleryImages).where(eq(galleryImages.id, id))
  revalidatePath('/admin/gallery')
  revalidatePath('/tr')
  revalidatePath('/en')
}
