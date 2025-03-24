import { PostEntry } from '#/lib/directus'

export interface PostItem extends Omit<PostEntry, 'tags'> {
  tags: { name: string; slug: string }[]
}

export interface Post extends PostItem {
  next: PostItem[]
  prev: PostItem[]
}
