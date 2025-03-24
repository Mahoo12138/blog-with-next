import { genPageMetadata } from '#/app/seo'
import { InfiniteList } from '#/components/List'
import { getPageStat } from '#/services/unami'
import { getPosts } from '#/services/post'

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const posts = await getPosts()

  const initialPosts = posts.slice(0, 5)

  const postViews = await Promise.all(initialPosts.map((post) => getPageStat(`/post/${post.slug}`)))

  const initialPostsWithViews = initialPosts.map((post, index) => ({
    ...post,
    views: postViews[index] || 0,
  }))

  return (
    <>
      <div className="mt-0 pt-24 lg:mt-20 lg:pt-0"></div>
      <InfiniteList url="/api/posts?a=b" initialData={initialPostsWithViews} />
    </>
  )
}
