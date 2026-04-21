'use server'

import { db } from '@/lib/db'
import { sectionContent } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { requireAuth } from '@/lib/session'

export async function upsertSection(key: string, content: Record<string, unknown>) {
  await requireAuth()
  await db
    .insert(sectionContent)
    .values({ key, content })
    .onConflictDoUpdate({
      target: sectionContent.key,
      set: { content, updatedAt: new Date() },
    })

  revalidatePath('/tr')
  revalidatePath('/en')
}