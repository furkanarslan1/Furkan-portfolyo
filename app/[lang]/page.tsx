import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './dictionaries'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <main>
      <Hero dict={dict.hero} locale={lang} />
      <Skills dict={dict.skills} />
      <Projects dict={dict.projects} locale={lang} />
    </main>
  )
}