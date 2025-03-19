import { config, fields, collection, singleton } from "@keystatic/core";
import { title } from "process";

// const dirPath = __dirname

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
    settings: singleton({
      label: "Settings",
      path: "./content/settings/",
      format: "json",
      schema: {
        title: fields.text({ label: "Title" }),
        author: fields.text({ label: "Author" }),
        headerTitle: fields.text({ label: "HeaderTitle" }),
        description: fields.text({ label: "HeaderTitle" }),
        language: fields.text({ label: "Language" }),
        theme: fields.text({ label: "Theme" }),
        siteUrl: fields.url({
          label: "SiteUrl",
          validation: { isRequired: true },
        }),
        siteRepo: fields.text({ label: "SiteRepo" }),
      },
    }),
    social: singleton({
      label: "Social",
      path: "./content/social/",
      format: "json",
      schema: {
        email: fields.text({ label: "Email" }),
        qq: fields.text({ label: "QQ" }),
        twitter: fields.text({ label: "Twitter/X" }),
        github: fields.text({ label: "Github" }),
        medium: fields.text({ label: "Medium" }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "./content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        category: fields.text({ label: "Category" }),
        tags: fields.array(
          fields.relationship({
            label: "Tags",
            description: "A list of tags for this post",
            collection: "tags",
          }),
          {
            label: "Authors",
            itemLabel: (props) => props.value || "",
          }
        ),
        date: fields.datetime({
          label: "Create datetime",
          description: "The date and time of the post created",
          validation: {
            isRequired: true,
          },
        }),
        lastEdit: fields.datetime({
          label: "Create datetime",
          description: "The date and time of the post created",
        }),
        cover: fields.url({ label: "Cover Image URL" }),
        draft: fields.checkbox({
          label: "Draft",
          description:
            "Set this post as draft to prevent it from being published",
        }),
        mathjax: fields.checkbox({
          label: "Mathjax",
          description:
            "Set this post as draft to prevent it from being published",
        }),
        layout: fields.text({ label: "Layout" }),
        wordCount: fields.number({ label: "Word Count", defaultValue: 0 }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
          components: {},
        }),
      },
    }),
    tags: collection({
      label: "Tags",
      slugField: "name",
      path: "./content/tags/*",
      format: "json",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
      },
    }),
    pages: collection({
      label: "Pages",
      slugField: "title",
      path: "./content/pages/*",
      format: "json",
      schema: {
        title: fields.slug({ name: { label: "Ttile" } }),
        description: fields.text({ label: "Description" }),
        icon: fields.text({ label: "Icon" }),
        color: fields.text({ label: "Icon Color", defaultValue: "#99a1af" }),
        href: fields.url({ label: "URL", validation: { isRequired: true } }),
        index: fields.number({
          label: "Index",
          description: "For list sorting",
          defaultValue: 0,
        }),
        type: fields.select({
          label: "Type",
          description: "The page type",
          options: [
            { label: "Internal", value: "internal" },
            { label: "External", value: "external" },
            { label: "MultiZone", value: "multi-zone" },
          ],
          defaultValue: "internal",
        }),
      },
    }),
    goods: collection({
      label: "Goods",
      slugField: "name",
      path: "./content/goods/*",
      format: { contentField: "content" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        model: fields.text({ label: "Model" }),
        description: fields.text({ label: "Description" }),
        image: fields.url({ label: "Cover Image URL" }),
        rate: fields.number({ label: "Rate" }),
        price: fields.number({ label: "Price" }),
        purchaseDate: fields.date({ label: "Purchase Date" }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
});
