import { PageLayout } from '#/components/Layout'
import Link from '#/components/Link'
function NotFound() {
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
        <Link
          href="/"
          className="effect-pressing flex w-max cursor-pointer items-center justify-center rounded-md border border-blue-500 bg-blue-500 px-7 py-2 text-xl tracking-wider text-white shadow-sm hover:border-blue-600 hover:bg-blue-600 hover:shadow-inner focus:outline-none dark:border-blue-900 dark:bg-blue-900 dark:text-gray-300 dark:hover:border-blue-800 dark:hover:bg-blue-800"
        >
          Back to homepage
        </Link>
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
