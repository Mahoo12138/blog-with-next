import useTimeoutFunction from './useTimeoutFunction'
import { DependencyList, useEffect } from 'react'

export type UseDebounceReturn = [() => boolean | null, () => void]

export default function useDebounce(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  fn: Function,
  ms: number = 0,
  deps: DependencyList = []
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFunction(fn, ms)

  useEffect(reset, deps)

  return [isReady, cancel]
}
