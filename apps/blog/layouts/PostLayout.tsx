'use client'

import { ReactNode, useEffect } from 'react'
import TimeAgo from 'react-timeago'
import { CoreContent } from '@blog/metadata/utils'
import type { Post } from '#/services/keystatic'
import Link from '#/components/Link'
import SectionContainer from '#/components/SectionContainer'
import Tag from '#/components/Tag'
import Label from '#/components/Label'

import Aside from '#/components/Aside'
import { useDispatch } from '#/hooks'
import { setHeaderTitle } from '#/store/general/actions'
import ArtalkComment from '#/components/Comments'

interface LayoutProps {
  content: CoreContent<Post>
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, category, readingTime } = content
  const dispatch = useDispatch()

  const headerTitle = `${title} - Mahoo Post`

  useEffect(() => {
    dispatch(setHeaderTitle(headerTitle))

    return () => {
      dispatch(setHeaderTitle(''))
    }
  }, [title])

  return (
    <SectionContainer>
      <Aside preNext={{ prev: [], next: [] }} />
      <article
        data-cy="postContent"
        className="bg-white p-5 pt-24 lg:rounded-xl lg:border lg:p-20 lg:pt-20 lg:shadow-sm border-gray-200 dark:border-gray-800 dark:bg-gray-800"
      >
        <div className="mb-2">
          <div className="mb-3 flex">
            <Link href={`/cate/${category}`}>
              <Label type="primary" icon="cate">
                {category}
              </Label>
            </Link>
          </div>
          <h1 className="text-1.5 lg:text-1 font-medium leading-snug tracking-wider">{title}</h1>
          <p className="text-5 mt-2 flex space-x-2 whitespace-nowrap tracking-wide text-gray-500 lg:text-xl">
            {tags && (
              <span className="mr-4 flex flex-wrap items-center gap-3">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </span>
            )}
            <span>
              Posted <TimeAgo date={date} />
            </span>
            <span>·</span>
            {/* <span>{post.post_metas.views} Views</span> */}
            <span>12138 Views</span>

            <span>·</span>
            {readingTime && (
              <span className="group cursor-pointer">
                <span className="group-hover:hidden">{readingTime.words} Words</span>
                <span className="hidden group-hover:block">
                  <abbr title="Estimated reading time">ERT {readingTime.minutes} min</abbr>
                </span>
              </span>
            )}
          </p>
        </div>
        <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
          <div className="prose dark:prose-invert max-w-none pb-8">{children}</div>
          {/* <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div> */}
        </div>
      </article>
      <ArtalkComment />
    </SectionContainer>
  )
}
