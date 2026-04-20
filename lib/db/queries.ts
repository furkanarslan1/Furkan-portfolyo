import { db } from './index'
import { projects, sectionContent } from './schema'
import { eq, asc } from 'drizzle-orm'

export async function getPublishedProjects() {
  return db
    .select()
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(asc(projects.order))
}

export async function getProjectBySlug(slug: string) {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
  return result[0] ?? null
}

export async function getSectionContent(key: string) {
  const result = await db
    .select()
    .from(sectionContent)
    .where(eq(sectionContent.key, key))
  return (result[0]?.content ?? null) as Record<string, string> | null
}