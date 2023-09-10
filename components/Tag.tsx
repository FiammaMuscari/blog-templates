import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 dark:text-teal-500 hover:text-primary-600  dark:hover:text-teal-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
