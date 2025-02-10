const MemosItem = (props) => {
  function randomConcat(str, minTimes, maxTimes) {
    // 生成一个介于 minTimes 和 maxTimes 之间的随机数
    const times = Math.floor(Math.random() * (maxTimes - minTimes + 1)) + minTimes

    // 初始化结果字符串
    let result = ''

    // 循环拼接字符串
    for (let i = 0; i < times; i++) {
      result += str
    }

    return result
  }

  // 示例用法
  const originalString = 'dftgh uioj kefsf rewr'
  const minTimes = 1
  const maxTimes = 20

  const result = randomConcat(originalString, minTimes, maxTimes)
  return (
    <div className="w-full flex-[0_0_100%]">
      <div className="text-normal flex w-full whitespace-normal px-4.5 py-2.5 font-serif font-medium tracking-wide text-gray-700 dark:text-white">
        <p>
          {props.index}
          {'  上班的时候经常写自己的代码，然后现在根本不想写公司业务代码，怎么办啊？'}
          {result}
        </p>
      </div>
      <div className="flex flex-col items-start gap-x-2.5 gap-y-2 px-4.5 text-xs text-gray-500 lg:-ml-1 lg:flex-row lg:items-center">
        <div
          className={`rounded-full border bg-gray-100 px-2.5 py-0.5 font-medium dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400`}
        >
          2025-02-09 13:30
        </div>
      </div>
    </div>
  )
}

export default MemosItem
