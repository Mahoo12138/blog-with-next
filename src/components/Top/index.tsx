import Link from 'next/link'
import Button from '../ui/Button'

export default function Top() {
  return (
    <div className="mt-4 grid lg:grid-cols-5 lg:gap-3">
      <div className="col-span-3 col-start-1 hidden grid-cols-3 gap-3 lg:grid">
        <a target="_blank" href="https://x.com/mahoo12138" rel="noreferrer">
          <Button
            type="default"
            icon="twitterX"
            className="!w-full text-3 leading-14 text-gray-700"
          >
            Twitter
          </Button>
        </a>
        <a target="_blank" href="https://qm.qq.com/q/fd89LXNm7e" rel="noreferrer">
          <Button type="default" icon="qq" className="!w-full text-3 leading-14 text-blue-600">
            <span className="tracking-normal">QQ</span>
          </Button>
        </a>
        <a target="_blank" href="mailto:mahoo12138@qq.com" rel="noreferrer">
          <Button type="default" icon="email" className="!w-full text-3 leading-14 text-gray-500">
            <span className="tracking-normal">Email</span>
          </Button>
        </a>
      </div>
      <div className="flex gap-x-2 whitespace-nowrap lg:col-start-4 lg:col-end-6 lg:block">
        <Button
          type="default"
          icon="email"
          className="!w-full text-3 leading-14 text-gray-500 lg:hidden"
        >
          <span className="tracking-normal">Email</span>
        </Button>
        <Link href="https://cal.com/mahoo12138/15min" target="_blank">
          <Button type="default" icon="calendarSchedule" className="!w-full text-gray-500">
            <span className="pl-0.5 text-4 leading-14 tracking-normal lg:text-3">
              Schedule a Meeting
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
