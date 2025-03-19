import React from 'react'
import Header from '#/components/Header'
import Footer from '../Footer'

interface Props {
  children: React.ReactNode
}

export function PageLayout(props: Props) {
  const { children } = props
  return (
    <>
      <Header />
      <main className="min-h-main lg:w-content mx-auto h-auto w-full px-5 pt-0 lg:px-10 lg:pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}
