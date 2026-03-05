import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { TypedBios } from '@/components/homepage/TypedBios'
import Image from 'next/image'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { clsx } from 'clsx'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <>
      <div className="mt-8 divide-y divide-gray-200 dark:divide-gray-700 md:mt-16">
        <div className="border-none flex justify-center  animate-float relative">
          <div className="animate-floating  w-full">
            <TypedBios />
          </div>
          <Image
            src="/chica.webp"
            alt="profile"
            width={400}
            height={250}
            priority
            className="md:mr-[7em] "
          />
        </div>
      </div>
      <div className="py-12">
        <div className="flex flex-wrap gap-12 justify-center">
          {projectsData.slice(0, 5).map((d) => (
            <div
              key={d.title}
              className="z-10 max-w-[19rem] mb-8 scale-100 hover:z-50 xl:mb-0 xl:hover:scale-[1.05]"
            >
              <div
                className={clsx(
                  'flex flex-col overflow-hidden xl:rounded-lg',
                  'bg-white shadow-md dark:bg-gray-900 dark:prose-invert dark:shadow-mondegreen'
                )}
              >
                <Card title={d.title} description={d.description} imgSrc={d.imgSrc} href={d.href} />
                <span className="h-1.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Main posts={posts} />
    </>
  )
}
