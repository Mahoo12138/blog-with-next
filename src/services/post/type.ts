import { PostEntry, CategoryEntry } from '#/lib/directus'

export interface PostItem extends Omit<PostEntry, 'tags'> {
  tags: { name: string; slug: string }[]
}

export interface Post extends PostItem {
  next: PostItem[]
  prev: PostItem[]
}

export interface PostCountsByCategory {
  data: {
    count: number
  }
  by: {
    category: string
  }
}

export interface Category extends CategoryEntry {
  count: number
}
