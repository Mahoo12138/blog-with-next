import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from '#/app/seo'
import { InfiniteList } from '#/components/List-2'

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))

  return (
    <>
      <div className="mt-0 pt-24 lg:mt-20 lg:pt-0"></div>
      <InfiniteList url="/api/posts?a=b" initialData={posts.slice(0, 3)} />
    </>
  )
}
