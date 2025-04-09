import '#/styles/prism.css'
// import 'katex/dist/katex.css'

import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import PostSimple from '#/layouts/PostSimple'
import PostLayout from '#/layouts/PostLayout'
import PostBanner from '#/layouts/PostBanner'
import { getPost, getPosts, getPostWithPrevNext } from '#/services/post'
const defaultLayout = 'PostLayout'

const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  return {}
}

// export const generateStaticParams = async () => {
//   const posts = await getPosts()
//   return posts.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
// }

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const post = await getPostWithPrevNext(slug)
  const Layout = layouts[post.layout] || layouts[defaultLayout]

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <Layout post={post} next={post.next} prev={post.prev}>
        {/* <div dangerouslySetInnerHTML={{ __html: post.content }}></div> */}
        <MDXRemote source={post.content} />
      </Layout>
    </>
  )
}
