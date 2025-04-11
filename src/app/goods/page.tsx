import { Metadata } from 'next'
import React from 'react'
import GoodCard from '#/components/Card/Good'
import { getGoods } from '#/services/goods'

export const metadata: Metadata = {
  title: '我的好物 - Mahoo Blog',
  description: `记录我生活中使用过的好物，分享给大家`,
  icons:
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>',
}
const GoodsPage = async () => {
  const goods = await getGoods()
  return (
    <div>
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
      <div className="glowing-area mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
