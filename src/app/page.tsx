import Header from '#/components/Header'
import Footer from '#/components/Footer'
import Main from './Main'
import { getPageStat } from '#/services/unami'
import { getPosts } from '#/services/post'

export default async function Page() {
  const sortedPosts = await getPosts()

  const postViews = await Promise.all(sortedPosts.map((post) => getPageStat(`/post/${post.slug}`)))

  const initialPostsWithViews = sortedPosts.map((post, index) => ({
    ...post,
    views: postViews[index] || 0,
  }))
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
