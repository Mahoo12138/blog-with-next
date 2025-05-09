import Icon from '#/components/ui/Icon'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { InfiniteList } from '#/components/List'
import SubscriptionBox from '#/components/SubscriptionBox'
import { notFound } from 'next/navigation'
import { getAllTags } from '#/services/post'

export const generateStaticParams = async () => {
  const tags = await getAllTags()
  const paths = tags.map((tag) => ({
    tag: encodeURI(tag.slug),
  }))
  return paths
}

const TagPage = async (props: { params: Promise<{ tag: string }> }) => {
  const info = await props.params
  const tags = await getAllTags()
  const tag = tags.find((tag) => tag.slug === info.tag)

  if (!!tag) {
    const title = `${tag?.name} - Mahoo Blog`
    return (
      <>
        <Head>
          <title>{title}</title>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗂️</text></svg>"
          />
          <meta name="description" content={`TonyHe's content under category "${tag.name}"`} />
        </Head>
        <div className="mt-0 pt-24 lg:mt-20 lg:pt-0">
          <div className="mb-4 items-center lg:flex">
            <div className="flex-1 items-center">
              <h1 className="flex justify-center text-1 font-medium tracking-wide text-black dark:text-white lg:justify-start">
                <span className="mr-3 inline-block cursor-pointer hover:animate-spin">🗂️</span>
                <span data-cy="cateName">{tag.name}</span>
              </h1>
            </div>
            <div className="mt-2 flex h-full items-center justify-center whitespace-nowrap lg:justify-end">
              <div className="border-r border-r-gray-200 px-5 lg:flex-1 lg:text-center">
                <p className="flex items-center text-xl text-gray-500 dark:text-gray-400">
                  <span className="mr-2 h-6 w-6">
                    <Icon name="count" />
                  </span>
                  {tag.count} posts
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
          <InfiniteList url={`/api/posts?category=${tag.slug}`} />
        </div>
      </>
    )
  } else {
    return notFound()
  }
}

export default TagPage
