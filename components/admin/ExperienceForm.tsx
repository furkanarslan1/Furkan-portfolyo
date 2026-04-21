'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createExperience, updateExperience } from '@/lib/actions/experiences'
import type { InferSelectModel } from 'drizzle-orm'
import type { experiences } from '@/lib/db/schema'
import type { MultiLang } from '@/lib/db/schema'

type Experience = InferSelectModel<typeof experiences>

const schema = z.object({
  titleTr: z.string().min(1, 'Zorunlu'),
  titleEn: z.string().min(1, 'Zorunlu'),
  descTr: z.string().min(1, 'Zorunlu'),
  descEn: z.string().min(1, 'Zorunlu'),
  liveUrl: z.string().url('Geçerli URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Geçerli URL').optional().or(z.literal('')),
})

type FormValues = z.infer<typeof schema>

export default function ExperienceForm({ experience }: { experience?: Experience }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const isEdit = !!experience

  const title = experience?.title as MultiLang | undefined
  const desc = experience?.description as MultiLang | undefined

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isEdit ? {
      titleTr: title!.tr,
      titleEn: title!.en,
      descTr: desc!.tr,
      descEn: desc!.en,
      liveUrl: experience!.liveUrl ?? '',
      githubUrl: experience!.githubUrl ?? '',
    } : { liveUrl: '', githubUrl: '' },
  })

  function onSubmit(values: FormValues) {
    const fd = new FormData()
    Object.entries(values).forEach(([k, v]) => fd.append(k, String(v ?? '')))

    startTransition(async () => {
      try {
        if (isEdit) {
          await updateExperience(experience!.id, fd)
          toast.success('Güncellendi')
        } else {
          await createExperience(fd)
          toast.success('Kaydedildi')
        }
        router.push('/admin/experiences')
      } catch {
        toast.error(isEdit ? 'Güncelleme başarısız' : 'Kaydetme başarısız')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Başlık (TR)" error={errors.titleTr?.message}>
          <Input {...register('titleTr')} />
        </Field>
        <Field label="Başlık (EN)" error={errors.titleEn?.message}>
          <Input {...register('titleEn')} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Açıklama (TR)" error={errors.descTr?.message}>
          <Textarea {...register('descTr')} rows={6} />
        </Field>
        <Field label="Açıklama (EN)" error={errors.descEn?.message}>
          <Textarea {...register('descEn')} rows={6} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Canlı URL (opsiyonel)" error={errors.liveUrl?.message}>
          <Input {...register('liveUrl')} placeholder="https://..." />
        </Field>
        <Field label="GitHub URL (opsiyonel)" error={errors.githubUrl?.message}>
          <Input {...register('githubUrl')} placeholder="https://github.com/..." />
        </Field>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? 'Kaydediliyor...' : isEdit ? 'Güncelle' : 'Kaydet'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          İptal
        </Button>
      </div>
    </form>
  )
}

function Field({
  label, error, children, className,
}: {
  label: string; error?: string; children: React.ReactNode; className?: string
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ''}`}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}