import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Header from '#/components/Header'
import Footer from '#/components/Footer'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <>
      <Header />
      <main className="min-h-main mx-auto h-auto w-full px-5 pt-0 lg:w-content lg:px-10 lg:pt-20">
        <Main posts={posts} />
      </main>
      <Footer />
    </>
  )
}
