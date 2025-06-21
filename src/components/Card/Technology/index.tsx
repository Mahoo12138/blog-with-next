import Icon from '#/components/ui/Icon'
import { ReactNode } from 'react'

interface Props {
  title: string
  icon: ReactNode
  items: string[]
}

const TechnologyCard = ({ title, icon, items }: Props) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
    <div className="mb-3 flex items-center">
      <span className="h-4.5 w-4.5 lg:h-7 lg:w-7">
        {icon}
      </span>

      <h3 className="ml-2 text-lg font-semibold">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md bg-gray-100 px-2 py-1 text-sm dark:bg-gray-700"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
)

export default TechnologyCard 