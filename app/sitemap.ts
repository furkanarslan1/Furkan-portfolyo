import type { MetadataRoute } from 'next'
import { getPublishedProjects } from '@/lib/db/queries'

const BASE_URL = 'https://furkanarslan.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjects()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/tr`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((p) => [
    { url: `${BASE_URL}/tr/projects/${p.slug}`, lastModified: p.createdAt, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/en/projects/${p.slug}`, lastModified: p.createdAt, changeFrequency: 'monthly' as const, priority: 0.7 },
  ])

  return [...staticRoutes, ...projectRoutes]
}