import { DIRECTUS_URL } from '#/constants/apiURLs'
import { createDirectus, graphql, readItem, readItems, withToken } from '@directus/sdk'

const directus = createDirectus(DIRECTUS_URL).with(graphql())

export { directus, readItem, readItems, withToken }
export * from './type'
