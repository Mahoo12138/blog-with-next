import { sortPosts } from '@blog/metadata/utils'
import { genPageMetadata } from '#/app/seo'
import { InfiniteList } from '#/components/List'
import { getPageStat } from '#/services/unami'
import keystaticConfig from '#/keystatic.config'
import { createReader } from '@keystatic/core/reader'

export const metadata = genPageMetadata({ title: 'Blog' })
const reader = createReader(process.cwd(), keystaticConfig)

export default async function BlogPage() {
  const posts = (await reader.collections.posts.all()).slice(0, 5)

  // const postViews = await Promise.all(
  //   posts.map((post) => getPageStat(post.slug))
  // )

  const initialPostsWithViews = posts.map((post, index) => {
    const { entry, ...postData } = post
    const { content, ...entryData } = entry
    return { ...postData, entry: entryData, views: 0 }
  })

  return (
    <>
      <div className="mt-0 pt-24 lg:mt-20 lg:pt-0"></div>
      <InfiniteList url="/api/posts?a=b" initialData={initialPostsWithViews} />
    </>
  )
}
