import { basename } from 'path';
import { url_for } from 'hexo-util';
import { initHexo } from './scripts/build';

// 获取所有文章的路径，供 Next.js 的 getStaticPaths 构建路径索引时使用
export const fetchAllPostsPaths = async () => {
    const hexo = await initHexo();
    const posts = hexo.database.model('Post').find({}).sort('-date');

    return posts.map(post => basename(post.slug));
};

// 获取指定文章的数据，供 Next.js 的 getStaticProps 使用
export const findPostBySlug = async (slug: string) => {
    const hexo = await initHexo();
    const urlFor = url_for.bind(hexo);

    const post = hexo.database.model('Post').findOne({ path: `post/${slug}/` });

    // 只返回需要用到的 prop
    return {
        title: post.title;
        date: post.date;
        updated: post.updated;
        content: post.content;
        permalink: post.permalink;
        prev: post.prev ? {
            title: post.prev.title ?? '',
            url: urlFor(post.prev.path)
        } : null,
        next: post.next ? {
            title: post.next.title ?? '',
            url: urlFor(post.next.path)
        } : null,
    }
};
export const getStaticPaths = async () => {
    const paths = await fetchAllPostsPaths();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params }) => {
    const post = await findPostBySlug(params.slug);
    return {
        props: {
            post
        }
    }
}


