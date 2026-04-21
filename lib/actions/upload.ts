'use server'

import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary/upload'
import { requireAuth } from '@/lib/session'

export async function uploadImage(formData: FormData, folder: string) {
  await requireAuth()
  const file = formData.get('file') as File
  if (!file || file.size === 0) throw new Error('Dosya seçilmedi')
  return uploadToCloudinary(file, folder)
}

export async function deleteImage(publicId: string) {
  await requireAuth()
  await deleteFromCloudinary(publicId)
}