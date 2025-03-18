import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function SectionContainer({ children, className = '' }: Props) {
  return (
    <div className={`${className} bg-gbg min-h-screen dark:bg-neutral-900 dark:text-white`}>
      {children}
    </div>
  )
}
