import { Suspense } from 'react'
import { getContributions } from '#/services/github'
import { ContributionTooltip } from './Toolip'
import HeatMap from './heatmap'
import Legend from './Legend'

async function getLastYearContributions(username: string) {
  try {
    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(endDate.getDate() - 365)

    const result = await getContributions(username, startDate.toISOString(), endDate.toISOString())

    const { totalContributions, weeks } =
      result.data.user.contributionsCollection.contributionCalendar

    const contributions = weeks
      .flatMap((week) => week.contributionDays)
      .map((day) => ({
        date: day.date,
        count: day.contributionCount,
      }))

    return {
      data: contributions,
      totalContributions,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }
  } catch (error) {
    console.error('GitHub API Error:', error)
    return { error: 'Failed to fetch GitHub contribution data' }
  }
}

const CalendarHeatmap = async () => {
  const data = await getLastYearContributions('mahoo12138')

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="space-y-4">
          <HeatMap data={data} />
          <Legend />
        </div>
        <ContributionTooltip />
      </Suspense>
    </>
  )
}

export default CalendarHeatmap
