const websiteId = process.env.UMAMI_WEBSITE_ID
const host = process.env.UMAMI_API_URL
const token = process.env.UMAMI_TOKEN

interface CacheItem {
  views: number
  timestamp: number
  promise?: Promise<number>
}
// 用来缓存每个博客的浏览量
const blogCache: Record<string, CacheItem> = {}

// 设置缓存过期时间为 1 小时（毫秒）
const CACHE_EXPIRATION = 3600 * 1000

export async function getPageStat(path: string) {
  const currentTime = Date.now()
  const cacheItem = blogCache[path]

  // 有效缓存检查
  if (cacheItem && currentTime - cacheItem.timestamp < CACHE_EXPIRATION) {
    return cacheItem.views
  }

  // 请求锁机制
  if (cacheItem?.promise) {
    return await cacheItem.promise
  }

  const fetchPromise = (async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        return 12138
      } else {
        const startTime = new Date('2024-01-01T00:00:00Z').getTime()
        const url = new URL(`${host}/api/websites/${websiteId}/stats`)
        url.searchParams.set('startAt', startTime.toString())
        url.searchParams.set('endAt', currentTime.toString())
        url.searchParams.set('url', path)
        const response = await fetch(url.toString(), {
          next: { revalidate: 3600 },
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) {
          console.error(`API请求失败，状态码：${response.status}`, await response.text())
          return 0
        }
        const data = await response.json()
        if (!data?.pageviews?.value) {
          return 0
        }

        blogCache[path] = {
          views: data.pageviews.value,
          timestamp: currentTime,
        }

        return data.pageviews.value
      }
    } catch (error) {
      console.error('获取统计数据失败:', error)
      delete blogCache[path]?.promise
      return 0
    } finally {
      delete blogCache[path]?.promise
    }
  })()

  blogCache[path] = {
    ...(blogCache[path] || {}),
    promise: fetchPromise,
  }

  return await fetchPromise
}

interface UmamiStat<T = { value: number }> {
  pageviews: T
  visitors: T
  visits: T
  bounces: T
  totaltime: T
}
