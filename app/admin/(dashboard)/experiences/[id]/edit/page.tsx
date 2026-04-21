import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { experiences } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import ExperienceForm from '@/components/admin/ExperienceForm'
import type { MultiLang } from '@/lib/db/schema'

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await db.select().from(experiences).where(eq(experiences.id, Number(id)))
  const experience = result[0]

  if (!experience) notFound()

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Deneyimi Düzenle</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          {(experience.title as MultiLang).tr}
        </p>
      </div>
      <ExperienceForm experience={experience} />
    </div>
  )
}