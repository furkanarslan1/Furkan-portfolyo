'use server'

import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { nanoid } from 'nanoid'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const projectSchema = z.object({
  titleTr: z.string().min(1),
  titleEn: z.string().min(1),
  shortDescTr: z.string().min(1),
  shortDescEn: z.string().min(1),
  descTr: z.string().min(1),
  descEn: z.string().min(1),
  imageUrl: z.string().url(),
  imagePublicId: z.string().min(1),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  tags: z.string(),
  order: z.coerce.number().default(0),
  published: z.boolean().default(true),
})

export async function createProject(formData: FormData) {
  const raw = Object.fromEntries(formData)
  const data = projectSchema.parse({ ...raw, published: raw.published === 'true' })

  const slug = `${slugify(data.titleTr)}-${nanoid(6)}`

  await db.insert(projects).values({
    slug,
    title: { tr: data.titleTr, en: data.titleEn },
    shortDescription: { tr: data.shortDescTr, en: data.shortDescEn },
    description: { tr: data.descTr, en: data.descEn },
    imageUrl: data.imageUrl,
    imagePublicId: data.imagePublicId,
    liveUrl: data.liveUrl || null,
    githubUrl: data.githubUrl || null,
    tags: data.tags.split(',').map((t) => t.trim()).filter(Boolean),
    order: data.order,
    published: data.published,
  })

  revalidatePath('/admin/projects')
  revalidatePath('/tr')
  revalidatePath('/en')
}

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id))
  revalidatePath('/admin/projects')
  revalidatePath('/tr')
  revalidatePath('/en')
}

export async function togglePublished(id: number, published: boolean) {
  await db.update(projects).set({ published }).where(eq(projects.id, id))
  revalidatePath('/admin/projects')
}