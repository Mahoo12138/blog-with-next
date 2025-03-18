import { useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import Artalk from 'artalk'
import 'artalk/Artalk.css'
import Icon from './ui/Icon'

const ArtalkComment = () => {
  const { theme } = useTheme()
  const pathname = usePathname()
  const artalk = useRef<Artalk>()

  const handleContainerInit = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) {
        return
      }
      if (artalk.current) {
        artalk.current.destroy()
        artalk.current = undefined
      }
      artalk.current = Artalk.init({
        el: node,
        darkMode: theme === 'dark',
        pageKey: pathname,
        pageTitle: document.title,
        server: 'https://api.mahoo12138.cn/artalk/',
        site: 'Mahoo Blog',
      })
    },
    [pathname, theme]
  )

  return (
    <div className="border-gray-200 bg-white p-5 lg:mt-5 lg:rounded-xl lg:border lg:px-20 lg:py-11 lg:shadow-sm dark:border-gray-800 dark:bg-gray-800">
      <div className="mb-8">
        <h1 className="flex items-center text-3xl font-medium tracking-wide text-gray-700 dark:!text-white">
          <span className="mr-2 h-9 w-9">
            <Icon name="comments" />
          </span>
          Comments
        </h1>
        <p className="mb-5 mt-1 pl-1 text-xl tracking-wide text-gray-500 dark:text-gray-400">
          Leave a comment to join the discussion
        </p>
      </div>
      <div ref={handleContainerInit}></div>
    </div>
  )
}

export default ArtalkComment
