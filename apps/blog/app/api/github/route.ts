import { NextResponse } from 'next/server'

import { getContributions } from '#/services/github'

export async function GET() {
  try {
    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(endDate.getDate() - 365)

    const result = await getContributions(
      'mahoo12138',
      startDate.toISOString(),
      endDate.toISOString()
    )

    const { totalContributions, weeks } =
      result.data.user.contributionsCollection.contributionCalendar

    const contributions = weeks
      .flatMap((week) => week.contributionDays)
      .map((day) => ({
        date: day.date,
        count: day.contributionCount,
      }))

    return NextResponse.json({
      data: contributions,
      totalContributions,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    })
  } catch (error) {
    console.error('GitHub API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch GitHub contribution data' }, { status: 500 })
  }
}
