import { MetadataRoute } from 'next'
import { allBlogs } from '@blog/metadata/post'
import siteMetadata from '@blog/metadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}${post.structuredData.url}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'pages', 'posts', 'goods', 'tags', 'cate'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
