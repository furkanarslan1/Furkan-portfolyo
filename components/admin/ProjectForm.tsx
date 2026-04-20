'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createProject } from '@/lib/actions/projects'
import ImageUploader from './ImageUploader'
import { toast } from 'sonner'

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

export default function ProjectForm() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { imageUrl: '', imagePublicId: '', order: 0 },
  })

  function onSubmit(values: FormValues) {
    const fd = new FormData()
    Object.entries(values).forEach(([k, v]) => fd.append(k, String(v ?? '')))
    fd.append('published', 'true')

    startTransition(async () => {
      try {
        await createProject(fd)
        toast.success('Proje kaydedildi')
        router.push('/admin/projects')
      } catch {
        toast.error('Kaydetme başarısız')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
      {/* Titles */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Başlık (TR)" error={errors.titleTr?.message}>
          <Input {...register('titleTr')} />
        </Field>
        <Field label="Başlık (EN)" error={errors.titleEn?.message}>
          <Input {...register('titleEn')} />
        </Field>
      </div>

      {/* Short descriptions */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Kısa Açıklama (TR)" error={errors.shortDescTr?.message}>
          <Textarea {...register('shortDescTr')} rows={3} />
        </Field>
        <Field label="Kısa Açıklama (EN)" error={errors.shortDescEn?.message}>
          <Textarea {...register('shortDescEn')} rows={3} />
        </Field>
      </div>

      {/* Full descriptions */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Açıklama (TR)" error={errors.descTr?.message}>
          <Textarea {...register('descTr')} rows={5} />
        </Field>
        <Field label="Açıklama (EN)" error={errors.descEn?.message}>
          <Textarea {...register('descEn')} rows={5} />
        </Field>
      </div>

      {/* Image upload */}
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

      {/* Links */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Canlı URL (opsiyonel)" error={errors.liveUrl?.message}>
          <Input {...register('liveUrl')} placeholder="https://..." />
        </Field>
        <Field label="GitHub URL (opsiyonel)" error={errors.githubUrl?.message}>
          <Input {...register('githubUrl')} placeholder="https://github.com/..." />
        </Field>
      </div>

      {/* Tags & Order */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Etiketler (virgülle ayırın)" error={errors.tags?.message}>
          <Input {...register('tags')} placeholder="Next.js, TypeScript, Tailwind" />
        </Field>
        <Field label="Sıra" error={errors.order?.message}>
          <Input {...register('order', { valueAsNumber: true })} type="number" defaultValue={0} />
        </Field>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? 'Kaydediliyor...' : 'Kaydet'}
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