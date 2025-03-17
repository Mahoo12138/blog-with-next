// import { allBlogs } from '@blog/metadata/post'
// import { sortPosts } from '@blog/metadata/utils'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '#/keystatic.config'

import Header from '#/components/Header'
import Footer from '#/components/Footer'
import Main from './Main'
import { getPageStat } from '#/services/unami'

const reader = createReader(process.cwd(), keystaticConfig)

export default async function Page() {
  // const sortedPosts = sortPosts(allBlogs).slice(0, 5)
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
      <Header />
      <main className="mx-auto h-auto min-h-main w-full px-5 pt-0 lg:w-content lg:px-10 lg:pt-20">
        <Main posts={initialPostsWithViews} />
      </main>
      <Footer />
    </>
  )
}
