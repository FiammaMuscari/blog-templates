'use client'

import { TOC } from '@/types/server'
import { useLang } from './LangContext'

interface TOCInlineProps {
  toc: TOC
  indentDepth?: number
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
}

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {TOCInlineProps} {
 *   toc,
 *   indentDepth = 3,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 * }
 *
 */
const TOCInline = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = true,
  exclude = '',
}: TOCInlineProps) => {
  const { lang } = useLang()

  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

  let filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  // Simple heuristic: if we have a bilingual page, the toc will have a duplicated structure in exactly half.
  // We can just assume for these translated pages we split the filteredToc in half.
  // To avoid breaking non-translated pages, we check if the first and middle items' depth match roughly.
  // But a more robust way for our specific blog layout is just to check if the length is > 0 and take the first half if es, second if en, 
  // ONLY if the page is known to be translated (we can pass a prop or just check if it's perfectly duplicated in depth/count).
  // Actually, we know these 5 files are translated. Let's just do a midpoint split if the length is even and >= 8 (optional heuristic).

  // A perfect heuristic: check if depth sequence of first half equals depth sequence of second half!
  if (filteredToc.length > 0 && filteredToc.length % 2 === 0) {
    const mid = filteredToc.length / 2
    let isDuplicated = true
    for (let i = 0; i < mid; i++) {
      if (filteredToc[i].depth !== filteredToc[i + mid].depth) {
        isDuplicated = false
        break;
      }
    }
    if (isDuplicated) {
      filteredToc = lang === 'en' ? filteredToc.slice(mid) : filteredToc.slice(0, mid)
    }
  }

  const tocList = (
    <ul className="py-4 text-sm font-medium leading-relaxed xl:border-b xl:border-gray-200  xl:dark:border-gray-700">
      {filteredToc.map((heading) => (
        <li key={heading.value} className={`${heading.depth >= indentDepth && 'ml-6'}`}>
          <a className="text-primary-500 dark:text-teal-500" href={heading.url}>
            {heading.value}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {asDisclosure ? (
        <details open>
          <summary className="ml-6 pt-2 pb-2 text-xl font-bold">holaa</summary>
          <div className="ml-6">{tocList}</div>
        </details>
      ) : (
        tocList
      )}
    </>
  )
}

export default TOCInline
