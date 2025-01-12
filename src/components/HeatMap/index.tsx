'use client'
// @ts-nocheck
import React, { useMemo, useCallback } from 'react'
import memoizeOne from 'memoize-one'
import { DAYS_IN_WEEK, MILLISECONDS_IN_ONE_DAY, DAY_LABELS, MONTH_LABELS } from './constants'
import {
  dateNDaysAgo,
  shiftDate,
  getBeginningTimeForDate,
  convertToDate,
  getRange,
  MaybeDate,
} from './helpers'

const SQUARE_SIZE = 10
const MONTH_LABEL_GUTTER_SIZE = 4
const CSS_PSEDUO_NAMESPACE = 'react-calendar-heatmap-'

import './style.css'

export interface CalendarHeatmapProps {
  values: { date: MaybeDate; count: number }[] // array of objects with date and arbitrary metadata
  numDays?: number // number of days back from endDate to show
  startDate?: MaybeDate // start of date range
  endDate?: MaybeDate // end of date range
  gutterSize?: number // size of space between squares
  horizontal?: boolean // whether to orient horizontally or vertically
  showMonthLabels?: boolean // whether to show month labels
  showWeekdayLabels?: boolean // whether to show weekday labels
  showOutOfRangeDays?: boolean // whether to render squares for extra days in week after endDate, and before start date
  tooltipDataAttrs?: object // data attributes to add to square for setting 3rd party tooltips, e.g. { 'data-toggle': 'tooltip' } for bootstrap tooltips
  titleForValue?: (value?: HeatmapValue | null) => void // function which returns title text for value
  classForValue?: (value?: HeatmapValue | null) => void // function which returns html class for value
  monthLabels?: string[] // An array with 12 strings representing the text from janurary to december
  weekdayLabels?: string[] // An array with 7 strings representing the text from Sun to Sat
  onClick?: (args: unknown) => void // callback function when a square is clicked
  onMouseOver?: (e: React.MouseEventHandler<SVGRectElement>, value: HeatmapValue) => void // callback function when mouse pointer is over a square
  onMouseLeave?: (e: React.MouseEventHandler<SVGRectElement>, value: HeatmapValue) => void // callback function when mouse pointer is left a square
  transformDayElement?: (element: React.JSX.Element, value: HeatmapValue, index: number) => void // function to further transform the svg element for a single day
}

export interface HeatmapValue {
  date: MaybeDate
  count: number
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = (_props) => {
  const props = { ...heatmapDefaultProps, ..._props }
  const getDateDifferenceInDays = useCallback(() => {
    const { startDate, numDays } = props
    if (numDays) {
      console.warn(
        'numDays is a deprecated prop. It will be removed in the next release. Consider using the startDate prop instead.'
      )
      return numDays
    }
    const timeDiff = getEndDate().valueOf() - convertToDate(startDate).valueOf()
    return Math.ceil(timeDiff / MILLISECONDS_IN_ONE_DAY)
  }, [_props])

  const getSquareSizeWithGutter = useCallback(() => {
    return SQUARE_SIZE + props.gutterSize
  }, [props.gutterSize])

  const getMonthLabelSize = useCallback(() => {
    if (!props.showMonthLabels) {
      return 0
    }
    if (props.horizontal) {
      return SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE
    }
    return 2 * (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE)
  }, [props.showMonthLabels, props.horizontal])

  const getWeekdayLabelSize = useCallback(() => {
    if (!props.showWeekdayLabels) {
      return 0
    }
    if (props.horizontal) {
      return 30
    }
    return SQUARE_SIZE * 1.5
  }, [props.showWeekdayLabels, props.horizontal])

  const getEndDate = useCallback(() => {
    return getBeginningTimeForDate(convertToDate(props.endDate))
  }, [props.endDate])

  const getStartDate = useCallback(() => {
    return shiftDate(getEndDate(), -getDateDifferenceInDays() + 1) // +1 because endDate is inclusive
  }, [getEndDate, getDateDifferenceInDays])

  const getNumEmptyDaysAtStart = useCallback(() => {
    return getStartDate().getDay()
  }, [getStartDate])

  const getStartDateWithEmptyDays = useCallback(() => {
    return shiftDate(getStartDate(), -getNumEmptyDaysAtStart())
  }, [getStartDate, getNumEmptyDaysAtStart])

  const getNumEmptyDaysAtEnd = useCallback(() => {
    return DAYS_IN_WEEK - 1 - getEndDate().getDay()
  }, [getEndDate])

  const getTooltipDataAttrsForValue = useCallback(
    (value) => {
      const { tooltipDataAttrs } = props

      if (typeof tooltipDataAttrs === 'function') {
        return tooltipDataAttrs(value)
      }
      return tooltipDataAttrs
    },
    [props.tooltipDataAttrs]
  )
  const getWeekCount = useCallback(() => {
    const numDaysRoundedToWeek =
      getDateDifferenceInDays() + getNumEmptyDaysAtStart() + getNumEmptyDaysAtEnd()
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK)
  }, [getDateDifferenceInDays, getNumEmptyDaysAtStart, getNumEmptyDaysAtEnd])

