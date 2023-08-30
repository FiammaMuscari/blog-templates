import { ReactNode } from 'react'
import SectionContainer from '@/components/SectionContainer'

interface Props {
  children: ReactNode
}

export default function UsesPageLayout({ children }: Props) {
  return (
    <SectionContainer>
      <article>
        <div className="prose max-w-none pb-8 pt-8 dark:prose-invert">{children}</div>
      </article>
    </SectionContainer>
  )
}
