import ExperienceForm from '@/components/admin/ExperienceForm'

export default function NewExperiencePage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Yeni Deneyim</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Proje deneyimi ekle</p>
      </div>
      <ExperienceForm />
    </div>
  )
}