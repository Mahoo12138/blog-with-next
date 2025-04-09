import { NextResponse } from 'next/server'
import { getPosts } from '#/services/post'
import { getPageStat } from '#/services/unami'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cate = searchParams.get('cate')
  const page = parseInt(searchParams.get('page') || '1', 10) // 默认为第一页
  const size = parseInt(searchParams.get('size') || '5', 10) // 默认每页 5 条

  const posts = await getPosts({
    page,
    size,
    categorySlug: cate,
  })

  const { data } = posts

  const postViews = await Promise.all(data.map((post) => getPageStat(`/post/${post.slug}`)))

  const initialPostsWithViews = data.map((post, index) => ({
    ...post,
    views: postViews[index] || 0,
  }))

  return NextResponse.json(initialPostsWithViews)
}
