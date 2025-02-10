'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import AutoHeight from 'embla-carousel-auto-height'
import MemosItem from './item'

const Carousel = (props) => {
  const { slides } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({}, [
    AutoHeight(),
    Autoplay({ playOnInit: false, delay: 3000 }),
  ])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex touch-pan-y items-start">
        {slides.map((index) => (
          <MemosItem key={index} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Carousel
