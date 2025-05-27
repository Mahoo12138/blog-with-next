'use client'

import Heatmap, { HeatmapValue } from '#/components/HeatMap'

const HeatMap = ({ data, ...props }) => {
  const classForValue = (value: HeatmapValue) => {
    if (!value) {
      return 'color-empty'
    }
    const level = value.count > 4 ? 4 : value.count
    return `color-github-${level}`
  }

  const getTooltipDataAttrs = (value) => {
    const content = value
      ? `${value.date?.slice(0, 10)}: ${value.count} ${value.count > 1 ? 'contributions' : 'contribution'}`
      : 'No contributions'

    return {
      'data-tooltip-id': 'contribution-tooltip',
      'data-tooltip-content': content,
    }
  }
  return (
    <Heatmap
      gutterSize={2}
      startDate={data.startDate}
      endDate={data.endDate}
      values={data.data || []}
      classForValue={classForValue}
      tooltipDataAttrs={getTooltipDataAttrs}
    />
  )
}

export default HeatMap
