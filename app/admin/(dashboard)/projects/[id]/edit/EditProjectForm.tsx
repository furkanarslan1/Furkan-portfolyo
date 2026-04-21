'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateProject } from '@/lib/actions/projects'
import ImageUploader from '@/components/admin/ImageUploader'
import type { InferSelectModel } from 'drizzle-orm'
import type { projects } from '@/lib/db/schema'

type Project = InferSelectModel<typeof projects>
type MultiLang = { tr: string; en: string }

const schema = z.object({
  titleTr: z.string().min(1, 'Zorunlu'),
  titleEn: z.string().min(1, 'Zorunlu'),
  shortDescTr: z.string().min(1, 'Zorunlu'),
  shortDescEn: z.string().min(1, 'Zorunlu'),
  descTr: z.string().min(1, 'Zorunlu'),
  descEn: z.string().min(1, 'Zorunlu'),
  imageUrl: z.string().min(1, 'Görsel yükleyin'),
  imagePublicId: z.string().min(1, 'Görsel yükleyin'),
  liveUrl: z.string().url('Geçerli URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Geçerli URL').optional().or(z.literal('')),
  tags: z.string().min(1, 'En az bir etiket giriniz'),
  order: z.number().int().nonnegative(),
})

type FormValues = z.infer<typeof schema>

export default function EditProjectForm({ project }: { project: Project }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const title = project.title as MultiLang
  const shortDesc = project.shortDescription as MultiLang
  const desc = project.description as MultiLang

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      titleTr: title.tr,
      titleEn: title.en,
      shortDescTr: shortDesc.tr,
      shortDescEn: shortDesc.en,
      descTr: desc.tr,
      descEn: desc.en,
      imageUrl: project.imageUrl,
      imagePublicId: project.imagePublicId,
      liveUrl: project.liveUrl ?? '',
      githubUrl: project.githubUrl ?? '',
      tags: project.tags.join(', '),
      order: project.order,
    },
  })

  function onSubmit(values: FormValues) {
    const fd = new FormData()
    Object.entries(values).forEach(([k, v]) => fd.append(k, String(v ?? '')))
    fd.append('published', String(project.published))

    startTransition(async () => {
      try {
        await updateProject(project.id, fd)
        toast.success('Proje güncellendi')
        router.push('/admin/projects')
      } catch {
        toast.error('Güncelleme başarısız')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Başlık (TR)" error={errors.titleTr?.message}>
          <Input {...register('titleTr')} />
        </Field>
        <Field label="Başlık (EN)" error={errors.titleEn?.message}>
          <Input {...register('titleEn')} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Kısa Açıklama (TR)" error={errors.shortDescTr?.message}>
          <Textarea {...register('shortDescTr')} rows={3} />
        </Field>
        <Field label="Kısa Açıklama (EN)" error={errors.shortDescEn?.message}>
          <Textarea {...register('shortDescEn')} rows={3} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Açıklama (TR)" error={errors.descTr?.message}>
          <Textarea {...register('descTr')} rows={5} />
        </Field>
        <Field label="Açıklama (EN)" error={errors.descEn?.message}>
          <Textarea {...register('descEn')} rows={5} />
        </Field>
      </div>

      <Controller
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <Field label="Proje Görseli" error={errors.imageUrl?.message}>
            <Controller
              control={control}
              name="imagePublicId"
              render={({ field: pidField }) => (
                <ImageUploader
                  folder="portfolio/projects"
                  value={field.value}
                  publicId={pidField.value}
                  onChange={(url, pid) => {
                    field.onChange(url)
                    pidField.onChange(pid)
                  }}
                />
              )}
            />
          </Field>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Canlı URL (opsiyonel)" error={errors.liveUrl?.message}>
          <Input {...register('liveUrl')} placeholder="https://..." />
        </Field>
        <Field label="GitHub URL (opsiyonel)" error={errors.githubUrl?.message}>
          <Input {...register('githubUrl')} placeholder="https://github.com/..." />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Etiketler (virgülle ayırın)" error={errors.tags?.message}>
          <Input {...register('tags')} />
        </Field>
        <Field label="Sıra" error={errors.order?.message}>
          <Input {...register('order', { valueAsNumber: true })} type="number" />
        </Field>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? 'Kaydediliyor...' : 'Güncelle'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          İptal
        </Button>
      </div>
    </form>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}