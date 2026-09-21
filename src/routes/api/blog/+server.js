import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { blogPosts } from '$lib/server/db/schema.js';
import { desc, eq } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const slug = url.searchParams.get('slug');

	if (slug) {
		const post = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
		if (post.length === 0) {
			return json({ error: 'Not found' }, { status: 404 });
		}
		return json(post[0]);
	}

	const all = await db.select().from(blogPosts).where(eq(blogPosts.active, true)).orderBy(desc(blogPosts.date));
	return json(all);
}
