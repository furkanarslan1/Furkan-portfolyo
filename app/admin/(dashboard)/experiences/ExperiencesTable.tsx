'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteExperience, reorderExperience } from '@/lib/actions/experiences'
import { toast } from 'sonner'
import type { InferSelectModel } from 'drizzle-orm'
import type { experiences } from '@/lib/db/schema'
import type { MultiLang } from '@/lib/db/schema'

type Experience = InferSelectModel<typeof experiences>

export default function ExperiencesTable({ data }: { data: Experience[] }) {
  const [pending, startTransition] = useTransition()

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border p-12 text-center text-muted-foreground">
        Henüz deneyim eklenmedi.
      </div>
    )
  }

  function reorder(id: number, direction: 'up' | 'down') {
    startTransition(async () => {
      try {
        await reorderExperience(id, direction)
      } catch {
        toast.error('Sıralama başarısız')
      }
    })
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/30">
          <tr>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground w-16">Sıra</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Başlık</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Linkler</th>
            <th className="text-right px-4 py-3 font-medium text-muted-foreground">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((exp, idx) => {
            const title = exp.title as MultiLang
            return (
              <tr key={exp.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <Button
                      variant="ghost" size="icon" className="h-6 w-6"
                      disabled={pending || idx === 0}
                      onClick={() => reorder(exp.id, 'up')}
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost" size="icon" className="h-6 w-6"
                      disabled={pending || idx === data.length - 1}
                      onClick={() => reorder(exp.id, 'down')}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium leading-tight">{title.tr}</p>
                  <p className="text-xs text-muted-foreground">{title.en}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    {exp.liveUrl && <span className="text-green-500">Canlı ✓</span>}
                    {exp.githubUrl && <span className="text-blue-400">GitHub ✓</span>}
                    {!exp.liveUrl && !exp.githubUrl && <span>—</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <Link href={`/admin/experiences/${exp.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost" size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      disabled={pending}
                      onClick={() =>
                        startTransition(async () => {
                          try {
                            await deleteExperience(exp.id)
                            toast.success('Silindi')
                          } catch {
                            toast.error('Silinemedi')
                          }
                        })
                      }
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