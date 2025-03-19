import React from 'react'

// import '#/styles/prism.css'
// import 'katex/dist/katex.css'

import Markdoc from '@markdoc/markdoc'
import PostSimple from '#/layouts/PostSimple'
import PostLayout from '#/layouts/PostLayout'
import PostBanner from '#/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '#/app/index'
import { notFound } from 'next/navigation'
import { reader } from '@blog/data'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = await reader.collections.posts.read(slug)
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastEdit || post.date).toISOString()
  const imageList: string[] = []
  if (post.cover) {
    imageList.push(post.cover)
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    // description: post.summary,
    // openGraph: {
    //   title: post.title,
    //   // description: post.summary,
    //   siteName: siteMetadata.title,
    //   locale: 'en_US',
    //   type: 'article',
    //   publishedTime: publishedAt,
    //   modifiedTime: modifiedAt,
    //   url: './',
    //   images: ogImages,
    //   authors: siteMetadata.author,
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: post.title,
    //   // description: post.summary,
    //   images: imageList,
    // },
  }
}

export const generateStaticParams = async () => {
  const posts = await reader.collections.posts.all()
  return posts.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const postEntry = await reader.collections.posts.read(slug)

  // TODO: Filter out drafts in production
  if (!postEntry) {
    return notFound()
  }

  const { content, ...post } = postEntry

  // const prev = sortedCoreContents[postIndex + 1]
  // const next = sortedCoreContents[postIndex - 1]

  const Layout = layouts[post.layout || defaultLayout]

  const { node } = await content()
  const errors = Markdoc.validate(node)
  if (errors.length) {
    console.error(errors)
    throw new Error('Invalid content')
  }
  const renderable = Markdoc.transform(node, {
    nodes: {
      document: {
        render: 'div', // 改成 `<div>`，避免 `article`
      },
    },
  })

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <Layout content={post} next={'next'} prev={'prev'}>
        {Markdoc.renderers.react(renderable, React)}
      </Layout>
    </>
  )
}
