'use client'

import React from 'react'
import CardPlainText from '#/components/Card/PlainText'
import CardWithImage from '#/components/Card/WithImage'
import CardWithOutImage from '#/components/Card/WithOutImage'
import { Blog } from 'contentlayer/generated'

export interface StaticListProps {
  posts?: Blog[]
  sticky: boolean
}

const StaticList = ({ posts, sticky }: StaticListProps) => {
  return (
    <div>
      <div key="PostList" data-cy="indexPosts">
        {posts?.map((item: Blog) => {
          // @ts-ignore
          if (item?.postUrl) {
            return <CardWithImage item={item} sticky={sticky} key={item._id} />
          } else if (item.post_categories?.[0]?.term_id === 58) {
            return <CardPlainText item={item} sticky={sticky} key={item._id} />
          } else {
            return <CardWithOutImage item={item} sticky={sticky} key={item._id} />
          }
        })}
      </div>
      {/* <div><Reader /> Reader</div> */}
    </div>
  )
}

export default StaticList
