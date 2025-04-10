
import { directus, GoodEntry } from '#/lib/directus'
export const getGoods = async () => {
  const { goods } = await directus.query<{ goods: GoodEntry[] }>(`
          query {
              goods {
                name
                model
                date_purchased
                description
                image
                rate
                price
                status
              }
          }`)

  return goods
}