  const getWeekWidth = useCallback(() => {
    return DAYS_IN_WEEK * getSquareSizeWithGutter()
  }, [getSquareSizeWithGutter])

  const getWidth = useCallback(() => {
    return getWeekCount() * getSquareSizeWithGutter() - (props.gutterSize - getWeekdayLabelSize())
  }, [getWeekCount, getSquareSizeWithGutter, props.gutterSize, getWeekdayLabelSize])

  const getHeight = useCallback(() => {
    return getWeekWidth() + (getMonthLabelSize() - props.gutterSize) + getWeekdayLabelSize()
  }, [getWeekWidth, getMonthLabelSize, props.gutterSize, getWeekdayLabelSize])

  const getValueCache = useMemo(
    () =>
      memoizeOne((props) =>
        props.values.reduce((memo, value) => {
          const date = convertToDate(value.date)
          const index = Math.floor(
            (date.valueOf() - getStartDateWithEmptyDays().valueOf()) / MILLISECONDS_IN_ONE_DAY
          )

          memo[index] = {
            value,
            className: props.classForValue(value),
            title: props.titleForValue ? props.titleForValue(value) : null,
            tooltipDataAttrs: getTooltipDataAttrsForValue(value),
          }

          return memo
        }, {})
      ),
    [
      props.values,
      getStartDateWithEmptyDays,
      props.classForValue,
      props.titleForValue,
      getTooltipDataAttrsForValue,
    ]
  )

  const valueCache = getValueCache(props)

  const getValueForIndex = useCallback(
    (index) => {
      if (valueCache[index]) {
        return valueCache[index].value
      }
      return null
    },
    [valueCache]
  )

  const getClassNameForIndex = useCallback(
    (index) => {
      if (valueCache[index]) {
        return valueCache[index].className
      }
      return props.classForValue(null)
    },
    [valueCache, props.classForValue]
  )

  const getTitleForIndex = useCallback(
    (index) => {
      if (valueCache[index]) {
        return valueCache[index].title
      }
      return props.titleForValue ? props.titleForValue(null) : null
    },
    [valueCache, props.titleForValue]
  )

  const getTooltipDataAttrsForIndex = useCallback(
    (index) => {
      if (valueCache[index]) {
        return valueCache[index].tooltipDataAttrs
      }
      return getTooltipDataAttrsForValue({ date: null, count: null })
    },
    [valueCache, getTooltipDataAttrsForValue]
  )

  const getTransformForWeek = useCallback(
    (weekIndex) => {
      if (props.horizontal) {
        return `translate(${weekIndex * getSquareSizeWithGutter()}, 0)`
      }
      return `translate(0, ${weekIndex * getSquareSizeWithGutter()})`
    },
    [props.horizontal, getSquareSizeWithGutter]
  )

