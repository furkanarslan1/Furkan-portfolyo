import { config } from 'dotenv'
config({ path: '.env.local' })

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import { projects as projectsData } from '../data/projects'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

async function seed() {
  console.log('🌱 Seeding database...')

  // Projeleri ekle
  for (const p of projectsData) {
    await db.insert(schema.projects).values({
      slug: p.slug,
      title: p.title,
      shortDescription: p.shortDescription,
      description: p.description,
      imageUrl: p.coverImage,
      imagePublicId: `portfolio/${p.slug}`,
      liveUrl: p.liveUrl ?? null,
      githubUrl: p.githubUrl ?? null,
      tags: p.tags,
      order: p.id,
      published: true,
    }).onConflictDoNothing()
  }

  console.log(`✅ ${projectsData.length} proje eklendi`)

  // Section içerikleri ekle
  await db.insert(schema.sectionContent).values([
    {
      key: 'hero',
      content: {
        greetingTr: 'Merhaba, ben',
        greetingEn: 'Hi, I\'m',
        subtitleTr: 'Modern web teknolojileriyle kullanıcı odaklı arayüzler geliştiren bir Frontend Developer\'ım.',
        subtitleEn: 'I\'m a Frontend Developer who builds user-focused interfaces with modern web technologies.',
      },
    },
    {
      key: 'about',
      content: {
        titleTr: 'Hakkımda',
        titleEn: 'About Me',
        descTr: 'Merhaba! Ben Furkan, tutkulu bir Frontend Developer\'ım.',
        descEn: 'Hi! I\'m Furkan, a passionate Frontend Developer.',
      },
    },
  ]).onConflictDoNothing()

  console.log('✅ Section içerikleri eklendi')
  process.exit(0)
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})