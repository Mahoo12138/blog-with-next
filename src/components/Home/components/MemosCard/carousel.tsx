'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
// import AutoHeight from 'embla-carousel-auto-height'
import { Memos } from '#/services/memos'
import MemosItem from './item'

const Carousel = (props: { memos: Memos[] }) => {
  const { memos } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    // AutoHeight(),
    Autoplay({ playOnInit: true, delay: 5000 }),
  ])

  const renderEmpty = () => {
    return (
      <div className="flex h-full min-h-[120px] w-full items-center justify-center rounded-lg bg-gray-50">
        <div className="flex flex-col items-center gap-4 text-gray-500">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-lg font-medium">暂无数据</p>
          </div>
        </div>
      </div>
    )
  }

  return memos.length > 0 ? (
    <div className="h-full overflow-hidden" ref={emblaRef}>
      <div className="flex h-full touch-pan-y">
        {memos.map((m) => (
          <MemosItem value={m} key={m.name} />
        ))}
      </div>
    </div>
  ) : (
    renderEmpty()
  )
}

export default Carousel
