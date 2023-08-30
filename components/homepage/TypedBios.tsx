'use client'

import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { Twemoji } from '@/components/Twemoji'

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    backDelay: 1000,
  })
}

export function TypedBios() {
  const el = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!el.current) return

    const typed = createTypedInstance(el.current)
    return () => {
      // destroy Typed instance during cleanup to stop animation
      typed.destroy()
    }
  }, [])

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>I'm a learner, builder, and freedom seeker.</li>
        <li>I live in Shenzhen, China.</li>
        <li>The first programming language I learned was C#.</li>
        <li>I love web development.</li>
        <li>I'm focusing on building eCommerce software.</li>
        <li>I work mostly with JS/TS technologies.</li>
        <li>
          I love playing video games, Baldur's Gate 3 is my favorite one.
          <Twemoji emoji="video-game" />
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}
