import React from 'react'

interface LegendProps {
  className?: string
}

const Legend: React.FC<LegendProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-end gap-2 text-xs text-gray-500 ${className}`}>
      <span>Less</span>
      <div className="flex gap-1">
        <div className="h-3 w-3 rounded-[4px] bg-[#eeeeee] dark:bg-[#27272a]"></div>
        <div className="h-3 w-3 rounded-[4px] bg-[#9be9a8] dark:bg-[#0e2e1c]"></div>
        <div className="h-3 w-3 rounded-[4px] bg-[#40c463] dark:bg-[#13542d]"></div>
        <div className="h-3 w-3 rounded-[4px] bg-[#30a14e] dark:bg-[#1b8d45]"></div>
        <div className="h-3 w-3 rounded-[4px] bg-[#1e6823] dark:bg-[#22c55e]"></div>
      </div>
      <span>More</span>
    </div>
  )
}

export default Legend
