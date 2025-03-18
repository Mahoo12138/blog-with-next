import readingTime from 'reading-time'

import { Post, PostEntry } from '#/services/keystatic'

export const transformPost = (post: { slug: string; entry: PostEntry }): Post => {
  const { slug, entry } = post
  const { content, ...other } = entry
  return {
    slug,
    url: `/posts/${slug}`,
    ...other,
    views: 0,
    layout: '',
  }
}
