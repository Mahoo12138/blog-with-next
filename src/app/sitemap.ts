// @ts-nocheck
import { MetadataRoute } from 'next'
// import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '#/data/siteMetadata.mjs'

export const dynamic = 'force-static'

const allBlogs = []
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
