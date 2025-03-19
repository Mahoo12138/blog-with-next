// TODO: type this
import React from 'react'
import CardPlainText from '#/components/Card/PlainText'
import CardWithImage from '#/components/Card/WithImage'
import CardWithOutImage from '#/components/Card/WithOutImage'
import Reader from '#/components/Reader'
import { Post } from '@blog/data'

export interface StaticListProps {
  posts?: Post[]
  sticky?: boolean
}

const StaticList = ({ posts, sticky }: StaticListProps) => {
  return (
    <div>
      <div key="PostList" data-cy="indexPosts">
        {posts?.map((item: Post) => {
          if (item.cover) {
            return <CardWithImage item={item} sticky={sticky} key={item.slug} />
          } else if (item.category === '') {
            return <CardPlainText item={item} sticky={sticky} key={item.slug} />
          } else {
            return <CardWithOutImage item={item} sticky={sticky} key={item.slug} />
          }
        })}
      </div>
      <div>{/* <Reader /> */}</div>
    </div>
  )
}

export default StaticList
