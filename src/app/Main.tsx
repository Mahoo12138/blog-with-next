/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from '#/components/Link'
import EmploymentCard from '#/components/Card/Employment'
import siteMetadata from '#/data/siteMetadata.mjs'
import Icon from '#/components/ui/Icon'
import Top from '#/components/Top'
import List from '#/components/List'

import SubscriptionBox from '#/components/SubscriptionBox'
import CalendarHeatmap from '#/components/CalendarHeatMap'
import MemosCard from '#/components/MemosCard'
import RyoView from '#/components/SkinView'

const MAX_DISPLAY = 3

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

export default function Home({ posts }) {
  return (
    <>
      <div>
        <title>Mahoo Blog</title>
        <section className="mt-0 flex pt-24 lg:mt-20 lg:pt-0">
          <div>
            <h1 className="mb-1.5 flex items-center whitespace-nowrap break-words text-3xl font-medium leading-relaxed tracking-wide text-black dark:text-white lg:text-1">
              <span className="mr-2.5 inline-block animate-waveHand cursor-pointer hover:animate-waveHandAgain">
                👋
              </span>
              你好~ 欢迎来到我的博客！
            </h1>
            <div className="flex flex-col gap-y-1.5 break-words px-1 pb-1.5 pt-1 text-justify text-3 font-light leading-relaxed tracking-wide text-gray-500 dark:text-gray-300 lg:text-left lg:text-2">
              <p>
                这里是 Mahoo12138，
                <span className="lg:inline"> </span>
                一个
                <Emphasis name="兴趣广泛，爱好折腾" className=" -translate-y-0.5 lg:inline-flex">
                  <b>三分钟热度</b>
                </Emphasis>{' '}
                的蛋蛋后🥚 ，生活很无聊，需要新鲜感。
              </p>
              <p>
                非典型二次元 ，
                <Emphasis name="直男" className="border-l-4 !border-l-yellow-300 lg:inline-flex">
                  <Link
                    href="https://www.16personalities.com/istp-personality"
                    target="_blank"
                    aria-label="Visit ISTP Personality (Virtuoso)'s website"
                    className="transition-colors hover:text-blue-500"
                  >
                    ISTP-A
                  </Link>
                </Emphasis>
                ，喜欢看看看日常番🥰，听听听听音乐🎵、跑跑跑跑跑跑步🏃‍、骑行🚲，十二年 Minecraft 火柴盒建造师📦，现在主要玩🥚🥚🥳。
              </p>

              <p>
                从事{' '}
                <Emphasis
                  name="Web 前端开发"
                  className="border-l-4 !border-l-blue-400 lg:inline-flex"
                >
                  切图仔
                </Emphasis>
                ，代码力一般，不擅长算法，面向大模型编程。
              </p>
            </div>
          </div>
          <div className="hidden lg:block">
            <RyoView />
          </div>
        </section>
        <section className="mt-6">
          <div className="mt-5">
            <div className="mt-4">
              <MemosCard />
            </div>
          </div>
        </section>
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-[4px] font-medium tracking-wider shadow-sm dark:border-gray-600 dark:bg-gray-700">
              <span className="mr-1.5 flex h-5 w-5 text-yellow-400">
                <Icon name="flag" />
              </span>
              <span className="uppercase">GitHub Activity</span>
            </label>
            <Link
              href="https://github.com/mahoo12138"
              target="_blank"
              className="flex items-center gap-x-1 text-gray-500 underline-offset-4 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500"
            >
              Github
              <span className="h-5 w-5 underline">
                <Icon name="externalLink" />
              </span>
            </Link>
          </div>
          <div className="mt-5 overflow-x-auto">
            <div className="min-w-[750px] sm:min-w-full">
              <CalendarHeatmap />
            </div>
          </div>
        </section>
        <section className="mt-14">
          <label className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-[4px] font-medium tracking-wider shadow-sm dark:border-gray-600 dark:bg-gray-700">
            <span className="mr-1.5 flex h-5 w-5 text-purple-500">
              <Icon name="microscope" />
            </span>
            <span className="uppercase">Research Interests</span>
          </label>
          <div className="mt-[15px] flex flex-col gap-y-2 break-words px-0.5 text-justify text-3 font-light leading-relaxed tracking-wide text-gray-500 underline-offset-[6px] dark:text-gray-300 lg:text-[17px]">
            <p>
              <span>
                I am interested in both the{' '}
                <u className="decoration-gray-300">Theoretical & Applied Aspects of Cryptography</u>
              </span>
              <span> and their applications throughout and beyond computing & data sciences.</span>
            </p>
            <p>
              In my previous research experience, I worked on developing and analyzing{' '}
              <u className="decoration-gray-300">Cryptographic Systems and Protocols</u> that
              address issues related to:
            </p>
            <div className="flex flex-col items-center justify-between gap-y-2 pb-[12px] pr-1 pt-4.5 text-sm lg:flex-row">
              <div className="text-normal flex w-full items-center gap-x-2 rounded-md border bg-white px-4 py-[7px] font-medium shadow-sm dark:border-gray-600 dark:bg-gray-800 lg:w-auto">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-white dark:bg-purple-700">
                  1
                </div>
                <div className="font-bold">Privacy-preserving computing</div>
              </div>
              <div className="hidden text-3 lg:block">and</div>
              <div className="text-normal flex w-full items-center gap-x-2 rounded-md border bg-white px-4 py-[7px] font-medium shadow-sm dark:border-gray-600 dark:bg-gray-800 lg:w-auto">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-white dark:bg-purple-700">
                  2
                </div>
                <div>Software security and usability</div>
              </div>
            </div>
            <p>
              My most recent research work has put an emphasis on Fully Homomorphic Encryption (FHE)
              and Privacy-preserving Machine Learning (PPML).
            </p>
          </div>
        </section>
        <section className="mt-14">
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-[4px] font-medium tracking-wider shadow-sm dark:border-gray-600 dark:bg-gray-700">
              <span className="mr-1.5 flex h-5 w-5 text-teal-500">
                <Icon name="suitcase" />
              </span>
              <span className="uppercase">Employment</span>
            </label>
            <Link
              href="https://www.linkedin.com/in/~lhe/"
              target="_blank"
              className="flex items-center gap-x-1 text-gray-500 underline-offset-4 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500"
            >
              LinkedIn
              <span className="h-5 w-5 underline">
                <Icon name="externalLink" />
              </span>
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-y-4">
            <EmploymentCard
              orgLogoSrc="https://api.mahoo12138.cn/minio-blog/logo/dlu-logo.svg"
              organization="XXXX China Co.,Ltd."
              organizationFullName="CS 135 Designing Functional Programs"
              jobTitle="Instructional Support Assistant (ISA)"
              jobType="Full-time Internship"
              dateString="Jul 2022 - Present"
            />
          </div>
        </section>
        <section className="mt-14">
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-[4px] font-medium tracking-wider shadow-sm dark:border-gray-600 dark:bg-gray-700">
              <span className="mr-1.5 flex h-5 w-5 text-rose-500">
                <Icon name="suitcase" />
              </span>
              <span className="uppercase">Education</span>
            </label>
          </div>
          <div className="mt-5 flex flex-col gap-y-4">
            <EmploymentCard
              orgLogoSrc="https://api.mahoo12138.cn/minio-blog/logo/dlu-logo.svg"
              organization="University of Dalian"
              organizationFullName="Bachelor of Mathematics, Honours, Co-operative Program (Minor in Computing)"
              jobTitle="Mathematics, Combinatorics & Optimization"
              jobType="Undergraduate"
              dateString="Sep 2018 - Jun 2022"
            />
          </div>
        </section>
        <section className="mt-14">
          <label className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-[4px] font-medium tracking-wider shadow-sm dark:border-gray-600 dark:bg-gray-700">
            <span className="mr-1.5 flex h-5 w-5 text-green-500">
              <Icon name="plane" />
            </span>
            <span className="uppercase">How to Reach Me</span>
          </label>
          <div className="mt-5">
            <Top />
          </div>
        </section>
        <section className="mb-24 mt-14">
          <div className="flex justify-between">
            <label className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-[4px] font-medium tracking-wider shadow-sm dark:border-gray-600 dark:bg-gray-700">
              <span className="mr-1.5 flex h-5 w-5">
                <Icon name="edit" />
              </span>
              <span className="uppercase">Latest Articles</span>
            </label>
            <Link
              href="/posts"
              className="flex items-center gap-x-1 text-gray-500 underline-offset-4 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500"
            >
              All Posts &rarr;
            </Link>
          </div>

          <div className="mt-5 animate-appear">
            <List posts={posts.slice(0, MAX_DISPLAY)} sticky={false} />
          </div>
          {siteMetadata.newsletter?.provider && (
            <div className="mt-5">
              <SubscriptionBox type="sm" />
            </div>
          )}
        </section>
      </div>
    </>
  )
}
