'use client'

import Heatmap from '#/components/HeatMap'
import useSWR from 'swr'

const CalendarHeatmap = ({ ...props }) => {
  const { data } = useSWR(
    '/api/github',
    (url) => {
      return fetch(url).then((res) => res.json())
    },
    { fallbackData: { data: [] } }
  )
  return (
    <Heatmap gutterSize={2} startDate={data.startDate} endDate={data.endDate} values={data.data} />
  )
}

export default CalendarHeatmap
