'use server'

import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq, max, lt, gt, asc, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { requireAuth } from '@/lib/session'
import { deleteFromCloudinary } from '@/lib/cloudinary/upload'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const projectSchema = z.object({
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
  published: z.boolean().default(true),
})

export async function createProject(formData: FormData) {
  await requireAuth()
  const raw = Object.fromEntries(formData)
  const data = projectSchema.parse({ ...raw, published: raw.published === 'true' })

  const slug = `${slugify(data.titleTr)}-${nanoid(8)}`

  const result = await db.select({ maxOrder: max(projects.order) }).from(projects)
  const nextOrder = (result[0]?.maxOrder ?? -1) + 1

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
    order: nextOrder,
    published: data.published,
  })

  revalidatePath('/admin/projects')
  revalidatePath('/tr')
  revalidatePath('/en')
}

export async function updateProject(id: number, formData: FormData) {
  await requireAuth()
  const raw = Object.fromEntries(formData)
  const data = projectSchema.parse({ ...raw, published: raw.published === 'true' })

  const [existing] = await db.select({ imagePublicId: projects.imagePublicId }).from(projects).where(eq(projects.id, id))
  if (existing && existing.imagePublicId !== data.imagePublicId) {
    await deleteFromCloudinary(existing.imagePublicId)
  }

  await db.update(projects).set({
    title: { tr: data.titleTr, en: data.titleEn },
    shortDescription: { tr: data.shortDescTr, en: data.shortDescEn },
    description: { tr: data.descTr, en: data.descEn },
    imageUrl: data.imageUrl,
    imagePublicId: data.imagePublicId,
    liveUrl: data.liveUrl || null,
    githubUrl: data.githubUrl || null,
    tags: data.tags.split(',').map((t) => t.trim()).filter(Boolean),
    published: data.published,
  }).where(eq(projects.id, id))

  revalidatePath('/admin/projects')
  revalidatePath('/tr')
  revalidatePath('/en')
}

export async function deleteProject(id: number) {
  await requireAuth()
  await db.delete(projects).where(eq(projects.id, id))
  revalidatePath('/admin/projects')
  revalidatePath('/tr')
  revalidatePath('/en')
}

export async function reorderProject(id: number, direction: 'up' | 'down') {
  await requireAuth()
  const [current] = await db.select().from(projects).where(eq(projects.id, id))
  if (!current) return

  const neighbor = direction === 'up'
    ? await db.select().from(projects).where(lt(projects.order, current.order)).orderBy(desc(projects.order)).limit(1)
    : await db.select().from(projects).where(gt(projects.order, current.order)).orderBy(asc(projects.order)).limit(1)

  if (!neighbor[0]) return

  await db.update(projects).set({ order: neighbor[0].order }).where(eq(projects.id, id))
  await db.update(projects).set({ order: current.order }).where(eq(projects.id, neighbor[0].id))
  revalidatePath('/admin/projects')
  revalidatePath('/tr')
  revalidatePath('/en')
}

export async function togglePublished(id: number, published: boolean) {
  await requireAuth()
  await db.update(projects).set({ published }).where(eq(projects.id, id))
  revalidatePath('/admin/projects')
  revalidatePath('/tr')
  revalidatePath('/en')
}