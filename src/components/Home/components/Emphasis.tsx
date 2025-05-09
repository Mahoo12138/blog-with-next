const Emphasis = ({
  name,
  className,
  children,
}: {
  name: string
  className?: string
  children?: React.ReactNode
}) => (
  <span
    className={`${className || ''} inline-flex items-center gap-x-2 rounded-md border border-gray-300 bg-white px-[8px] py-0.5 text-sm font-normal tracking-normal dark:border-gray-600 dark:bg-gray-700 lg:py-1`}
  >
    {children ? (
      <>
        <span className="border-r border-gray-300 pr-2 dark:border-gray-600">{name}</span>
        <span>{children}</span>
      </>
    ) : (
      <span>{name}</span>
    )}
  </span>
)

export default Emphasis
