import { allCoreContent, sortPosts } from '@blog/metadata/utils'
import siteMetadata from '#/app/index'
import ListLayout from '#/layouts/ListLayoutWithTags'
import { genPageMetadata } from '#/app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { reader } from '@blog/data'

const tagEntries = reader.collections.tags.all()
const postEntries = reader.collections.posts.all()

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tags = await tagEntries
  const tagList = tags.map((tag) => tag.slug)
  const paths = tagList.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tags = await tagEntries
  const tag = decodeURI(params.tag)
  const tagName = tags.filter((t) => t.slug === tag)
  // Capitalize first letter and convert space to dash
  const title = tagName?.[0]
    ? tagName[0].entry.name
    : tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = (await postEntries).filter(
    (post) => post.entry.tags && post.entry.tags.includes(tag)
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }
  return <ListLayout posts={filteredPosts} title={title} />
}
