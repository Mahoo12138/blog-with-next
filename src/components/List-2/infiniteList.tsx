'use client'

import StaticList from './staticList'
import React from 'react'
import useSWRInfinite from 'swr/infinite'
import InfiniteScroll from 'react-infinite-scroll-component'
import CardClickable from '#/components/Card/Clickable'
import CardEmpty from '#/components/Card/Empty'
import CardSkeleton from '#/components/Card/Skeleton'
import { ListTypes } from '#/constants/propTypes'
import getAPI from '#/utilities/api'

export interface InfiniteListProps<T> {
  cate?: string
  target?: string
  initialData?: T[]
  url?: string
}

const InfiniteList = <T,>(props: InfiniteListProps<T>) => {
  const [stopLoading, setStopLoading] = React.useState<boolean>(false)
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${props.url}&page=${index + 1}`,
    async (url) => {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error()
      }
      return res.json()
    },
    {
      fallbackData: props.initialData ? [props.initialData] : undefined,
      revalidateOnMount: !props.initialData,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
    }
  )
  const postData = data ? [].concat(...data) : []
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 3) || error

  return (
    <InfiniteScroll
      dataLength={postData.length}
      next={() => {
        console.log('next', size + 1)
        setSize(size + 1)
      }}
      hasMore={!isReachingEnd && !stopLoading}
      loader={
        <div>
          <CardClickable setStopLoading={setStopLoading} stopLoading={stopLoading} />
          <CardSkeleton />
        </div>
      }
      endMessage={
        !isReachingEnd && stopLoading ? (
          <CardClickable setStopLoading={setStopLoading} stopLoading={stopLoading} />
        ) : (
          <CardEmpty />
        )
      }
      scrollThreshold="100px"
      // scrollableTarget={type === 'search' ? 'searchResultsDiv' : ''}
    >
      <StaticList posts={postData} />
    </InfiniteScroll>
  )
}

export default InfiniteList
