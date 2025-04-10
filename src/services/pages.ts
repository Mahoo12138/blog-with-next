import { directus, PageEntry } from '#/lib/directus'

export const getPages = async () => {
  const { pages } = await directus.query<{ pages: PageEntry[] }>(`
          query {
              pages {
                title
                description
                url
                icon
                color
              }
          }`)
  return pages
}
