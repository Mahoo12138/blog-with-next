/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'

import Icon from '#/components/ui/Icon'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
// import { GlowingBackground } from '#/components/Visual'
import openLink from '#/utilities/externalLink'

interface Props {
  title: string
  des: string
  icon?: string
  iconColor?: string
  iconSmall?: string
  className?: string
  href?: string
  wrappable?: boolean
}

export default function PageCard({
  title,
  des,
  icon,
  iconColor,
  iconSmall,
  className,
  href,
  wrappable,
}: Props) {
  const color = iconColor || '#a3a3a3'
  const router = useRouter()
  const handleClick = () => {
    if (href) {
      if (href.indexOf('http') === -1) {
        router.push(href)
      } else {
        openLink(href)
      }
    }
  }
  return (
    <div
      className="glowing-div flex cursor-pointer items-center rounded-md border bg-white px-4 pb-4 pt-3 shadow-sm transition-shadow hover:shadow-md dark:border-0 dark:bg-gray-700"
      onClick={handleClick}
    >
      {/* <GlowingBackground /> */}
      <div className="glowing-div-content flex items-center overflow-hidden">
        {icon && (
          <div
            style={{ color }}
            className={`mr-4 hidden h-auto w-20 items-center justify-center border-r border-r-gray-200 pr-3 dark:border-r-gray-600 lg:flex ${
              className ? className : ''
            }`}
          >
            {icon.indexOf('://') > -1 ? (
              <Image
                src={icon}
                width={35}
                height={35}
                alt={`remote image ${icon}`}
                loading="lazy"
              />
            ) : (
              <Icon name={icon} />
            )}
          </div>
        )}
        <div className="w-full">
          <h1
            className={`flex items-center text-2xl font-medium tracking-wide ${
              iconSmall || wrappable ? '' : '-mb-1'
            }`}
          >
            {iconSmall && (
              <span className={`mr-1.5 hidden h-7 w-7 lg:block ${className ? className : ''}`}>
                <Icon name={iconSmall} />
              </span>
            )}
            {title}
          </h1>
          <p
            className={`text-4 tracking-wide text-gray-600 dark:text-gray-400 ${
              wrappable ? 'overflow-wrap-breakword mt-1 leading-tight' : 'whitespace-nowrap'
            } overflow-hidden text-ellipsis`}
          >
            {des}
          </p>
        </div>
      </div>
    </div>
  )
}
