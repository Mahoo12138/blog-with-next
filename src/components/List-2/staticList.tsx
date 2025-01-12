// @ts-nocheck
// TODO: type this
import React from 'react'
import CardPlainText from '#/components/Card/PlainText'
import CardWithImage from '#/components/Card/WithImage'
import CardWithOutImage from '#/components/Card/WithOutImage'
import Reader from '#/components/Reader'
import { Blog } from 'contentlayer/generated'

export interface StaticListProps {
  posts?: Blog[]
  sticky?: boolean
}

const StaticList = ({ posts, sticky }: StaticListProps) => {
  return (
    <div>
      <div key="PostList" data-cy="indexPosts">
        {posts?.map((item: Blog) => {
          if (item.images) {
            return <CardWithImage item={item} sticky={sticky} key={item.id} />
          } else if (item?.post_categories?.[0]?.term_id === 58) {
            return <CardPlainText item={item} sticky={sticky} key={item.id} />
          } else {
            return <CardWithOutImage item={item} sticky={sticky} key={item.id} />
          }
        })}
      </div>
      <div>{/* <Reader /> */}</div>
    </div>
  )
}

export default StaticList
