import { notFound } from 'next/navigation'
import { CategoryEntry, directus, PostEntry } from '#/lib/directus'
import { GetAdjacentPostsBySlug, GetAllCategory, GetCurrentPostBySlug } from './query'
import { formatCategories, formatPost } from './format'
import { PostCountsByCategory, Tag } from './type'
import { DIRECTUS_API } from '#/constants/apiURLs'

export async function getPosts() {
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
    console.log('error: ', error.errors[0].extensions)
    return []
  }
}

export async function getPost(slug: string) {
  try {
    const { data } = await directus.query<{ data: PostEntry[] }>(GetCurrentPostBySlug, {
      slug,
    })
    return formatPost(data[0])
  } catch (error) {
    console.log('erorr', error.errors[0].extensions)
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
    console.log('erorr', error.errors[0].extensions)
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
