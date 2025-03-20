import { createReader, Entry, Reader } from "@keystatic/core/reader";
import keystaticConfig from "./keystatic.config";

type Config = typeof keystaticConfig;

export type PostEntry = Entry<Config["collections"]["posts"]>;
export type GoodEntry = Entry<Config["collections"]["goods"]>;
export type PageEntry = Entry<Config["collections"]["pages"]>;
export type TagEntry = Entry<Config["collections"]["tags"]>;
export type CategoryEntry = Entry<Config["collections"]["categories"]>;

export interface Post extends Omit<PostEntry, "content"> {
  url: string;
  slug: string;
  views: number;
}

export interface Page extends PageEntry {
  slug: string;
}

export interface Tag extends TagEntry {
  slug: string;
  count: number;
}

export interface TagWithPost extends Tag {
  slug: string;
  count: number;
  posts: Post[];
}
export interface Category extends CategoryEntry {
  slug: string;
}
export const reader: Reader<Config["collections"], Config["singletons"]> =
  createReader("../data", keystaticConfig);

const isValidDate = (dateStr: string): boolean =>
  !isNaN(new Date(dateStr).valueOf());

const comparePostDates = (
  a: { entry: PostEntry },
  b: { entry: PostEntry }
): number => {
  const aTimestamp = isValidDate(a.entry.date)
    ? new Date(a.entry.date).valueOf()
    : 0;
  const bTimestamp = isValidDate(b.entry.date)
    ? new Date(b.entry.date).valueOf()
    : 0;
  return bTimestamp - aTimestamp;
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const posts = await reader.collections.posts.all();
    if (!posts) return [];

    return posts.sort(comparePostDates).map((post) => {
      if (!isValidDate(post.entry.date)) {
        console.warn(`Invalid date detected in post: ${post.slug}`);
      }
      return transformPost(post);
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};

export const getPages = async (): Promise<Page[]> => {
  try {
    const pages = await reader.collections.pages.all();
    if (!pages) return [];

    return pages
      .sort((a, b) => a.entry.index! - b.entry.index!)
      .map((post) => {
        const { entry, slug } = post;
        return { ...entry, slug };
      });
  } catch (error) {
    console.error("Failed to fetch pages:", error);
    return [];
  }
};

export const getTags = async (): Promise<Tag[]> => {
  try {
    const tags = await reader.collections.tags.all();
    if (!tags) return [];
    const posts = await reader.collections.posts.all();

    return tags.map((post) => {
      const { entry, slug } = post;
      const pages = posts.filter((p) => p.entry.tags.includes(slug));
      return { ...entry, slug, count: pages.length };
    });
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return [];
  }
};
export const getTagsWithPosts = async (): Promise<TagWithPost[]> => {
  try {
    const tags = await reader.collections.tags.all();
    if (!tags) return [];
    const posts = await reader.collections.posts.all();

    return tags.map((post) => {
      const { entry, slug } = post;
      const pages = posts
        .filter((p) => p.entry.tags.includes(slug))
        .sort(comparePostDates)
        .map(transformPost);
      return { ...entry, slug, count: pages.length, posts: pages };
    });
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return [];
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await reader.collections.categories.all();
    if (!categories) return [];

    return categories.map((post) => {
      const { entry, slug } = post;
      return { ...entry, slug };
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export const getSettings = async () => {
  try {
    const settings = await reader.singletons.settings.read();
    if (!settings) return null;

    return settings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
};

export const transformPost = (post: {
  slug: string;
  entry: PostEntry;
}): Post => {
  const { slug, entry } = post;
  const { content, ...other } = entry;
  return {
    slug,
    url: `/posts/${slug}`,
    ...other,
    views: 0,
    layout: "",
  };
};
