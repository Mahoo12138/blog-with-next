import Link from "next/link";

interface Props {
  text: string;
  slug: string;
}

const Tag = ({ text, slug }: Props) => {
  return (
    <Link
      href={`/tag/${slug}`}
      className="text-sm font-medium uppercase  text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
    >
      #{text.split(" ").join("-")}
    </Link>
  );
};

export default Tag;
