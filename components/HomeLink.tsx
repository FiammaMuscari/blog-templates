'use client'

import { useLang } from './LangContext'
import Link from 'next/link'

export default function HomeLink({ href }: { href: string }) {
  const { lang } = useLang()
  return (
    <div className="flex justify-end text-base font-medium leading-6">
      <Link
        href={href}
        className="text-primary-500 dark:text-teal-500 hover:text-primary-600 dark:hover:text-teal-400"
        aria-label="All posts"
      >
        {lang === 'en' ? 'See more \u2192' : 'Ver más \u2192'}
      </Link>
    </div>
  )
}
