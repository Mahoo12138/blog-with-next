/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { KbarProps } from '.'
import { KbarContextProvider } from './context'
import KbarPanel from './panel'
import React, { useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useSelector, useDispatch, useBodyPointerEvents, useBodyScroll, useDebounce } from '#/hooks'
import useAnalytics from '#/hooks/analytics'
import { activateKbar, deactivateKbar, updateKbar } from '#/store/kbar/actions'
import { searchLocation } from '#/store/kbar/sagas/updateKbarToSearch'
import { selectKbar } from '#/store/kbar/selectors'

const Kbar = (props: KbarProps) => {
  const dispatch = useDispatch()
  const { visible, animation, location } = useSelector(selectKbar)
  const [kbarInputValue, setInputValue] = useState('')
  const [kbarInputValueChangeHandler, setKbarInputValueChangeHandler] = useState<
    ((value: string) => void) | undefined
  >(undefined)
  const [, setBodyPointerEvents] = useBodyPointerEvents()
  const [, setBodyScroll] = useBodyScroll()
  const { trackEvent } = useAnalytics()

  // Register keybinding that triggers/hides the kbar
  useHotkeys('ctrl+k, command+k', (e) => {
    e.preventDefault()
    dispatch(activateKbar(props.list))
    trackEvent('activateKbar', 'hotkey')
  })
  useHotkeys(
    'esc',
    () => {
      setInputValue('')
      setKbarInputValueChangeHandler(undefined)
      // non-home location, esc to go back to last location
      if (location.length >= 2) {
        dispatch(
          updateKbar({
            key: location[location.length - 2],
            location: location.slice(0, location.length - 1),
          })
        )
      } else {
        // home location, esc to hide kbar
        dispatch(deactivateKbar())
      }
    },
    {
      enableOnTags: ['INPUT'],
    }
  )

  // Visibility effects
  useEffect(() => {
    // clear input value when kbar is closed
    !visible && setInputValue('')

    // disbale scrolling and pointer events when kbar is open
    setBodyPointerEvents(!visible)
    setBodyScroll(!visible)

    return () => {
      setBodyPointerEvents(true)
      setBodyScroll(true)
    }
  }, [visible])

  // Input effects
  useDebounce(
    () => {
      if (location === searchLocation && kbarInputValueChangeHandler) {
        kbarInputValueChangeHandler(kbarInputValue)
      }
    },
    300,
    [location, kbarInputValueChangeHandler, kbarInputValue]
  )

  return (
    visible && (
      <KbarContextProvider
        value={{
          inputValue: kbarInputValue,
          setInputValue,
          inputValueChangeHandler: kbarInputValueChangeHandler,
          setInputValueChangeHandler: setKbarInputValueChangeHandler,
        }}
      >
        <div
          data-cy="kbar-bg"
          className={`pointer-events-auto absolute z-40 h-screen w-full bg-gray-50/90 dark:bg-black/70 ${
            animation === 'out' ? 'animate-kbarBgOut' : 'animate-kbarBg'
          }`}
          onClick={() => dispatch(deactivateKbar())}
        />
        <KbarPanel />
      </KbarContextProvider>
    )
  )
}

export default Kbar
