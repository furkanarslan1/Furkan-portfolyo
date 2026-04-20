import { db } from '@/lib/db'
import { sectionContent } from '@/lib/db/schema'
import SectionEditor from './SectionEditor'

type SectionField =
  | { name: string; label: string; type: 'input' | 'textarea' }
  | { name: string; publicIdName: string; label: string; type: 'imageUpload'; folder: string }

const sectionKeys: { key: string; label: string; fields: SectionField[] }[] = [
  {
    key: 'hero',
    label: 'Hero',
    fields: [
      { name: 'greetingTr', label: 'Karşılama (TR)', type: 'input' },
      { name: 'greetingEn', label: 'Karşılama (EN)', type: 'input' },
      { name: 'subtitleTr', label: 'Alt Başlık (TR)', type: 'textarea' },
      { name: 'subtitleEn', label: 'Alt Başlık (EN)', type: 'textarea' },
      { name: 'imageUrl', publicIdName: 'imagePublicId', label: 'Profil Fotoğrafı', type: 'imageUpload', folder: 'portfolio/hero' },
    ],
  },
  {
    key: 'about',
    label: 'Hakkımda',
    fields: [
      { name: 'titleTr', label: 'Başlık (TR)', type: 'input' as const },
      { name: 'titleEn', label: 'Başlık (EN)', type: 'input' as const },
      { name: 'descTr', label: 'Açıklama (TR)', type: 'textarea' as const },
      { name: 'descEn', label: 'Açıklama (EN)', type: 'textarea' as const },
    ],
  },
]

export default async function SectionsPage() {
  const data = await db.select().from(sectionContent)
  const contentMap = Object.fromEntries(data.map((s) => [s.key, s.content]))

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Sayfa İçerikleri</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Bölüm metinlerini buradan güncelleyebilirsiniz.
        </p>
      </div>

      {sectionKeys.map((section) => (
        <SectionEditor
          key={section.key}
          sectionKey={section.key}
          label={section.label}
          fields={section.fields}
          initialValues={(contentMap[section.key] ?? {}) as Record<string, string>}
        />
      ))}
    </div>
  )
}