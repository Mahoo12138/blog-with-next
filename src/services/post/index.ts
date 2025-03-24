import { notFound } from 'next/navigation'
import { directus, PostEntry } from '#/lib/directus'
import { GetAdjacentPostsBySlug, GetCurrentPostBySlug } from './query'
import { Post } from './type'

const formatPost = (post: PostEntry) => {
  const tags = post.tags.map((t) => t.tags_id)
  return { ...post, tags } as Post
}

export async function getPosts() {
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
  const data = await directus.query<{ prev: []; next: [] }>(GetAdjacentPostsBySlug, {
    datePublished: post.date_published,
  })
  console.log('GetCurrentPostBySlug', data)

  return { ...post, ...data }
}

export * from './type'
