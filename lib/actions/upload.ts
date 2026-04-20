'use server'

import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary/upload'

export async function uploadImage(formData: FormData, folder: string) {
  const file = formData.get('file') as File
  if (!file || file.size === 0) throw new Error('Dosya seçilmedi')
  return uploadToCloudinary(file, folder)
}

export async function deleteImage(publicId: string) {
  await deleteFromCloudinary(publicId)
}