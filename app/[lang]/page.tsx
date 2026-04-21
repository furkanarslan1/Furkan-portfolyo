export const revalidate = 3600

import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './dictionaries'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Gallery from '@/components/sections/Gallery'
import ProjectsCarousel from '@/components/sections/ProjectsCarousel'
import { getPublishedProjects, getSectionContent, getGalleryImages, getExperiences } from '@/lib/db/queries'

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const [dict, projects, heroContent, aboutContent, galleryImages, experiences] = await Promise.all([
    getDictionary(lang),
    getPublishedProjects(),
    getSectionContent('hero'),
    getSectionContent('about'),
    getGalleryImages(),
    getExperiences(),
  ])

  return (
    <main>
      <Hero dict={dict.hero} locale={lang} heroContent={heroContent} />
      <About dict={dict.about} locale={lang} aboutContent={aboutContent} />
      <ProjectsCarousel experiences={experiences} locale={lang} />
      <Skills dict={dict.skills} />
      <Projects dict={dict.projects} locale={lang} projects={projects} />
      <Gallery images={galleryImages} locale={lang} />
      <Contact locale={lang} />
    </main>
  )
}