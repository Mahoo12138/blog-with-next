/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Label from '#/components/ui/Label'

import Link from 'next/link'
import CardFooter from '#/components/Card/Footer'
import { useDispatch } from '#/hooks'
// import { setReaderRequest } from '#/store/reader/actions'
import { trimStr } from '#/utilities/string'
import { Post } from '#/services/post'

interface Props {
  item: Post
  sticky: boolean
}

export default function CardWithOutImage({ item, sticky }: Props) {
  const dispatch = useDispatch()
  return (
    <div className="mb-6 w-full rounded-md border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="p-5 lg:p-10">
        <div className="col-span-2 col-end-4">
          <div className="grid grid-cols-4 items-center">
            <div className="col-start-1 col-end-3 flex space-x-2">
              {sticky && <Label type="sticky-icon" />}
              <Link href={`/category/${item.category.slug}`}>
                <Label type="primary" icon="cate">
                  {item.category.name}
                </Label>
              </Link>
            </div>
            {/* <div
              data-oa="click-previewPost"
              className="col-start-4 col-end-5 hidden justify-end lg:flex"
              onClick={() => {
                dispatch(setReaderRequest(item))
              }}
            >
              <Label type="secondary" icon="preview">
                Preview
              </Label>
            </div> */}
          </div>
          <div className="mt-6">
            <Link href={`/post/${item.slug}`}>
              <h1 className="mb-5 text-2 font-medium tracking-wider text-gray-700 dark:text-white lg:text-listTitle">
                {item.title}
              </h1>
            </Link>
            <p
              className="leading-2 overflow-hidden text-ellipsis text-4 tracking-wide text-gray-500 dark:text-gray-400 lg:text-3 lg:leading-8"
              dangerouslySetInnerHTML={{
                __html: trimStr(item.content || '', 150),
              }}
            />
          </div>
        </div>
      </div>
      <CardFooter item={item} />
    </div>
  )
}
