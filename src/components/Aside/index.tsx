/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
'use client'

import Icon from '#/components/ui/Icon'
import { debounce } from 'lodash'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import scrollToItemWithinDiv from '#/utilities/scrollTo'

export interface HeadersResult {
  0: [number, number, string][]
  1: number[]
}

export type HeadersResultWithElements = [HeadersResult, Element[]]

export default function Aside({ preNext }: { preNext: { prev: string[]; next: string[] } }) {
  const router = useParams()
  const [headersResult, setHeadersResult] = useState<HeadersResult[0]>([])
  const [headersEl, setHeadersEl] = useState<HeadersResultWithElements[1]>([])

  const scrollToItemWithinDivDebounced = debounce(scrollToItemWithinDiv, 200)

  /**
   * Get all headers
   */
  const getAllHeaders = (): HeadersResultWithElements => {
    const result: HeadersResult = [[], []]
    const headerElements = [] as Element[]

    const toc = document.querySelector('#toc')
      ? document.querySelector('#toc')?.getElementsByTagName('li')
      : []

    if (toc) {
      for (let i = 0, n = toc.length; i < n; i++) {
        toc[i].classList.remove('toc-active')
      }
    }

    const headers = document.querySelector('.prose')?.getElementsByTagName('*')

    let minLevel = 0

    if (!headers) {
      return [[[], []], []]
    }
    for (let i = 0, n: number = headers.length; i < n; i++) {
      if (
        /^h\d{1}$/gi.test(headers[i].nodeName) &&
        headers[i].parentElement?.className !== 'embed-content'
      ) {
        const headerLevel: number = parseInt(headers[i].tagName.substring(1, 2))
        // @ts-ignore
        const headerOffset: number = headers[i].offsetTop
        // @ts-ignore
        const headerContent: string = headers[i].innerText

        if (!minLevel || headerLevel <= minLevel) {
          minLevel = headerLevel
        }

        result[0].push([result[0].length, headerLevel, headerContent])
        result[1].push(headerOffset)
        headerElements.push(headers[i])
      }
    }

    for (let i = 0, n: number = result[0].length; i < n; i++) {
      result[0][i] = [result[0][i][0], (result[0][i][1] - minLevel) * 10, result[0][i][2]]
    }

    return [result, headerElements]
  }

  /**
   * Scroll heading into view
   * @param el heading DOM Element
   */
  const scrollToHeading = (el: Element) => {
    const elY = el.getBoundingClientRect().top + window.pageYOffset - 75
    window.scrollTo({ top: elY, behavior: 'smooth' })
  }

  useEffect(() => {
    const [result, elements] = getAllHeaders()
    setHeadersResult(result[0])
    setHeadersEl(elements)

    let currentHeaderId = 1
    let currentHeaderOffset = result[1][1]
    let lastHeaderOffset = result[1][0]

    /**
     * Scroll event handler
     */
    const scrollHandler = () => {
      const scrollPosition = window.pageYOffset - 250
      const listDiv = document.getElementById('toc')

      const firstHeader = document.getElementById(`header0`)
      const currentHeader = document.getElementById(`header${currentHeaderId}`)
      const prevHeader = document.getElementById(`header${currentHeaderId - 1}`)
      const prevPrevHeader = document.getElementById(`header${currentHeaderId - 2}`)

      if (scrollPosition >= currentHeaderOffset) {
        prevHeader?.classList.remove('toc-active')
        currentHeader?.classList.add('toc-active')
        if (currentHeader) {
          scrollToItemWithinDivDebounced(listDiv, currentHeader)
        }
        lastHeaderOffset = currentHeaderOffset
        currentHeaderId += 1
        currentHeaderOffset = result[1][currentHeaderId]
      } else if (scrollPosition < lastHeaderOffset) {
        if (currentHeaderId - 2 >= 0) {
          prevHeader?.classList.remove('toc-active')
          prevPrevHeader?.classList.add('toc-active')
          if (prevPrevHeader) {
            scrollToItemWithinDivDebounced(listDiv, prevPrevHeader)
          }
          currentHeaderId -= 1
          lastHeaderOffset = result[1][currentHeaderId - 1]
          currentHeaderOffset = result[1][currentHeaderId]
        } else {
          firstHeader?.classList.remove('toc-active')
          currentHeaderId = 1
          currentHeaderOffset = result[1][1]
          lastHeaderOffset = result[1][0]
        }
      } else if (scrollPosition > lastHeaderOffset && currentHeaderId === 1) {
        firstHeader?.classList.add('toc-active')
        if (firstHeader) {
          scrollToItemWithinDivDebounced(listDiv, firstHeader)
        }
      }
    }

    if (elements.length) {
      window.addEventListener('scroll', scrollHandler)
    }
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const SubItem = ({
    item,
    inner,
    recursionTimes,
  }: {
    item: [number, number, string]
    inner: boolean
    recursionTimes: number
  }) => {
    if (inner) {
      return (
        <div
          className={`${
            recursionTimes == 0 ? 'border-l-0' : ''
          }toc-sub -my-2 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap border-gray-100 py-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700`}
          style={{
            paddingLeft: recursionTimes == 0 ? '0px' : '10px',
            marginLeft: recursionTimes == 0 ? '0px' : '10px',
          }}
        >
          {recursionTimes > 0 ? (
            <SubItem item={item} inner={true} recursionTimes={recursionTimes - 1} />
          ) : (
            item[2]
          )}
        </div>
      )
    } else {
      return (
        <li
          className={`${
            item[1] !== 0 ? 'toc-sub hover:rounded-bl-none hover:rounded-tl-none' : ''
          } cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap border-gray-100 py-2 pr-[10px] hover:rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700`}
          id={`header${item[0]}`}
          style={{
            paddingLeft: '10px',
            marginLeft: item[1] !== 0 ? `10px` : '0px',
          }}
          key={item[0]}
          onClick={() => scrollToHeading(headersEl[item[0]])}
          data-oa="click-tocItem"
        >
          {recursionTimes > 0 ? (
            <SubItem item={item} inner={true} recursionTimes={recursionTimes - 1} />
          ) : (
            item[2]
          )}
        </li>
      )
    }
  }

  const Tour = () => {
    const b = preNext['next'][0] && [''].indexOf(preNext['next'][2]) === -1
    const a = preNext['prev'][0] && [''].indexOf(preNext['prev'][2]) === -1
    if (a || b) {
      return (
        <div
          className={`mt-5 grid rounded-xl border bg-white text-xl text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 ${
            a && b ? 'grid-cols-2' : 'grid-cols-1'
          } tour`}
        >
          {a && (
            <Link href={`/post/${preNext.prev![0]}`} passHref>
              <div
                className={`flex cursor-pointer items-center justify-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  b ? 'rounded-bl-xl rounded-tl-xl' : 'rounded-xl'
                }`}
              >
                <span className="mr-2 h-6 w-6">
                  <Icon name="leftPlain" />
                </span>
                Prev
              </div>
            </Link>
          )}
          {b && (
            <Link href={`/post/${preNext.next[0]}`} passHref>
              <div
                className={`flex cursor-pointer items-center justify-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  a ? 'rounded-br-xl rounded-tr-xl' : 'rounded-xl'
                }`}
              >
                Next
                <span className="ml-2 h-6 w-6">
                  <Icon name="right" />
                </span>
              </div>
            </Link>
          )}
        </div>
      )
    } else {
      return <div />
    }
  }

  return (
    <aside className="aside group fixed top-24 ml-toc hidden w-toc xl:block">
      {headersEl.length ? (
        <div>
          <div className="rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <h1 className="flex items-center border-b border-gray-200 px-6 py-3 text-2xl font-medium tracking-wide text-gray-700 dark:border-gray-700 dark:text-white">
              <span className="-mt-[1.5px] mr-2 h-[19px] w-[19px]">
                <Icon name="toc" />
              </span>
              On This Page
            </h1>
            <ul
              className="mask-y max-h-[70vh] overflow-hidden overflow-y-auto overscroll-contain px-3 py-3 text-xl text-gray-500 transition-colors duration-300 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
              id="toc"
            >
              {headersResult &&
                headersResult.map((item, index) => {
                  return (
                    <SubItem key={index} item={item} inner={false} recursionTimes={item[1] / 10} />
                  )
                })}
            </ul>
          </div>
          <Tour />
        </div>
      ) : (
        ''
      )}
    </aside>
  )
}
