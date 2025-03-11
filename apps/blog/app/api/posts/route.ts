import { NextResponse } from 'next/server'
import { allBlogs, Blog } from '@blog/metadata/post'
import { sortPosts } from '@blog/metadata/utils'
import { getPageStat } from '#/services/unami'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cate = searchParams.get('cate')
  const page = parseInt(searchParams.get('page') || '1', 10) // 默认为第一页
  const size = parseInt(searchParams.get('size') || '5', 10) // 默认每页 5 条

  // 计算分页
  const startIndex = (page - 1) * size
  const endIndex = startIndex + size

  let posts = sortPosts(allBlogs)
  if (cate) {
    posts = allBlogs.filter((post) => cate == post.category)
  }

  // 截取对应页数据
  const paginatedBlogs = posts.slice(startIndex, endIndex);

  const postViews = await Promise.all(paginatedBlogs.map(post => getPageStat(post.structuredData.url)));

  const initialPostsWithViews = paginatedBlogs.map((post, index) => ({ ...post, views: postViews[index] || 0 }))

  return NextResponse.json(initialPostsWithViews)
}
