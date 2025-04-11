import { PageLayout } from '#/components/Layout'
import Button from '#/components/ui/Button'

import Link from '#/components/Link'

export const metadata = {
  title: '404 - Mahoo Blog',
}
function NotFound() {
  return (
    <div>
      <div className="mt-0 flex h-[65vh] items-center justify-center pt-24 lg:mt-20 lg:pt-0">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-medium leading-14 tracking-wide text-black dark:text-white lg:text-4xl">
            Oops
          </h1>
          <p className="text-3 font-light leading-14 tracking-wide text-gray-500 lg:text-2">
            404 Not Found
          </p>
          <div className="mt-4 inline-block justify-center">
            <Link href="/" className="inline-block">
              <Button type="primary" className="mx-auto">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NotFoundPage() {
  return (
    <PageLayout>
      <NotFound />
    </PageLayout>
  )
}
