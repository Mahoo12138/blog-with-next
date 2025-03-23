import { notFound } from 'next/navigation';
import { directus, readItem, readItems } from '#/lib/directus'
export async function getPosts() {
  return directus.request(
    readItems('posts', {
      fields: ['slug', 'title', 'date_publish', { author: ['name'] }],
      sort: ['date_publish'],
    })
  )
}

export async function getPost(slug: string) {
	try {
		const post = await directus.request(
			readItem('posts', slug, {
				fields: ['*'],
			})
		);

		return post;
	} catch (error) {
        console.log('eerorr', error);
		notFound();
	}
}