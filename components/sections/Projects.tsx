'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SiGithub } from 'react-icons/si'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { type Locale } from '@/app/[lang]/dictionaries'

type MultiLang = { tr: string; en: string }

type Project = {
  id: number
  slug: string
  title: MultiLang
  shortDescription: MultiLang
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
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title[locale]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

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
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="flex items-center gap-1 text-xs font-medium text-white/70 hover:text-white transition-colors ml-auto"
                  >
                    Daha fazla
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        {projects.length > 3 && (
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
        )}
      </div>
    </section>
  )
}