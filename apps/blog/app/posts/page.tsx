import { sortPosts } from '@blog/metadata/utils'
import { allBlogs } from '@blog/metadata/post'
import { genPageMetadata } from '#/app/seo'
import { InfiniteList } from '#/components/List'
import { getPageStat } from '#/services/unami'

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const posts = sortPosts(allBlogs);

  const initialPosts = posts.slice(0, 5);

  const postViews = await Promise.all(initialPosts.map(post => getPageStat(post.structuredData.url)));

  const initialPostsWithViews = initialPosts.map((post, index) => ({ ...post, views: postViews[index] || 0 }))

  return (
    <>
      <div className="mt-0 pt-24 lg:mt-20 lg:pt-0"></div>
      <InfiniteList url="/api/posts?a=b" initialData={initialPostsWithViews} />
    </>
  )
}
