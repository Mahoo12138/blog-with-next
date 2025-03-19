import { MetadataRoute } from 'next'
import { reader } from '@blog/data'
import siteMetadata from '#/app/index'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl
  const posts = await reader.collections.posts.all()
  const blogRoutes = posts
    .filter((post) => !post.entry.draft)
    .map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: post.entry.lastEdit || post.entry.date,
    }))

  const routes = ['', 'pages', 'posts', 'goods', 'tags', 'cates'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
