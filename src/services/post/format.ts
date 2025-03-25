import { CategoryEntry, PostEntry } from '#/lib/directus'
import { Category, Post, PostCountsByCategory } from './type'

export const formatPost = (post: PostEntry) => {
  const tags = post.tags.map((t) => t.tags_id)
  return { ...post, tags } as Post
}

export const formatCategories = (
  categories: CategoryEntry[],
  postCounts: PostCountsByCategory[]
): Category[] => {
  return categories.map((category) => {
    const countData = postCounts.find((count) => count.by.category === category.id)
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      count: countData?.data.count || 0,
    }
  })
}
