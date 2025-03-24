import { directus } from '#/lib/directus'

export const getSiteMetadata = async () => {
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
    console.log('erorr', error.errors[0].extensions)
    return null
  }
}
