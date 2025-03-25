import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tag/${slug(text)}`}
      className="text-sm font-medium uppercase  text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
    >
      #{text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
