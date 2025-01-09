import { NextResponse } from 'next/server'
import { allBlogs, Blog } from 'contentlayer/generated'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cate = searchParams.get('cate')
  const page = parseInt(searchParams.get('page') || '1', 10) // 默认为第一页
  const size = parseInt(searchParams.get('size') || '3', 10) // 默认每页 10 条

  // 计算分页
  const startIndex = (page - 1) * size
  const endIndex = startIndex + size

  let posts = allBlogs
  if (cate) {
    posts = allBlogs.filter((post) => cate == post.category)
  }

  // 截取对应页数据
  const paginatedBlogs = posts.slice(startIndex, endIndex)

  return NextResponse.json(paginatedBlogs)
}
