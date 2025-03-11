// @ts-nocheck
// TODO: type this
import React from 'react'
import CardPlainText from '#/components/Card/PlainText'
import CardWithImage from '#/components/Card/WithImage'
import CardWithOutImage from '#/components/Card/WithOutImage'
import Reader from '#/components/Reader'
import { Blog } from '@blog/metadata/post'

export interface StaticListProps {
  posts?: Blog[]
  sticky?: boolean
}

const StaticList = ({ posts, sticky }: StaticListProps) => {
  return (
    <div>
      <div key="PostList" data-cy="indexPosts">
        {posts?.map((item: Blog) => {
          if (item.image) {
            return <CardWithImage item={item} sticky={sticky} key={item._id} />
          } else if (item.category === '') {
            return <CardPlainText item={item} sticky={sticky} key={item._id} />
          } else {
            return <CardWithOutImage item={item} sticky={sticky} key={item._id} />
          }
        })}
      </div>
      <div>{/* <Reader /> */}</div>
    </div>
  )
}

export default StaticList
