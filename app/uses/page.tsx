import { Page, allPages } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import UsesPageLayout from '@/layouts/UsesPageLayout'
import { components } from '@/components/MDXComponents'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Uses',
  description: 'The equipment I currently use for gaming, programming and every day.',
})

export default function Page() {
  const usesPage = allPages.find((p) => p.slug === 'uses') as Page

  return (
    <>
      <UsesPageLayout>
        <MDXLayoutRenderer code={usesPage.body.code} components={components} />
      </UsesPageLayout>
    </>
  )
}
