import Link from 'next/link'
import { db } from '@/lib/db'
import { experiences } from '@/lib/db/schema'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ExperiencesTable from './ExperiencesTable'

export default async function AdminExperiencesPage() {
  const data = await db.select().from(experiences).orderBy(experiences.order)

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Proje Deneyimleri</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{data.length} deneyim</p>
        </div>
        <Button asChild>
          <Link href="/admin/experiences/new">
            <Plus className="h-4 w-4" />
            Yeni Ekle
          </Link>
        </Button>
      </div>
      <ExperiencesTable data={data} />
    </div>
  )
}