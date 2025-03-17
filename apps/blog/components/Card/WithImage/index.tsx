'use client'

import Label from '#/components/Label'
import LabelGroup from '#/components/ui/LabelGroup'

import Icon from '#/components/ui/Icon'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import CardFooter from '#/components/Card/Footer'
import CardWithImagePodcast from '#/components/Card/WithImage/podcast'
import CardWithImageTool from '#/components/Card/WithImage/tool'
import { Hover } from '#/components/Visual'
import blurDataURL from '#/constants/blurDataURL'
import { useDispatch } from '#/hooks'
import useAnalytics from '#/hooks/analytics'
import useInterval from '#/hooks/useInterval'
import { trimStr } from '#/utilities/string'
import { Post } from '#/services/keystatic'

interface Props {
  item: Post
  sticky: boolean
}

export default function CardWithImage({ item, sticky }: Props) {
  const { trackEvent } = useAnalytics()
  const dispatch = useDispatch()
  const router = useRouter()

  const [summary, setSummary] = useState<string>('')
  const [outputText, setOutputText] = useState<string>('')
  const [outputting, setOutputting] = useState<boolean>(false)
  const [showThumbnail, setShowThumbnail] = useState<boolean>(true)

  useInterval(
    () => {
      if (outputText.length === 0) {
        setOutputting(false)
        return
      }

      const increment = Math.floor(Math.random() * 10) + 1

      setSummary((prev) => {
        return prev + outputText.substring(0, increment)
      })
      setOutputText((prev) => {
        return prev.slice(increment)
      })
    },
    outputting ? 200 : null
  )

  // TODO: Add a check for item.category
  if (item.category !== 'podcast') {
    if (item.category === 'podcast') {
      return <CardWithImagePodcast item={item} sticky={sticky} />
    }

    return (
      <div className="mb-6 w-full rounded-md border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="p-5 lg:grid lg:grid-flow-col lg:grid-cols-3 lg:gap-9 lg:p-10">
          <Hover
            perspective={1000}
            max={25}
            scale={1.01}
            className={`h-img relative col-span-1 col-end-2 hidden min-h-full w-full overflow-hidden rounded-md border border-gray-200 shadow-sm transition-all hover:shadow-md dark:opacity-90 ${
              showThumbnail ? 'lg:block' : 'lg:hidden'
            }`}
          >
            <Image
              fill
              src={item.cover!}
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="rounded-md object-cover"
              alt={`featured-image-${item.slug}`}
              loading="lazy"
            />
          </Hover>
          <div
            className={`col-end-4 ${
              showThumbnail ? 'col-span-2' : 'col-span-3 ml-auto animate-expandImageCardInfo'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="col-start-1 col-end-3 flex space-x-2">
                {/* @ts-ignore */}
                {sticky && <Label type="sticky-icon" />}
                <Link href={`/cate/${item.category}`}>
                  <Label type="primary" icon="cate">
                    {item.category}
                  </Label>
                </Link>
              </div>
              <div className="hidden w-full justify-end lg:flex lg:w-auto">
                <LabelGroup className="h-[33px]">
                  {/* <Label
                    type="secondary"
                    icon="preview"
                    // onClick={() => {
                    //   trackEvent('previewPost', 'click')
                    //   dispatch(setReaderRequest(item))
                    // }}
                  >
                    Preview
                  </Label> */}
                  {/* {!summarizing && summary ? (
                    <Label
                      // @ts-ignore
                      type="green-icon"
                      icon="right"
                      className="animate-appear"
                      onClick={() => {
                        router.push(`/post/${item.slug}`)
                      }}
                    />
                  ) : (
                    <Label
                      // @ts-ignore
                      type="orange-icon"
                      icon="openai"
                      iconClassName={summarizing ? 'animate-spin' : ''}
                      onClick={() => {
                        if (!summarizing && !summary && !outputText) {
                          handleSummarize()
                        }
                      }}
                    />
                  )} */}
                </LabelGroup>
              </div>
            </div>
            {summary && !showThumbnail ? (
              <div className="mt-6 animate-appear lg:mt-4">
                <Link href={`/post/${item.slug}`}>
                  <div className="group mb-4 flex flex-col gap-x-2 rounded-md border shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <h2 className="flex w-full items-center justify-between gap-x-1 border-b px-3.5 py-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:border-gray-600 dark:text-gray-300 dark:group-hover:border-gray-500">
                      TITLE
                      <span className="-mr-2 h-4 w-4 opacity-0 transition-all group-hover:mr-0 group-hover:opacity-100">
                        <Icon name="right" />
                      </span>
                    </h2>
                    <h1
                      className="leading-2 overflow-hidden text-ellipsis px-3.5 py-1.5 text-4 tracking-wide text-gray-500 dark:text-gray-400 lg:text-3 lg:leading-7"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                  </div>
                </Link>
                <div className="mb-4 flex flex-col gap-x-2 rounded-md border shadow-sm dark:border-gray-600">
                  <h2 className="w-full border-b px-3.5 py-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:border-gray-600 dark:text-gray-300">
                    TL;DR
                  </h2>
                  <p
                    className="leading-2 overflow-hidden text-ellipsis px-3.5 py-1.5 text-4 tracking-wide text-gray-500 dark:text-gray-400 lg:text-3 lg:leading-7"
                    dangerouslySetInnerHTML={{
                      __html: summary,
                    }}
                  />
                </div>
                <div className="-mb-2">
                  <a
                    href="https://openai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-2 text-sm text-gray-400 transition-colors hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  >
                    <span className="ml-[3px] tracking-wide">Powered by</span>
                    <span className="w-16">
                      <Icon name="openaiText" />
                    </span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-6 lg:mt-4">
                <Link href={`/post/${item.slug}`}>
                  <h1
                    className="mb-5 text-2 font-medium tracking-wider text-gray-700 dark:text-white lg:text-listTitle"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                </Link>
                {/* <p
                  className="leading-2 overflow-hidden text-ellipsis text-4 tracking-wide text-gray-500 dark:text-gray-400 lg:text-3 lg:leading-8"
                  dangerouslySetInnerHTML={{
                    __html: trimStr(item.summary || '', 150),
                  }}
                /> */}
              </div>
            )}
          </div>
        </div>
        <CardFooter item={item} />
      </div>
    )
  }

  return <CardWithImageTool item={item} sticky={sticky} />
}
