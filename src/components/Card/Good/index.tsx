/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Rate } from '#/components/ui/Star'
import Image from 'next/image'

interface Props {
  title: string
  subTitle?: string
  price?: number | string
  desc: string
  imgSrc: string
  purchaseDate: string
  rate: number
  status: string
}

export default function GoodCard({
  title,
  subTitle,
  price,
  desc,
  imgSrc,
  rate,
  purchaseDate,
  status
}: Props) {
  return (
    <div className="glowing-div cursor-pointer relative rounded-md border bg-white px-2 pb-3 pt-2 shadow-sm transition-shadow hover:shadow-md dark:border-0 dark:bg-gray-700">
      <div className="box-border flex h-[200px] items-center justify-center rounded-[8px_8px_0px_0px] align-baseline text-[18px] font-normal">
        <Image
          decoding="async"
          loading="lazy"
          width={200}
          height={200}
          src={imgSrc}
          alt={title}
          className="box-border max-w-[200px] cursor-pointer transition-transform duration-200 ease-[ease-in-out] hover:-translate-y-2"
        />
      </div>
      <div className="box-border px-[12px] pb-0 pt-[12px] align-baseline font-normal">
        <div className="box-border flex cursor-default items-center overflow-hidden rounded-[13px] border-[0.8px] border-solid border-[rgb(143,143,148)] py-0 pl-[12px] align-baseline text-[18px] font-normal text-[rgba(0,0,0,0.88)]">
          <p className="m-0 box-border align-baseline text-[16px] font-bold">¥</p>
          <p className="my-0 ml-[4px] mr-0 box-border align-baseline text-[28px] font-bold">
            {price}
          </p>
          <div className="my-0 ml-[10px] mr-0 box-border align-baseline text-xs font-normal">
            <p className="mx-0 -mt-px mb-[4px] box-border h-[14px] whitespace-nowrap   leading-[14px]">
              {purchaseDate.slice(0,10)} 入手
            </p>
            <div className="my-0 ml-0 mr-[6px] box-border flex h-[14px] justify-center overflow-hidden rounded-[1px] ">
              <p className=" mr-[2px] font-normal leading-[14px]">使用体验</p>
              <Rate value={rate} maxStars={5} size={12} />
            </div>
          </div>
        </div>
      </div>
      <div className="box-border p-[12px] align-baseline text-[18px] font-normal">
        <div className="mx-0 mb-[2px] mt-0 box-border w-[144px] overflow-hidden text-ellipsis whitespace-nowrap align-baseline text-[18px] font-bold leading-[18px]">
          {title}
        </div>
        <div className="mb-2 text-[12px] leading-[18px] text-[rgba(60,60,67,0.8)]">{subTitle}</div>
        <div className="box-border flow-root h-[60px] overflow-hidden text-ellipsis align-baseline text-[14px] font-normal leading-[20px] text-[rgb(153,153,153)]">
          {desc}
        </div>
      </div>
    </div>
  )
}
