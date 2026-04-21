import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import ProjectForm from '@/components/admin/ProjectForm'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await db.select().from(projects).where(eq(projects.id, Number(id)))
  const project = result[0]

  if (!project) notFound()

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Projeyi Düzenle</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          {(project.title as { tr: string }).tr}
        </p>
      </div>
      <ProjectForm project={project} />
    </div>
  )
}