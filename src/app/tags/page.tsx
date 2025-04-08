import Link from '#/components/Link'
import Tag from '#/components/Tag'
import { genPageMetadata } from '#/app/seo'
import { getAllTags } from '#/services/post'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tags = await getAllTags()
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row  md:space-x-6 md:divide-y-0">
        <div className="flex max-w-lg flex-wrap">
          {tags.length === 0 && 'No tags found.'}
          {tags.map((t) => {
            return (
              <div key={t.id} className="mb-2 mr-5 mt-2">
                <Link
                  href={`/tag/${t.slug}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${t.name}`}
                >
                  <Tag text={t.name} />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
