'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import AutoHeight from 'embla-carousel-auto-height'
import MemosItem from './item'
import { Memos } from '.'

const Carousel = (props: { memos: Memos[] }) => {
  const { memos } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoHeight(),
    Autoplay({ playOnInit: true, delay: 3000 }),
  ])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex touch-pan-y items-start">
        {memos.map((m) => (
          <MemosItem value={m} key={m.name} />
        ))}
      </div>
    </div>
  )
}

export default Carousel
