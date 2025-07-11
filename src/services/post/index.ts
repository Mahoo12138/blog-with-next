import { notFound } from 'next/navigation'
import { CategoryEntry, directus, PostEntry } from '#/lib/directus'
import { GetAdjacentPostsBySlug, GetAllCategory, GetCurrentPostBySlug } from './query'
import { formatCategories, formatPost } from './format'
import { PostCountsByCategory, Tag } from './type'
import { DIRECTUS_API } from '#/constants/apiURLs'

export async function getPosts2() {
  try {
    const { posts } = await directus.query<{ posts: PostEntry[] }>(`
    query {
        posts(limit: 10) {
            title
            slug
            category {
                name
                slug  
            }
            tags {
                tags_id {
                    name
                    slug
                }
            }
            date_published
        }
    }`)
    return posts.map(formatPost)
  } catch (error) {
    console.log('error: ', error)
    return []
  }
}

export async function getPosts(params?: {
  page?: number
  size?: number
  categorySlug?: string | null
  tagSlug?: string | null
}) {
  const { page = 1, size = 5, categorySlug, tagSlug } = params || {}
  const offset = (page - 1) * size

  try {
    const { posts, posts_aggregated } = await directus.query<{
      posts: PostEntry[]
      posts_aggregated: { count: { id: number }[] }
    }>(
      `
    query ($offset: Int, $limit: Int, $categoryFilter: posts_filter, $tagFilter: posts_filter) {
      posts(
        sort: "-date_published", 
        limit: $limit
        offset: $offset
        filter: { 
          _and: [
            $categoryFilter
            $tagFilter
          ]
        }
      ) {
        title
        slug
        category {
          name
          slug
        }
        tags {
          tags_id {
            name
            slug
          }
        }
        word_count
        date_published
      }
      posts_aggregated {
        count {
          id
        }
      }
    }`,
      {
        limit: size,
        offset,
        categoryFilter: categorySlug ? { category: { slug: { _eq: categorySlug } } } : {},
        tagFilter: tagSlug ? { tags: { _some: { tags_id: { slug: { _eq: tagSlug } } } } } : {},
      }
    )

    return {
      data: posts.map(formatPost),
      total: posts_aggregated?.count?.[0]?.id || 0,
    }
  } catch (error) {
    console.log('error: ', error)
    return { data: [], total: 0 }
  }
}

export async function getPost(slug: string) {
  try {
    const { data } = await directus.query<{ data: PostEntry[] }>(GetCurrentPostBySlug, {
      slug,
    })
    return formatPost(data[0])
  } catch (error) {
    console.log('erorr', error)
    return null
  }
}

export async function getPostWithPrevNext(slug: string) {
  const post = await getPost(slug)
  if (!post) {
    return notFound()
  }
  if (!post.date_published) {
    return { ...post, next: [], prev: [] }
  } else {
    const data = await directus.query<{ prev: []; next: [] }>(GetAdjacentPostsBySlug, {
      datePublished: post.date_published,
    })
    return { ...post, ...data }
  }
}

export async function getAllCategory() {
  try {
    const { categories, posts } = await directus.query<{
      categories: CategoryEntry[]
      posts: PostCountsByCategory[]
    }>(GetAllCategory)
    return formatCategories(categories, posts)
  } catch (error) {
    console.log('erorr', error)
    return []
  }
}
export async function getAllTags(): Promise<Tag[]> {
  try {
    const data = await fetch(DIRECTUS_API.TAGS)
    return data.json()
  } catch (error) {
    console.log('getAllTags error', error)
    return []
  }
}
export * from './type'
