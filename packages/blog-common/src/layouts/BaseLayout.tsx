import React from 'react'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

interface Props {
  children: React.ReactNode
  zone?: boolean
}

export function PageLayout(props: Props) {
  const { children, zone } = props
  return (
    <>
      <Header zone={zone}/>
      <main className="min-h-main lg:w-content mx-auto h-auto w-full px-5 pt-0 lg:px-10 lg:pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}
