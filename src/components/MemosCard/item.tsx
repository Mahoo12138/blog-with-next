import dayjs from 'dayjs'

import { Memos } from '.'

const MemosItem = (props: { value: Memos }) => {
  const { value } = props

  return (
    <div className="w-full flex-[0_0_100%]">
      <div className="text-normal flex w-full whitespace-normal px-4.5 pb-1 font-serif font-medium tracking-wide text-gray-700 dark:text-white">
        <p>{value.content}</p>
      </div>
      <div className="flex flex-col items-start gap-x-2.5 gap-y-2 px-4.5 text-xs text-gray-500 lg:-ml-1 lg:flex-row lg:items-center">
        <div
          className={`rounded-full border bg-gray-100 px-2.5 py-0.5 font-medium dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400`}
        >
          {dayjs(value.displayTime).format('YYYY-MM-DD HH:mm')}
        </div>
      </div>
    </div>
  )
}

export default MemosItem
