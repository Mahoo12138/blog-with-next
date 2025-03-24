import Head from 'next/head'
import React from 'react'
import GoodCard from '#/components/Card/Good'
import { getGoods } from '#/services/goods'
const GoodsPage = async () => {
  const goods = await getGoods()
  console.log('goods', goods);
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
              <span className="mr-3 inline-block cursor-pointer hover:animate-spin">📦</span>
              我的好物
            </h1>
          </div>
        </div>
      </div>
      <div className="glowing-area mt-5 grid grid-cols-3 gap-4">
        {goods.map((good, index) => (
          <GoodCard
            key={index}
            title={good.name}
            subTitle={good.model}
            purchaseDate={good.date_purchased}
            desc={good.description}
            imgSrc={good.image}
            rate={good.rate}
            price={good.price}
            status={good.status}
          />
        ))}
      </div>
    </div>
  )
}

export default GoodsPage
