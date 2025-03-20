// TODO: type this
// @ts-nocheck
import Label from '#/components/Label'

import Image from 'next/image'
import Link from 'next/link'
import { Blog } from '@blog/metadata/post'
// import 'react-h5-audio-player/lib/styles.css'
import { Hover } from '#/components/Visual'
import blurDataURL from '#/constants/blurDataURL'

import { trimStr } from '#/utilities/string'

interface Props {
  item: Blog
  sticky: boolean
}

const CardWithImagePodcast = ({ item, sticky }: Props) => {
  return (
    <div className="mb-6 w-full rounded-md border border-gray-200 bg-white shadow-sm  dark:bg-gray-800">
      <div className="pl-5 pr-5 pt-5 lg:grid lg:grid-flow-col lg:grid-cols-3 lg:gap-9 lg:pl-10 lg:pr-10 lg:pt-10">
        <Hover
          perspective={1000}
          max={25}
          scale={1.01}
          className="podcast-image-placeholder hidden rounded-md border bg-gray-50 shadow-sm hover:shadow-md lg:block dark:opacity-90"
        >
          <Image
            src={item.image}
            width={160}
            height={160}
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="rounded-md"
            alt={`podcast-episode-cover-art-${item.title}`}
            loading="lazy"
          />
        </Hover>
        <div className="col-span-2 col-end-4">
          <div className="mb-4 flex items-center space-x-3">
            <div className="col-start-1 col-end-3 flex space-x-2">
              {sticky && <Label type="sticky-icon" />}
              <Link href={`/category/${item.post_categories[0].term_id}`}>
                <Label type="primary" icon="microphone">
                  {/* Episode {item.post_metas.podcast.episode} */}
                  Episode {item.title}
                </Label>
              </Link>
            </div>
          </div>
          <a href={item.post_metas.podcast.episodeUrl}>
            <h1 className="text-2 lg:text-listTitle mb-4 overflow-hidden text-ellipsis whitespace-nowrap font-medium tracking-wider text-gray-700 dark:text-white">
              {item.title}
            </h1>
          </a>
          <p
            className="leading-2 text-4 lg:text-3 overflow-hidden text-ellipsis tracking-wide text-gray-500 lg:leading-8 dark:text-gray-400"
            dangerouslySetInnerHTML={{
              __html: trimStr(item.post_excerpt.four, 80),
            }}
          />
        </div>
      </div>
      <div className="px-2 pb-4 pt-4 lg:px-5">
        {/* <AudioPlayer
          className="podcast-player focus:outline-none"
          autoPlayAfterSrcChange={false}
          src={item.post_metas.podcast.audioUrl}
          preload="metadata"
        /> */}
        AudioPlayer
      </div>
    </div>
  )
}

export default CardWithImagePodcast
