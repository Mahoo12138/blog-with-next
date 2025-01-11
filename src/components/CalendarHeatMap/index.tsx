'use client'

import { Tooltip } from 'react-tooltip'
import useSWR from 'swr'
import Heatmap, { HeatmapValue } from '#/components/HeatMap'

// import './index.css'

const CalendarHeatmap = ({ ...props }) => {
  const { data } = useSWR(
    '/api/github',
    (url) => {
      return fetch(url).then((res) => res.json())
    },
    { fallbackData: { data: [] }, revalidateOnFocus: false }
  )
  const classForValue = (value: HeatmapValue) => {
    if (!value) {
      return 'color-empty'
    }
    const level = value.count > 4 ? 4 : value.count
    return `color-github-${level}`
  }

  return (
    <>
      <Heatmap
        gutterSize={2}
        startDate={data.startDate}
        endDate={data.endDate}
        values={data.data}
        classForValue={classForValue}
        tooltipDataAttrs={(value) => {
          return {
            'data-tooltip-id': 'contribution-tooltip',
            'data-tooltip-content': `${value.date.slice(0, 10)}: ${value.count} ${value.count > 1 ? 'contributions' : 'contribution'}`,
          }
        }}
      />
      <Tooltip id="contribution-tooltip" style={{ borderRadius: '10px' }} />
    </>
  )
}

export default CalendarHeatmap
