import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import GithubLink from '@/components/ui/GithubLink'
import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries'
import { projects } from '@/lib/data/projects'
import ImageSlider from '@/components/sections/ImageSlider'

export async function generateStaticParams() {
  return projects.flatMap((p) =>
    ['tr', 'en'].map((lang) => ({ lang, slug: p.slug }))
  )
}

export default async function ProjectPage({ params }: PageProps<'/[lang]/projects/[slug]'>) {
  const { lang, slug } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <main className="min-h-screen px-6 pt-28 pb-20">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href={`/${lang}#projects`}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          {lang === 'tr' ? 'Geri dön' : 'Go back'}
        </Link>

        {/* Cover image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
          <Image
            src={project.coverImage}
            alt={project.title[lang]}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {project.title[lang]}
          </h1>
          <div className="flex items-center gap-3 shrink-0">
            {project.githubUrl && (
              <GithubLink href={project.githubUrl} label="GitHub" />
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
              >
                <ExternalLink size={15} />
                {dict.projects.view_live}
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-white/60 text-base leading-relaxed mb-10">
          {project.description[lang]}
        </p>

        {/* Image slider */}
        {project.images.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-white mb-4">
              {lang === 'tr' ? 'Ekran Görüntüleri' : 'Screenshots'}
            </h2>
            <ImageSlider images={project.images} alt={project.title[lang]} />
          </div>
        )}

        {/* Technologies */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            {lang === 'tr' ? 'Kullanılan Teknolojiler' : 'Technologies Used'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full text-white/70"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}