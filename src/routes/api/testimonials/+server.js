import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { testimonials } from '$lib/server/db/schema.js';
import { and, asc, eq, isNull } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const product = url.searchParams.get('product');
	const active = eq(testimonials.active, true);
	const scoped = product ? eq(testimonials.productSlug, product) : isNull(testimonials.productSlug);
	const all = await db
		.select()
		.from(testimonials)
		.where(and(active, scoped))
		.orderBy(asc(testimonials.sortOrder));
	return json(all);
}
