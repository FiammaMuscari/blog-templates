import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer/source-files'
import { readFileSync, writeFileSync } from 'fs'
import readingTime from 'reading-time'
import GithubSlugger from 'github-slugger'
import path from 'path'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  // remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
import { remarkImgToJsx } from './plugins/remark-img-to-jsx'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './data/siteMetadata'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { Blog as Post } from 'contentlayer/generated'
import { generateThumbnail } from './lib/image.mjs'

const root = process.cwd()

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

async function createSearchIndex(allBlogs: Post[]) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
  // we use the official crawler from algolia web console to generate search index now
  // else if (siteMetadata?.search?.provider === 'algolia') {
  //   if (process.env.NODE_ENV === 'development') {
  //     return
  //   }
  //   const adminKey = process.env.ALGOLIA_ADMIN_API_KEY
  //   if (!adminKey) {
  //     console.error('Algolia admin API key not configured')
  //     return
  //   }

  //   const client = algoliasearch(siteMetadata.search.algoliaConfig.appId, adminKey)
  //   const index = client.initIndex(siteMetadata.search.algoliaConfig.indexName)
  //   // convert tha data retrieved by contentlayer
  //   // into the desired Algolia format
  //   const algoliaPosts = allBlogs.map((blog) => {
  //     return {
  //       objectID: blog._id,
  //       title: blog.title,
  //       excerpt: blog.summary,
  //       slug: blog.slug,
  //       date: blog.date,
  //     }
  //   })
  //   // save all posts info to Algolia
  //   await index.replaceAllObjects(algoliaPosts)

  //   console.log('Algolia search index generated...')
  // }
}

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    showCover: { type: 'boolean', default: true },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    thumbnails: {
      type: 'json',
      resolve: async (doc: Post) => {
        const slug = doc._raw.flattenedPath.replace(/^.+?(\/)/, '')
        // read json file at `.data/blog/${slug}.json`
        const filePath = `./.data/blog/${slug}.json`
        // generate thumbnails (if not exists)
        for (const image of doc.images || []) {
          await generateThumbnail(slug, image)
        }

        // read
        const root = JSON.parse(readFileSync(filePath, 'utf8'))
        console.log(`[thumbnails] READY: ${slug}`)
        return root.thumbnails
      },
    },
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
        author: doc.authors,
      }),
    },
  },
}))

const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}))

const Resume = defineDocumentType(() => ({
  name: 'Resume',
  filePathPattern: 'resume/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
  },
  computedFields,
}))

const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Author, Resume, Page],
  mdx: {
    cwd: root,
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData()

    createTagCount(allBlogs)

    await createSearchIndex(allBlogs)
  },
})
