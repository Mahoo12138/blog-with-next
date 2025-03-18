import Header from '#/components/Header'
import Footer from '#/components/Footer'
import Main from './Main'
import { getPageStat } from '#/services/unami'
import { getPosts } from '#/services/keystatic'

export default async function Page() {
  // const sortedPosts = sortPosts(allBlogs).slice(0, 5)
  const posts = await getPosts()

  const postViews = await Promise.all(posts.map((post) => getPageStat(post.url)))

  const initialPostsWithViews = posts.map((post, index) => {
    return { ...post, views: postViews[index] || 0 }
  })
  return (
    <>
      <Header />
      <main className="mx-auto h-auto min-h-main md:w-content px-5 pt-0 lg:w-content lg:px-10 lg:pt-20">
        <Main posts={initialPostsWithViews} />
      </main>
      <Footer />
    </>
  )
}
