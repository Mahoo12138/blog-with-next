import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <div className="min-h-screen bg-gbg dark:bg-neutral-900 dark:text-white">{children}</div>
}
