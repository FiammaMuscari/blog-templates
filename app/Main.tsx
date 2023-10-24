import Link from '@/components/Link';
import siteMetadata from '@/data/siteMetadata';
import NewsletterForm from 'pliny/ui/NewsletterForm';
import Article from '@/components/Article';
import { CoreContent } from 'pliny/utils/contentlayer';
import { Blog } from 'contentlayer/generated';
import Tag from '@/components/Tag';
import { slug } from 'github-slugger';
import { FEATURED_POSTS } from '@/constant';

interface HomeProps {
  posts: CoreContent<Blog>[];
}

export default function Home({ posts }: HomeProps) {
  const calculateTagCounts = (posts: CoreContent<Blog>[]) => {
    const tagCounts: Record<string, number> = {};

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return tagCounts;
  };

  const tagCounts = calculateTagCounts(posts);
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, FEATURED_POSTS).map((post) => (
            <Article {...post} key={post.slug} />
          ))}
        </ul>
      </div>
      {posts.length > FEATURED_POSTS && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 dark:text-teal-500 hover:text-primary-600 dark:hover:text-teal-400"
            aria-label="All posts"
          >
            Ver todos &rarr;
          </Link>
        </div>
      )}

      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => (
            <div key={t} className="mb-2 mr-5 mt-2">
              <Tag text={t} />
              <Link
                href={`/${slug(t)}`}
                className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                aria-label={`View posts tagged ${t}`}
              >
                {` (${tagCounts[t]})`}
              </Link>
            </div>
          ))}
        </div>
      </div>
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  );
}
