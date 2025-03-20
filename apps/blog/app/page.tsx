import { getPosts } from '@blog/data'
import Header from '@blog/common/components/Header'
import Footer from '@blog/common/components/Footer'
import Main from './Main'
import { getPageStat } from '#/services/unami'

export default async function Page() {
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
