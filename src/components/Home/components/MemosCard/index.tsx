/*
 * @Author: Mahoo12138 mahoo12138@qq.com
 * @Date: 2025-07-11 10:13:50
 * @LastEditors: Mahoo12138 mahoo12138@qq.com
 * @LastEditTime: 2025-07-11 12:49:01
 * @FilePath: /blog-with-next/src/components/Home/components/MemosCard/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Icon from '#/components/ui/Icon'
import Link from 'next/link'
import { Suspense } from 'react'
import Carousel from './carousel'
import { getLetastMemos } from '#/services/memos'

const MemosCard = async () => {
  const memos = await getLetastMemos()

  return (
    <section className="mt-6 h-[145px]">
      <div className="w-full rounded-md border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex w-full items-center justify-between gap-x-2.5 border-b border-gray-200 px-4.5 py-2.5 dark:border-gray-700">
          <div className="flex items-center gap-x-[7px] text-[15px] font-medium tracking-wide text-gray-700 dark:text-white">
            <span className="h-4.5 w-4.5 lg:h-7 lg:w-7">
              <Icon name="memo" />
            </span>
            <span>Latest Memos</span>
          </div>
          <div className="-translate-y-[1.5px]">
            <div>
              <Link
                href="https://memos.mahoo12138.cn/"
                aria-label="See all pages"
                className="group flex h-[25px] w-[25px] items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-500 transition-all ease-in-out hover:w-[76px] dark:border dark:border-gray-600 dark:bg-transparent dark:text-gray-500"
              >
                <span className="effect-pressing more-to-come absolute right-0 flex w-[76px] justify-end gap-x-[4px] pr-[4px] leading-none transition-all ease-in-out dark:pr-1">
                  <span className="-mt-[0.5px] hidden text-xs opacity-0 transition-all delay-100 ease-in-out group-hover:block group-hover:opacity-100">
                    See all
                  </span>
                  <span className="h-[16px] w-[16px] transition-all ease-in-out">
                    <Icon name="chevronRight" />
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mask-x mt-4 flex items-center justify-between gap-x-2.5 whitespace-nowrap px-4.5 pb-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex w-full items-center gap-x-2.5">
            <Suspense fallback={<p>Loading memos...</p>}>
              <Carousel memos={memos} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MemosCard
