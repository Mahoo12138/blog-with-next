export interface PostEntry {
  title: string
  description: string
  slug: string
  tags: { tags_id: { name: string; slug: string } }[]
  cover: string
  layout: string
  category: { name: string; slug: string }
  content: string
  date_published: string
}
