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

export interface PageEntry {
  title: string
  description: string
  url: string
  icon: string
  color: string
}

export interface CategoryEntry {
  id: string
  name: string
  slug: string
}

export interface GoodEntry {
  name: string
  model: string
  description: string
  image: string
  rate: number
  price: number | string
  date_purchased: string
  status: "use" | "sold" | "broken" | "lost"
}
