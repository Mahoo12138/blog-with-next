import { createDirectus, graphql, readItem, readItems, withToken } from '@directus/sdk'

const directus = createDirectus(process.env.DIRECTUS_URL!).with(graphql())

export { directus, readItem, readItems, withToken }
export * from './type';