'use client'

import React from 'react'
import CardPlainText from '#/components/Card/PlainText'
import CardWithImage from '#/components/Card/WithImage'
import CardWithOutImage from '#/components/Card/WithOutImage'
import { Post } from '#/services/post'

export interface StaticListProps {
  posts?: Post[]
  sticky: boolean
}

const StaticList = ({ posts, sticky }: StaticListProps) => {
  return (
    <div>
      <div key="PostList" data-cy="indexPosts">
        {posts?.map((item: Post) => {
          // @ts-ignore
          if (item.image) {
            return <CardWithImage item={item} sticky={sticky} key={item.slug} />
            // TODO: Add support for other types
          } else if (item.category.slug !== 'Post') {
            return <CardWithOutImage item={item} sticky={sticky} key={item.slug} />
          } else {
            return <CardPlainText item={item} sticky={sticky} key={item.slug} />
          }
        })}
      </div>
      {/* <div><Reader /> Reader</div> */}
    </div>
  )
}

export default StaticList
