import { createReader, Entry, Reader } from '@keystatic/core/reader'
import keystaticConfig from '#/keystatic.config'

type Config = typeof keystaticConfig

export type PostEntry = Entry<Config['collections']['posts']>
export type GoodEntry = Entry<Config['collections']['goods']>

export interface Post extends PostEntry {
  url: string
  slug: string
  views: number
  
}

export const reader: Reader<Config['collections'], Config['singletons']> = createReader(
  process.cwd(),
  keystaticConfig
)
