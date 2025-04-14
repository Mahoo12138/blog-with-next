const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export async function getContributions(username: string, from: string, to: string) {
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
    cache: 'no-cache',
  })

  return response.json()
}
export async function getRecentCommits(owner: string, repo: string, branch: string = 'main') {
  const query = `
    query($owner: String!, $repo: String!, $branch: String!) {
      repository(owner: $owner, name: $repo) {
        ref(qualifiedName: $branch) {
          target {
            ... on Commit {
              history(first: 5) {
                edges {
                  node {
                    oid
                    message
                    authoredDate
                    author {
                      name
                      email
                      user {
                        login
                      }
                    }
                  }
                }
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
        owner,
        repo,
        branch,
      },
    }),
    cache: 'no-cache',
  })

  const result = await response.json()
  return result.data?.repository?.ref?.target?.history?.edges.map((edge) => edge.node) || []
}
