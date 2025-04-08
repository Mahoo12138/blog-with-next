import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tag/${slug(text)}`}
      className="hover:before:color-[#e9eaec] relative m-1 inline-flex items-center rounded px-4 py-2 text-xs font-medium text-black no-underline [background:#e9eaec] before:-ml-0.5 before:mr-0.5 before:opacity-40 before:content-['#']"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
