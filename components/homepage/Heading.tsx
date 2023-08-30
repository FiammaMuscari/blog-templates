import { Twemoji } from '@/components/Twemoji'

export function Heading() {
  return (
    <h1 className="text-neutral-900 dark:text-neutral-200">
      I'm <span className="font-medium">Thomas Liu</span> - a passionate Software Engineer in
      <span className="hidden font-medium">Shenzhen, China</span>
      <span className="absolute ml-1.5 inline-flex pt-[3px]">
        <Twemoji emoji="flag-china" />
      </span>
    </h1>
  )
}
