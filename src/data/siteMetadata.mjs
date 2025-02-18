/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Mahoo Blog',
  author: 'Mahoo12138',
  headerTitle: 'Record My Tech Growth',
  description: 'A blog created with Next.js and Tailwind.css',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://blog.mahoo12138.cn/',
  siteRepo: 'https://github.com/Mahoo12138/blog-with-next',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'mahoo12138@qq.com',
  github: 'https://github.com/mahoo12138',
  x: 'https://twitter.com/mahoo12138',
  facebook: 'https://facebook.com',
  // youtube: 'https://youtube.com',
  // linkedin: 'https://www.linkedin.com',
  // threads: 'https://www.threads.net',
  // instagram: 'https://www.instagram.com',
  // medium: 'https://medium.com',
  // bluesky: 'https://bsky.app/',
  locale: 'en-US',
  stickyNav: false,
  newsletter: {
    provider: 'buttondown',
  },
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: '1cc54f1a-5deb-427e-8975-c8fd398512c3',
      umamiDomains: 'blog.mahoo12138.cn',
      src: 'https://api.mahoo12138.cn/umami/script.js'
    }
  }
}


export default siteMetadata
