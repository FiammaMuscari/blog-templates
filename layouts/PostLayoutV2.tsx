import { CoreContent } from 'pliny/utils/contentlayer'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/Comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import TOCInline from '@/components/TOCInline'
import { ReactNode } from 'react'
import { Authors, Blog } from 'contentlayer/generated'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  authorDetails: CoreContent<Authors>[]
  content: CoreContent<Blog>
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
}

export default function PostLayout(props: Props) {
  const { authorDetails, content, next, prev, children } = props
  const { filePath, path, slug, date, title, tags, images, toc } = content
  const basePath = path.split('/')[0]
  const coverUrl = images?.[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="">
              <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">Author</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
              <h2 className="pt-6 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Table of Content
              </h2>
              <TOCInline asDisclosure={false} toc={toc} />
            </div>
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              {coverUrl ? (
                <div className="relative aspect-video mt-6">
                  <Image
                    alt={title}
                    className="w-full rounded object-cover shadow-lg"
                    src={coverUrl}
                    fill
                    sizes="100vw"
                    placeholder={[coverUrl] && 'blur'}
                    blurDataURL={coverUrl}
                  />
                </div>
              ) : null}
              <div className="prose max-w-none break-words pt-10 pb-8 dark:prose-invert">
                {children}
              </div>
              <div className="border-t border-gray-200 pt-6 pb-6 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">
                <Link href={editUrl(filePath)}>{'View on GitHub'}</Link>
              </div>
              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="mt-3 flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="mt-3 text-primary-500 dark:text-teal-500 hover:text-primary-600 dark:hover:text-primary-400 dark:hover:text-teal-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="mt-3 text-primary-500 dark:text-teal-500 hover:text-primary-600 dark:hover:text-primary-400 dark:hover:text-teal-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 dark:text-teal-500 hover:text-primary-600 dark:hover:text-primary-400 dark:hover:text-teal-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
