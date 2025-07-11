export function readingTimeWithCount(
  words: number,
  options: Options = {}
) {
  const { wordsPerMinute = 200 } = options
  const minutes = words / wordsPerMinute
  const time = Math.round(minutes * 60 * 1000)
  const displayed = Math.ceil(parseFloat(minutes.toFixed(2)))

  return {
    minutes: displayed,
    time
  }
}

export type Options = {
  wordBound?: (char: string) => boolean;
  wordsPerMinute?: number;
}