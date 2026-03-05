'use client'
import React from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { useLang } from '@/components/LangContext'

export default function Article(post: CoreContent<Blog>) {
  const { slug, date, title, title_en, summary, summary_en, tags, images } = post
  const { lang } = useLang()
  const coverUrl = images?.[0]
  return (
    <li className="py-12 xl:hover:scale-105 xl:transition">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-start xl:gap-5 xl:space-y-0">
          <dl className="xl:col-span-1">
            {coverUrl ? (
              <dt className="mb-4">
                <Link
                  href={`/blog/${slug}`}
                  className="relative aspect-video block overflow-hidden rounded shadow-lg"
                  title={title}
                >
                  <Image
                    alt={title}
                    className="object-cover"
                    src={coverUrl}
                    sizes="(min-width: 1280px) 20vw, 100vw"
                    fill
                    placeholder={post?.[coverUrl] && 'blur'}
                    blurDataURL={post?.[coverUrl]}
                  />
                </Link>
              </dt>
            ) : null}
            <dd className="sr-only">{lang === 'es' ? 'Publicado el' : 'Published On'}</dd>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, lang === 'es' ? 'es-ES' : 'en-US')}</time>
            </dd>
          </dl>
          <div className="space-y-4 xl:col-span-3">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                    {lang === 'en' && title_en ? title_en : title}
                  </Link>
                </h2>
                <div className="mt-3 flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400 xl:line-clamp-2">
                {lang === 'en' && summary_en ? summary_en : summary}
              </div>
            </div>
            <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 dark:text-teal-500  hover:text-primary-600 dark:hover:text-teal-400"
                aria-label={`Read "${title}"`}
              >
                {lang === 'en' ? 'See more \u2192' : 'Ver más \u2192'}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}
