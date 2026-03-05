'use client'

import { useLang } from './LangContext'

export default function ProjectsHeader() {
  const { lang } = useLang()
  return (
    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
      {lang === 'en' ? 'Projects' : 'Proyectos'}
    </h1>
  )
}
