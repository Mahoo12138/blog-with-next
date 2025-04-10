import rehypeShikiFromHighlighter, { type RehypeShikiCoreOptions } from '@shikijs/rehype/core'

import shikiHighlighter from '#/lib/shiki'
import { MDXRemote } from 'next-mdx-remote/rsc'

const components = {}

export async function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          format: 'mdx',
          rehypePlugins: [
            [
              rehypeShikiFromHighlighter,
              await shikiHighlighter,
              {
                themes: {
                  dark: 'github-dark',
                  light: 'github-light',
                },
              } as RehypeShikiCoreOptions,
            ],
          ],
        },
      }}
    />
  )
}
