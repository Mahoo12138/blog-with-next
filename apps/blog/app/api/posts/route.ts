import { NextResponse } from 'next/server'
import { Post, reader } from '@blog/data'
import { getPageStat } from '#/services/unami'

export async function GET(request: Request): Promise<NextResponse<unknown>> {
  const { searchParams } = new URL(request.url)
  const cate = searchParams.get('cate')
  const page = parseInt(searchParams.get('page') || '1', 10) // 默认为第一页
  const size = parseInt(searchParams.get('size') || '5', 10) // 默认每页 5 条

  // 计算分页
  const startIndex = (page - 1) * size
  const endIndex = startIndex + size

  // let posts = sortPosts(allBlogs)
  let posts = await reader.collections.posts.all()
  if (cate) {
    posts = posts.filter((post) => cate == post.entry.category)
  }

  // 截取对应页数据
  const paginatedBlogs = posts.slice(startIndex, endIndex)

  // const postViews = await Promise.all(
  //   paginatedBlogs.map((post) => getPageStat(post.structuredData.url))
  // )

  const initialPostsWithViews = paginatedBlogs.map((post, index) => {
    const { slug, entry } = post
    return {
      ...entry,
      slug,
      url: `/post/${slug}`,
      views: 0,
    }
  })

  return NextResponse.json(initialPostsWithViews)
}
