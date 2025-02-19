'use client'

import ReactSkinview3d from './SkinView'
import { WaveAnimation } from 'skinview3d'
import { Suspense } from 'react'

const FallbackImage = () => (
  <img 
    src="/static/images/ryo-fallback.png" 
    alt="Ryo fallback"
    width={250}
    height={300}
  />
)

const SkinViewerComponent = () => {
  return (
    <ReactSkinview3d
      className="viewer"
      width={250}
      height={300}
      skinUrl="/static/images/ryo.png"
      onReady={({ viewer }) => {
        viewer.animation = new WaveAnimation()
      }}
      options={{
        preserveDrawingBuffer: true,
      }}
    />
  )
}

const RyoView = () => {
  return (
    <Suspense fallback={<FallbackImage />}>
      <SkinViewerComponent />
    </Suspense>
  )
}

export default RyoView
