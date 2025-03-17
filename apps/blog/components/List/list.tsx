import React, { Suspense } from 'react'
import CardPlainText from '#/components/Card/PlainText'
import CardWithImage from '#/components/Card/WithImage'
import CardWithOutImage from '#/components/Card/WithOutImage'
// import { Blog } from '@blog/metadata/post'

type Blog = unknown

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
          if (item.image) {
            return (
              <Suspense>
                <CardWithImage item={item} sticky={sticky} key={item._id} />
              </Suspense>
            )
            // TODO: Add support for other types
          } else if (item.type !== 'Blog') {
            return (
              <Suspense>
                <CardPlainText item={item} sticky={sticky} key={item._id} />
              </Suspense>
            )
          } else {
            return (<Suspense>
              <CardWithOutImage item={item} sticky={sticky} key={item._id} />
            </Suspense>)
          }
        })}
      </div>
      {/* <div><Reader /> Reader</div> */}
    </div>
  )
}

export default StaticList
