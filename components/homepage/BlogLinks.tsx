import Link from 'next/link'
import { Twemoji } from '@/components/Twemoji'

export function BlogLinks() {
  return (
    <div className="flex flex-col space-y-1.5">
      <Link href="/projects" className="hover:underline">
        <Twemoji emoji="hammer-and-wrench" />
        <span data-umami-event="home-link-projects" className="ml-1.5">
          What have I built?
        </span>
      </Link>
      <Link href="/blog" className="hover:underline">
        <Twemoji emoji="memo" />
        <span data-umami-event="home-link-blog" className="ml-1.5">
          My writings
        </span>
      </Link>
      <Link href="/about" className="hover:underline">
        <Twemoji emoji="face-with-monocle" />
        <span data-umami-event="home-link-about" className="ml-1.5">
          More about me
        </span>
      </Link>
      <Link href="/resume" className="hover:underline">
        <Twemoji emoji="briefcase" />
        <span data-umami-event="home-link-resume" className="ml-1.5">
          My career
        </span>
      </Link>
    </div>
  )
}
