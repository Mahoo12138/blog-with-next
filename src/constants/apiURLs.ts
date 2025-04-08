export const TWITTER_API = {
  USER_LOOKUP: {
    USER_BY_USERNAME_METRICS: 'https://api.twitter.com/2/users/by/username',
  },
}

export const ANALYTICS_API = {
  STATS: 'https://analytics.ouorz.com/api/website/1/stats',
}

export const GITHUB_API = {
  USER: 'https://api.github.com/users/mahoo12138',
  REPOS: 'https://api.github.com/users/mahoo12138/repos',
}

export const GOODREADS_API = {
  RSS: 'https://www.goodreads.com/review/list_rss/146097881?key=YdulPNTVXpB1iC4Hx05BcR-W8j9wAT4Nip56cjwulPilbx02',
}

export const LEANCLOUD_API = {
  NEXMENT: 'https://ouorz-nexment.ouorz.com/1.1/classes/nexment_comments',
}

export const WORDPRESS_API = {
  POSTSTATS: 'https://blog.ouorz.com/wp-json/tony/v1/poststats',
}

export const SUBSTATS_API = {
  SSPAI: 'https://api.spencerwoo.com/substats/?source=sspai&queryKey=mahoo12138',
}

export const DIRECTUS_URL = process.env.DIRECTUS_URL!

export const DIRECTUS_API = {
  POSTS: `${DIRECTUS_URL}/items/posts`,
  PAGES: `${DIRECTUS_URL}/items/pages`,
  GOODS: `${DIRECTUS_URL}/items/goods`,
  CATEGORIES: `${DIRECTUS_URL}/items/categories`,
  TAGS: `${DIRECTUS_URL}/blog-api/tags`,
}
