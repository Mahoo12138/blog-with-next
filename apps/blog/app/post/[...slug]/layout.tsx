import Header from '@blog/common/components/Header'
import Footer from '@blog/common/components/Footer'
import PageLoading from '#/components/PageLoading'
import { Suspense } from 'react'

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto h-auto min-h-main w-full pt-0 lg:w-page lg:pt-24">
        <Suspense fallback={<PageLoading />}>{children}</Suspense>
      </main>
      <Footer />
    </>
  )
}
