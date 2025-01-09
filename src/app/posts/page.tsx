import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'src/app/seo'
import { InfiniteList } from '#/components/List-2'

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))

  return <InfiniteList type={'search'} initialData={posts.slice(0, 3)} />
}
