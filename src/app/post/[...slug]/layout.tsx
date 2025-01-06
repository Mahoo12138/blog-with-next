import Footer from '#/components/Footer'
import Header from '#/components/Header'

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-main mx-auto h-auto w-full pt-0 lg:w-page lg:pt-24">
        <>{children}</>
      </main>
      <Footer />
    </>
  )
}
