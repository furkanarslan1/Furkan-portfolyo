import Link from 'next/link'
import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectsTable from './ProjectsTable'

export default async function AdminProjectsPage() {
  const data = await db.select().from(projects).orderBy(projects.order)

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Projeler</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{data.length} proje</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" />
            Yeni Proje
          </Link>
        </Button>
      </div>

      <ProjectsTable data={data} />
    </div>
  )
}