'use client'

import { useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { upsertSection } from '@/lib/actions/sections'
import ImageUploader from '@/components/admin/ImageUploader'
import { toast } from 'sonner'

type Field =
  | { name: string; label: string; type: 'input' | 'textarea' }
  | { name: string; publicIdName: string; label: string; type: 'imageUpload'; folder: string }

export default function SectionEditor({
  sectionKey,
  label,
  fields,
  initialValues,
}: {
  sectionKey: string
  label: string
  fields: Field[]
  initialValues: Record<string, string>
}) {
  const [pending, startTransition] = useTransition()
  const { register, handleSubmit, control } = useForm({ defaultValues: initialValues })

  function onSubmit(values: Record<string, string>) {
    startTransition(async () => {
      try {
        await upsertSection(sectionKey, values)
        toast.success('Kaydedildi')
      } catch {
        toast.error('Kaydetme başarısız')
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-border p-5 space-y-4"
    >
      <h2 className="font-semibold text-base">{label}</h2>

      {fields.map((field) => {
        if (field.type === 'imageUpload') {
          return (
            <div key={field.name} className="space-y-1.5">
              <Label>{field.label}</Label>
              <Controller
                control={control}
                name={field.name}
                render={({ field: f }) => (
                  <Controller
                    control={control}
                    name={field.publicIdName}
                    render={({ field: pidField }) => (
                      <ImageUploader
                        folder={field.folder}
                        value={f.value ?? ''}
                        publicId={pidField.value ?? ''}
                        onChange={(url, pid) => {
                          f.onChange(url)
                          pidField.onChange(pid)
                        }}
                      />
                    )}
                  />
                )}
              />
            </div>
          )
        }

        if (field.type === 'textarea') {
          return (
            <div key={field.name} className="space-y-1.5">
              <Label>{field.label}</Label>
              <Textarea {...register(field.name)} rows={3} />
            </div>
          )
        }

        return (
          <div key={field.name} className="space-y-1.5">
            <Label>{field.label}</Label>
            <Input {...register(field.name)} />
          </div>
        )
      })}

      <Button type="submit" size="sm" disabled={pending}>
        {pending ? 'Kaydediliyor...' : 'Kaydet'}
      </Button>
    </form>
  )
}