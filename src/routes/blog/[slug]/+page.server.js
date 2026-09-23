import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { blogPosts } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	try {
		const post = await db.select().from(blogPosts).where(eq(blogPosts.slug, params.slug)).limit(1);

		if (post.length > 0) {
			return { post: post[0] };
		}
	} catch {
		// DB not available, fall through to 404
	}

	throw error(404, 'Artikel tidak ditemukan');
}
