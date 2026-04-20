'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { upsertSection } from '@/lib/actions/sections'

type Field = { name: string; label: string; type: 'input' | 'textarea' }

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
  const { register, handleSubmit } = useForm({ defaultValues: initialValues })

  function onSubmit(values: Record<string, string>) {
    startTransition(async () => {
      await upsertSection(sectionKey, values)
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-border p-5 space-y-4"
    >
      <h2 className="font-semibold text-base">{label}</h2>

      {fields.map((field) =>
        field.type === 'textarea' ? (
          <div key={field.name} className="space-y-1.5">
            <Label>{field.label}</Label>
            <Textarea {...register(field.name)} rows={3} />
          </div>
        ) : (
          <div key={field.name} className="space-y-1.5">
            <Label>{field.label}</Label>
            <Input {...register(field.name)} />
          </div>
        )
      )}

      <Button type="submit" size="sm" disabled={pending}>
        {pending ? 'Kaydediliyor...' : 'Kaydet'}
      </Button>
    </form>
  )
}