  const getTransformForWeekdayLabels = useCallback(() => {
    if (props.horizontal) {
      return `translate(${SQUARE_SIZE}, ${getMonthLabelSize()})`
    }
    return ''
  }, [props.horizontal, getMonthLabelSize])

  const getTransformForMonthLabels = useCallback(() => {
    if (props.horizontal) {
      return `translate(${getWeekdayLabelSize()}, 0)`
    }
    return `translate(${getWeekWidth() + MONTH_LABEL_GUTTER_SIZE}, ${getWeekdayLabelSize()})`
  }, [props.horizontal, getWeekdayLabelSize, getWeekWidth])

  const getTransformForAllWeeks = useCallback(() => {
    if (props.horizontal) {
      return `translate(${getWeekdayLabelSize()}, ${getMonthLabelSize()})`
    }
    return `translate(0, ${getWeekdayLabelSize()})`
  }, [props.horizontal, getWeekdayLabelSize, getMonthLabelSize])

  const getViewBox = useCallback(() => {
    if (props.horizontal) {
      return `0 0 ${getWidth()} ${getHeight()}`
    }
    return `0 0 ${getHeight()} ${getWidth()}`
  }, [props.horizontal, getWidth, getHeight])

  const getSquareCoordinates = useCallback(
    (dayIndex) => {
      if (props.horizontal) {
        return [0, dayIndex * getSquareSizeWithGutter()]
      }
      return [dayIndex * getSquareSizeWithGutter(), 0]
    },
    [props.horizontal, getSquareSizeWithGutter]
  )

  const getWeekdayLabelCoordinates = useCallback(
    (dayIndex) => {
      if (props.horizontal) {
        return [0, (dayIndex + 1) * SQUARE_SIZE + dayIndex * props.gutterSize]
      }
      return [dayIndex * SQUARE_SIZE + dayIndex * props.gutterSize, SQUARE_SIZE]
    },
    [props.horizontal, props.gutterSize]
  )

  const getMonthLabelCoordinates = useCallback(
    (weekIndex) => {
      if (props.horizontal) {
        return [
          weekIndex * getSquareSizeWithGutter(),
          getMonthLabelSize() - MONTH_LABEL_GUTTER_SIZE,
        ]
      }
      const verticalOffset = -2
      return [0, (weekIndex + 1) * getSquareSizeWithGutter() + verticalOffset]
    },
    [props.horizontal, getSquareSizeWithGutter, getMonthLabelSize]
  )

  const handleClick = useCallback(
    (value) => {
      if (props.onClick) {
        props.onClick(value)
      }
    },
    [props.onClick]
  )

  const handleMouseOver = useCallback(
    (e, value) => {
      if (props.onMouseOver) {
        props.onMouseOver(e, value)
      }
    },
    [props.onMouseOver]
  )

  const handleMouseLeave = useCallback(
    (e, value) => {
      if (props.onMouseLeave) {
        props.onMouseLeave(e, value)
      }
    },
    [props.onMouseLeave]
  )

  const renderSquare = useCallback(
    (dayIndex: number, index: number) => {
      const indexOutOfRange =
        index < getNumEmptyDaysAtStart() ||
        index >= getNumEmptyDaysAtStart() + getDateDifferenceInDays()
      if (indexOutOfRange && !props.showOutOfRangeDays) {
        return null
      }
      const [x, y] = getSquareCoordinates(dayIndex)
      const value = getValueForIndex(index)
      const rect = (
        <rect
          key={index}
          width={SQUARE_SIZE}
          height={SQUARE_SIZE}
          x={x}
          y={y}
          className={getClassNameForIndex(index)}
          onClick={() => handleClick(value)}
          onMouseOver={(e) => handleMouseOver(e, value)}
          onMouseLeave={(e) => handleMouseLeave(e, value)}
          {...getTooltipDataAttrsForIndex(index)}
        >
          <title>{getTitleForIndex(index)}</title>
        </rect>
      )
      const { transformDayElement } = props
      return transformDayElement ? transformDayElement(rect, value, index) : rect
    },
    [
      getNumEmptyDaysAtStart,
      getDateDifferenceInDays,
      props.showOutOfRangeDays,
      getSquareCoordinates,
      getValueForIndex,
      getClassNameForIndex,
      handleClick,
      handleMouseOver,
      handleMouseLeave,
      getTooltipDataAttrsForIndex,
      getTitleForIndex,
      props.transformDayElement,
    ]
  )

