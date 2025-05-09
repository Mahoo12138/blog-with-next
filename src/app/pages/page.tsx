import Icon from '#/components/ui/Icon'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import PageCard from '#/components/Card/Page'
import { getPages } from '#/services/pages'

const Pages = async () => {
  const pages = await getPages()
  return (
    <div>
      <Head>
        <title>Pages - Mahoo Blog</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📑</text></svg>"
        />
        <meta name="description" content="TonyHe's blog pages" />
      </Head>
      <div className="mt-0 pt-24 lg:mt-20 lg:pt-0">
        <div className="mb-4 flex items-center">
          <div className="flex-1 items-center">
            <h1 className="text-1 font-medium tracking-wide text-black dark:text-white">
              <span className="mr-3 inline-block cursor-pointer hover:animate-spin">📑</span>
              Pages
            </h1>
          </div>
          <div className="mt-2 flex h-full items-center justify-end whitespace-nowrap">
            <div className="flex-1 px-5">
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
      </div>
      <div className="glowing-area mt-5 grid grid-cols-2 gap-4">
        {pages.map((page) => (
          <PageCard
            title={page.title}
            des={page.description}
            icon={page.icon}
            iconColor={page.color}
            href={page.url}
          />
        ))}
      </div>
    </div>
  )
}

export default Pages
