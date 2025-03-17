import { config, fields, collection, singleton } from '@keystatic/core'

// const dirPath = __dirname

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    settings: singleton({
      label: 'Settings',
      path: './content/settings/',
      format: 'json',
      schema: {
        name: fields.text({ label: 'Name' }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: './content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.text({ label: 'Category' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (tag) => tag.value,
        }),
        date: fields.datetime({
          label: 'Create datetime',
          description: 'The date and time of the post created',
          validation: {
            isRequired: true,
          },
        }),
        lastEdit: fields.datetime({
          label: 'Create datetime',
          description: 'The date and time of the post created',
        }),
        cover: fields.url({ label: 'Cover Image URL' }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Set this post as draft to prevent it from being published',
        }),
        mathjax: fields.checkbox({
          label: 'Mathjax',
          description: 'Set this post as draft to prevent it from being published',
        }),
        layout: fields.text({ label: 'Layout' }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
    goods: collection({
      label: 'Goods',
      slugField: 'name',
      path: './content/goods/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        model: fields.text({ label: 'Model' }),
        description: fields.text({ label: 'Description' }),
        image: fields.url({ label: 'Cover Image URL' }),
        rate: fields.number({ label: 'Rate' }),
        price: fields.number({ label: 'Price' }),
        purchaseDate: fields.date({ label: 'Purchase Date' }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
})