  const renderWeek = useCallback(
    (weekIndex) => {
      return (
        <g
          key={weekIndex}
          transform={getTransformForWeek(weekIndex)}
          className={`${CSS_PSEDUO_NAMESPACE}week`}
        >
          {/* @ts-ignore */}
          {getRange(DAYS_IN_WEEK).map((dayIndex) =>
            renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex)
          )}
        </g>
      )
    },
    [getTransformForWeek, renderSquare]
  )

  const renderAllWeeks = useCallback(() => {
    return getRange(getWeekCount()).map((weekIndex) => renderWeek(weekIndex))
  }, [getWeekCount, renderWeek])

  const renderMonthLabels = useCallback(() => {
    if (!props.showMonthLabels) {
      return null
    }
    const weekRange = getRange(getWeekCount() - 1) // don't render for last week, because label will be cut off
    return weekRange.map((weekIndex) => {
      const endOfWeek = shiftDate(getStartDateWithEmptyDays(), (weekIndex + 1) * DAYS_IN_WEEK)
      const [x, y] = getMonthLabelCoordinates(weekIndex)
      return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
        <text key={weekIndex} x={x} y={y} className={`${CSS_PSEDUO_NAMESPACE}month-label`}>
          {props.monthLabels[endOfWeek.getMonth()]}
        </text>
      ) : null
    })
  }, [
    props.showMonthLabels,
    getWeekCount,
    getStartDateWithEmptyDays,
    getMonthLabelCoordinates,
    props.monthLabels,
  ])

  const renderWeekdayLabels = useCallback(() => {
    if (!props.showWeekdayLabels) {
      return null
    }
    return props.weekdayLabels.map((weekdayLabel, dayIndex) => {
      const [x, y] = getWeekdayLabelCoordinates(dayIndex)
      const cssClasses = `${
        props.horizontal ? '' : `${CSS_PSEDUO_NAMESPACE}small-text`
      } ${CSS_PSEDUO_NAMESPACE}weekday-label`

      return dayIndex & 1 ? (
        <text key={`${x}${y}`} x={x} y={y} className={cssClasses}>
          {weekdayLabel}
        </text>
      ) : null
    })
  }, [props.showWeekdayLabels, props.weekdayLabels, getWeekdayLabelCoordinates, props.horizontal])

  return (
    <svg className="react-calendar-heatmap" viewBox={getViewBox()}>
      <g transform={getTransformForMonthLabels()} className={`${CSS_PSEDUO_NAMESPACE}month-labels`}>
        {renderMonthLabels()}
      </g>
      <g transform={getTransformForAllWeeks()} className={`${CSS_PSEDUO_NAMESPACE}all-weeks`}>
        {renderAllWeeks()}
      </g>
      <g
        transform={getTransformForWeekdayLabels()}
        className={`${CSS_PSEDUO_NAMESPACE}weekday-labels`}
      >
        {renderWeekdayLabels()}
      </g>
    </svg>
  )
}

const heatmapDefaultProps = {
  numDays: null,
  startDate: dateNDaysAgo(200),
  endDate: new Date(),
  gutterSize: 1,
  horizontal: true,
  showMonthLabels: true,
  showWeekdayLabels: true,
  showOutOfRangeDays: false,
  tooltipDataAttrs: null,
  titleForValue: null,
  classForValue: (value: { date: MaybeDate; count: number } | undefined | null) =>
    value && value.count > 0 ? 'color-filled' : 'color-empty',
  monthLabels: MONTH_LABELS,
  weekdayLabels: DAY_LABELS,
  onClick: null,
  onMouseOver: null,
  onMouseLeave: null,
  transformDayElement: null,
}

export default CalendarHeatmap
