import Link from 'next/link'

interface Props {
  text: string
  slug: string
  mode?: 'default' | 'text'
}

const Tag = ({ text, slug, mode = 'default' }: Props) => {
  return (
    <Link
      href={`/tag/${slug}`}
      className={
        mode === 'default'
          ? "hover:before:color-[#e9eaec] relative m-1 inline-flex items-center rounded px-4 py-2 text-xs font-medium text-black no-underline [background:#e9eaec] before:-ml-0.5 before:mr-0.5 before:opacity-40 before:content-['#']"
          : 'mr-3 text-sm font-medium uppercase text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
      }
    >
      #{text}
    </Link>
  )
}

export default Tag
