'use client'

import { useState } from 'react'
import { SiGithub } from 'react-icons/si'
import { ExternalLink, X, ArrowUpRight } from 'lucide-react'
import { type Locale } from '@/app/[lang]/dictionaries'

type MultiLang = { tr: string; en: string }

type Project = {
  id: number
  slug: string
  title: MultiLang
  shortDescription: MultiLang
  description: MultiLang
  imageUrl: string
  tags: string[]
  githubUrl: string | null
  liveUrl: string | null
}

type ProjectsDict = {
  title: string
  subtitle: string
  view_live: string
  view_code: string
  view_all: string
}

function ProjectModal({
  project,
  locale,
  dict,
  onClose,
}: {
  project: Project
  locale: Locale
  dict: ProjectsDict
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col"
        style={{
          background: 'rgba(12,12,20,0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 60px 0 rgba(99,102,241,0.2), 0 0 0 1px rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapat butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full text-white/50 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <X size={15} />
        </button>

        {/* İçerik */}
        <div className="flex flex-col gap-5 p-6">
          <h2 className="text-xl font-bold text-white leading-tight">
            {project.title[locale]}
          </h2>

          <p className="text-white/60 text-sm leading-relaxed">
            {project.description[locale]}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full text-white/60"
                style={{
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex items-center gap-3 pt-1 border-t border-white/8">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <SiGithub size={15} />
                  {dict.view_code}
                  <ArrowUpRight size={13} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <ExternalLink size={14} />
                  {dict.view_live}
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects({
  dict,
  locale,
  projects,
}: {
  dict: ProjectsDict
  locale: Locale
  projects: Project[]
}) {
  const visible = projects.slice(0, 3)
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{dict.title}</h2>
          <p className="text-white/50 text-base">{dict.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project) => (
            <div
              key={project.slug}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Cover image */}
              {/* <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title[locale]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div> */}

              {/* Content */}
              <div className="flex flex-col flex-1 gap-3 p-4">
                <h3 className="text-white font-semibold text-base leading-tight">
                  {project.title[locale]}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">
                  {project.shortDescription[locale]}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full text-white/60"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                      >
                        <SiGithub size={14} />
                        {dict.view_code}
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                      >
                        <ExternalLink size={13} />
                        {dict.view_live}
                      </a>
                    )}
                  </div>

                  {/* Detay butonu */}
                  <button
                    onClick={() => setSelected(project)}
                    className="text-xs text-white/40 hover:text-white transition-colors underline underline-offset-2"
                  >
                    {locale === 'tr' ? 'Detaylar' : 'Details'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
            <a
              href="https://github.com/furkanarslan1"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-border-image flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              {dict.view_all}
              <ExternalLink size={14} />
            </a>
          </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal
          project={selected}
          locale={locale}
          dict={dict}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}