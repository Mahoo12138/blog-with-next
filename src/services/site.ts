import { directus } from '#/lib/directus'

export const getSiteMetadata = async (): Promise<SiteMetadata> => {
  try {
    const data = await directus.query(`
            query {
                metadata {
                    title
                    description
                    site_url
                    language
                }
            }
        `)
    return data.metadata
  } catch (error) {
    console.log('erorr', error)
    return {} as SiteMetadata
  }
}

export interface SiteMetadata {
  title: string
  description: string
  site_url: string
  language: string
}
