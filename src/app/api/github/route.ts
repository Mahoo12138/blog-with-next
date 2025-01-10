import { NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

async function getContributions(username: string, from: string, to: string) {
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        username: username,
        from: from,
        to: to,
      },
    }),
  })

  return response.json()
}

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
