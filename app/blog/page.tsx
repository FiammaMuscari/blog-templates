import ListLayout from '@/layouts/ListLayoutWithCovers'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { POSTS_PER_PAGE } from '@/constant'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import Link from 'next/link'
export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }
  const calculateTagCounts = (posts: CoreContent<Blog>[]) => {
    const tagCounts: Record<string, number> = {}

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    return tagCounts
  }
  const tagCounts = calculateTagCounts(posts)
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Todos"
      />{' '}
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => (
            <div key={t} className="mb-2 mr-5 mt-2">
              <Tag text={t} />
              <Link
                href={`/${slug(t)}`}
                className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                aria-label={`View posts tagged ${t}`}
              >
                {` (${tagCounts[t]})`}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
