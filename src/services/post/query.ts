export const GetCurrentPostBySlug = `
query GetCurrentPostBySlug($slug: String!) {
  data: posts(filter: {slug: {_eq: $slug}}) {
    id
    title
    slug
    content
    category {
      name
      slug
    }
    tags {  
      tags_id {
        name
        slug
      }
    }
    date_published
  }
}
`

export const GetAdjacentPostsBySlug = `
query GetAdjacentPosts($datePublished: String!) {
    prev: posts(
        filter: { date_published: { _lt: $datePublished } }
        sort: ["-date_published"]
        limit: 1
    ) {
        id
        title
        slug
        date_published
    }
    next: posts(
        filter: { date_published: { _gt: $datePublished } }
        sort: ["date_published"]
        limit: 1
    ) {
        id
        title
        slug
        date_published
    }
}
`


export const GetAllCategory = `
{
    categories {
        id
        name
        slug
    }
    posts: posts_aggregated(groupBy: "category") {
        data: count {
            count: id
        }
        by: group
    }
}
`