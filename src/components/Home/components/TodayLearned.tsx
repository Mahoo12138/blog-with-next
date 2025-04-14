/* eslint-disable jsx-a11y/label-has-associated-control */
import Icon from '#/components/ui/Icon'
import { getRecentCommits } from '#/services/github'

const TodayLearned = async () => {
  const commits = await getRecentCommits('Mahoo12138', 'Today-I-Learned')
  return (
    <section>
      <label className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-[4px] font-medium tracking-wider shadow-sm dark:border-gray-600 dark:bg-gray-700">
        <span className="mr-1.5 flex h-5 w-5 text-purple-500">
          <Icon name="microscope" />
        </span>
        <span className="uppercase">Today I Learned</span>
      </label>
      <div className="mt-[15px] flex flex-col gap-y-2 break-words px-0.5 text-justify text-3 font-light leading-relaxed tracking-wide text-gray-500 underline-offset-[6px] dark:text-gray-300 lg:text-[17px]">
        <p>
          <span>
            Today I Learned (TIL)是一种流行的个人学习记录形式,
            <u className="decoration-gray-300"> 我通过 Obsidian 结合 Git 仓库的形式</u>
          </span>
          <span>，记录总结自己每天学到的新知识、技巧或经验等.</span>
        </p>

        <ul className="list-disc pb-[12px] pl-5 pr-1 pt-4 text-sm">
          {commits.map((commit) => (
            <li
              key={commit.oid}
              className="text-normal py-[7px] pl-2 font-medium dark:border-gray-600"
            >
              {commit.message}
            </li>
          ))}
        </ul>
        <p>
          终身学习不是为了某一天的飞黄腾达，不是为了黄金屋和颜如玉，更不是为了光宗耀祖，而是一个人的人生状态，更像是一种
          forever young, forever learning 的人生状态。
        </p>
      </div>
    </section>
  )
}

export default TodayLearned
