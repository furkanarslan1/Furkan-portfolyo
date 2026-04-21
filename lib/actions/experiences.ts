'use server'

import { db } from '@/lib/db'
import { experiences } from '@/lib/db/schema'
import { eq, max, lt, gt, asc, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { requireAuth } from '@/lib/session'

const schema = z.object({
  titleTr: z.string().min(1),
  titleEn: z.string().min(1),
  descTr: z.string().min(1),
  descEn: z.string().min(1),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
})

function revalidate() {
  revalidatePath('/admin/experiences')
  revalidatePath('/tr')
  revalidatePath('/en')
}

export async function createExperience(formData: FormData) {
  await requireAuth()
  const data = schema.parse(Object.fromEntries(formData))

  const result = await db.select({ maxOrder: max(experiences.order) }).from(experiences)
  const nextOrder = (result[0]?.maxOrder ?? -1) + 1

  await db.insert(experiences).values({
    title: { tr: data.titleTr, en: data.titleEn },
    description: { tr: data.descTr, en: data.descEn },
    liveUrl: data.liveUrl || null,
    githubUrl: data.githubUrl || null,
    order: nextOrder,
  })
  revalidate()
}

export async function updateExperience(id: number, formData: FormData) {
  await requireAuth()
  const data = schema.parse(Object.fromEntries(formData))
  await db.update(experiences).set({
    title: { tr: data.titleTr, en: data.titleEn },
    description: { tr: data.descTr, en: data.descEn },
    liveUrl: data.liveUrl || null,
    githubUrl: data.githubUrl || null,
  }).where(eq(experiences.id, id))
  revalidate()
}

export async function deleteExperience(id: number) {
  await requireAuth()
  await db.delete(experiences).where(eq(experiences.id, id))
  revalidate()
}

export async function reorderExperience(id: number, direction: 'up' | 'down') {
  await requireAuth()
  const [current] = await db.select().from(experiences).where(eq(experiences.id, id))
  if (!current) return

  const neighbor = direction === 'up'
    ? await db.select().from(experiences).where(lt(experiences.order, current.order)).orderBy(desc(experiences.order)).limit(1)
    : await db.select().from(experiences).where(gt(experiences.order, current.order)).orderBy(asc(experiences.order)).limit(1)

  if (!neighbor[0]) return

  await db.update(experiences).set({ order: neighbor[0].order }).where(eq(experiences.id, id))
  await db.update(experiences).set({ order: current.order }).where(eq(experiences.id, neighbor[0].id))
  revalidate()
}