
const websiteId = process.env.UMAMI_WEBSITE_ID
const host = process.env.UMAMI_API_URL
const token = process.env.UMAMI_TOKEN

const blogCache: Record<string, { views: number; timestamp: number }> = {}; // 用来缓存每个博客的浏览量

const CACHE_EXPIRATION = 3600 * 1000;  // 设置缓存过期时间为 1 小时（毫秒）



export async function getPageStat(path: string) {
    if (!path.startsWith('/')) {
        path = `/${path}`
    }
    const startTime = new Date('2024-01-01T00:00:00Z').getTime();
    const currentTime = Date.now();

    // 如果缓存中存在并且没有过期，直接返回缓存的数据
    if (blogCache[path] && currentTime - blogCache[path].timestamp < CACHE_EXPIRATION) {
        return blogCache[path].views;
    }

    // 否则，调用 API 获取数据
    const response = await fetch(`${host}/api/websites/${websiteId}/stats?startAt=${startTime}&endAt=${currentTime}&url=${encodeURIComponent(path)}`, {
        headers: { Authorization: `Bearer ${token}` },
    });


    if (!response.ok) {
        return 0
    }

    const data = await response.json() as UmamiStat;

    console.log('res, path', path, data)


    if (!data.pageviews) {
        return 0
    }

    // 缓存获取到的浏览量和当前时间
    blogCache[path] = {
        views: data.pageviews.value,
        timestamp: currentTime,
    };

    return data.pageviews.value;
}

interface UmamiStat<T = { value: number }> {
    pageviews: T,
    visitors: T,
    visits: T,
    bounces: T,
    totaltime: T,
}