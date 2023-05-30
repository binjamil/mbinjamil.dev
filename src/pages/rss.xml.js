import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function get(context) {
	const posts = await getCollection('writings');
	const items = posts
		.filter(post => post !== undefined)
		.map((post) => ({
			...post.data,
			link: `/writings/${post.slug}/`,
		}));
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
