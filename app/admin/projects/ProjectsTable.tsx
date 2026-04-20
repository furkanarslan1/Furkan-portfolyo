'use client'

import { useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteProject, togglePublished } from '@/lib/actions/projects'
import type { projects } from '@/lib/db/schema'
import type { InferSelectModel } from 'drizzle-orm'

type Project = InferSelectModel<typeof projects>

export default function ProjectsTable({ data }: { data: Project[] }) {
  const [pending, startTransition] = useTransition()

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border p-12 text-center text-muted-foreground">
        Henüz proje eklenmedi.
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/30">
          <tr>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Proje</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Etiketler</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Durum</th>
            <th className="text-right px-4 py-3 font-medium text-muted-foreground">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((project) => {
            const title = project.title as { tr: string; en: string }
            return (
              <tr key={project.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-8 rounded-md overflow-hidden shrink-0 bg-muted">
                      <Image src={project.imageUrl} alt={title.tr} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium leading-tight">{title.tr}</p>
                      <p className="text-xs text-muted-foreground">{project.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${project.published ? 'bg-green-500/15 text-green-500' : 'bg-muted text-muted-foreground'}`}>
                    {project.published ? 'Yayında' : 'Gizli'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={pending}
                      onClick={() => startTransition(() => togglePublished(project.id, !project.published))}
                    >
                      {project.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      disabled={pending}
                      onClick={() => startTransition(() => deleteProject(project.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}