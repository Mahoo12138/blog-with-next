import React from 'react'
import TimeAgo from 'react-timeago'
import { useDebouncedFunction } from '#/hooks'
import Icon from '#/components/ui/Icon'
import getAPI from '#/utilities/api'
import { Post } from '#/services/post'

interface Props {
  item: Post
  sticky: boolean
}

export default function CardPlainText({ item }: Props) {
  const [upvoting, setUpvoting] = React.useState<boolean>(false)
  const [upvotes, setUpvotes] = React.useState<number>(0)

  /**
   * Upvote the post
   *
   * @param {number} id postid
   */
  const upvote = async (id: number) => {
    setUpvoting(true)
    await fetch(getAPI('internal', 'like', { id }))
      .then(() => {
        setTimeout(() => {
          setUpvoting(false)
          setUpvotes((prev) => prev + 1)
        }, 500)
      })
      .catch(() => {
        setUpvoting(false)
      })
  }

  const doUpvote = useDebouncedFunction(upvote, 2000)

  return (
    <div className="mb-6 w-full rounded-md border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
      <div className="px-5 py-5 lg:px-10 lg:py-9">
        <h1
          className="leading-2 text-2 font-normal tracking-wider text-gray-600 dark:text-white lg:text-3xl lg:leading-10"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
      </div>
      <div className="h-auto w-full items-center rounded-bl-md rounded-br-md border-t border-gray-100 px-5 pb-3 pt-3 dark:border-gray-700 lg:px-10 lg:pb-2 lg:pt-2">
        <p className="leading-2 flex items-center space-x-2 text-5 tracking-wide text-gray-500 dark:text-gray-400 lg:text-4 lg:leading-8">
          <button
            className="flex cursor-pointer items-center space-x-1 rounded-md text-red-400 hover:text-red-500"
            // onClick={() => {
            //   if (!upvoting) {
            //     doUpvote(item.id)
            //   }
            // }}
          >
            {upvoting ? (
              <i className="mt-1 h-6 w-6 animate-bounce">
                <Icon name="loveFill" />
              </i>
            ) : (
              <i className="-mt-1 h-6 w-6">
                <Icon name="love" />
              </i>
            )}
            <em className={`not-italic ${!upvoting ? 'animate-appear' : ''}`}>{upvotes}</em>
          </button>
          <span className="hidden lg:block">·</span>
          <span className="hidden lg:block">
            Posted <TimeAgo date={item.date_published} />
          </span>
          <span>·</span>
          <span
            dangerouslySetInnerHTML={{
              // TODO: Fix this
              __html: item.category,
            }}
          />
        </p>
      </div>
    </div>
  )
}
