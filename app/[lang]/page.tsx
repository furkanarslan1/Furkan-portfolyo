import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './dictionaries'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Gallery from '@/components/sections/Gallery'
import { getPublishedProjects, getSectionContent, getGalleryImages } from '@/lib/db/queries'

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const [dict, projects, heroContent, aboutContent, galleryImages] = await Promise.all([
    getDictionary(lang),
    getPublishedProjects(),
    getSectionContent('hero'),
    getSectionContent('about'),
    getGalleryImages(),
  ])

  return (
    <main>
      <Hero dict={dict.hero} locale={lang} heroContent={heroContent} />
      <About dict={dict.about} locale={lang} aboutContent={aboutContent} />
      <Skills dict={dict.skills} />
      <Projects dict={dict.projects} locale={lang} projects={projects} />
      <Gallery images={galleryImages} locale={lang} />
      <Contact locale={lang} />
    </main>
  )
}