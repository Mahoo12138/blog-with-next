import { createDirectus, readItem, readItems, rest, withToken } from '@directus/sdk'

const directus = createDirectus(process.env.DIRECTUS_URL!).with(rest())

export { directus, readItem, readItems, withToken }
