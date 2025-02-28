import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Header from '#/components/Header'
import Footer from '#/components/Footer'
import Main from './Main'
import { getPageStat } from '#/services/unami'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs).slice(0, 5)

  const postViews = await Promise.all(sortedPosts.map(post => getPageStat(post.structuredData.url)));

  const initialPostsWithViews = sortedPosts.map((post, index) => ({ ...post, views: postViews[index] || 0 }))
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
