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
      <main className="mx-auto h-auto min-h-main w-full px-5 pt-0 lg:w-content lg:px-10 lg:pt-20">
        <Main posts={posts} />
      </main>
      <Footer />
    </>
  )
}
