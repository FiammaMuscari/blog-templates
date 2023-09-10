import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { TypedBios } from '@/components/homepage/TypedBios'
import Image from 'next/image'

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
            src="/chiiica.png"
            alt="profile"
            width={400}
            height={250}
            priority
            className="md:mr-[7em] "
          />
        </div>
      </div>

      <Main posts={posts} />
    </>
  )
}
