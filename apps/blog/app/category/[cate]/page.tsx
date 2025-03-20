import Icon from '#/components/ui/Icon'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { InfiniteList } from '#/components/List'
import SubscriptionBox from '#/components/SubscriptionBox'
import { notFound } from 'next/navigation'
import { getCategories } from '@blog/data'

export const generateStaticParams = async () => {
  const categories = await getCategories()
  const paths = categories.map((cate) => ({
    cate: encodeURI(cate.name),
  }))
  console.log('generateStaticParams', paths)
  return paths
}

const CatePage = async (props: { params: Promise<{ cate: string }> }) => {
  const info = await props.params
  console.log('CatePage', info)
  const categories = await getCategories()
  const category = decodeURI(info.cate)
  const title = `${category} - Mahoo Blog`

  const exist = categories.find((cate) => cate.name === category)
  const count = 0

  if (exist) {
    return (
      <>
        <Head>
          <title>{title}</title>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗂️</text></svg>"
          />
          <meta name="description" content={`Mahoo12138's content under category "${category}"`} />
        </Head>
        <div className="mt-0 pt-24 lg:mt-20 lg:pt-0">
          <div className="mb-4 items-center lg:flex">
            <div className="flex-1 items-center">
              <h1 className="text-1 flex justify-center font-medium tracking-wide text-black lg:justify-start dark:text-white">
                <span className="mr-3 inline-block cursor-pointer hover:animate-spin">🗂️</span>
                <span data-cy="cateName">{category}</span>
              </h1>
            </div>
            <div className="mt-2 flex h-full items-center justify-center whitespace-nowrap lg:justify-end">
              <div className="border-r border-r-gray-200 px-5 lg:flex-1 lg:text-center">
                <p className="flex items-center text-xl text-gray-500 dark:text-gray-400">
                  <span className="mr-2 h-6 w-6">
                    <Icon name="count" />
                  </span>
                  {count} posts
                </p>
              </div>
              <div className="px-5 lg:flex-1">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  <Link href="/" className="flex items-center">
                    <span className="mr-2 h-6 w-6">
                      <Icon name="left" />
                    </span>
                    Home
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <SubscriptionBox type="sm" />
        </div>
        <div className="mt-10 lg:mt-5">
          <InfiniteList url={`/api/posts?cate=${category}`} />
        </div>
      </>
    )
  } else {
    return notFound()
  }
}

export default CatePage
