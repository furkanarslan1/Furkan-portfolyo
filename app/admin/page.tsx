import { db } from '@/lib/db'
import { projects, skills, sectionContent } from '@/lib/db/schema'

export default async function AdminPage() {
  const [projectCount, skillCount, sectionCount] = await Promise.all([
    db.select().from(projects),
    db.select().from(skills),
    db.select().from(sectionContent),
  ])

  const stats = [
    { label: 'Proje', value: projectCount.length, href: '/admin/projects' },
    { label: 'Yetenek', value: skillCount.length, href: '/admin/sections' },
    { label: 'Sayfa Bölümü', value: sectionCount.length, href: '/admin/sections' },
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">Genel Bakış</h1>
      <p className="text-muted-foreground mb-8">Portfolyo içeriklerinizi yönetin.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border p-5 flex flex-col gap-1"
          >
            <span className="text-3xl font-bold">{stat.value}</span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}