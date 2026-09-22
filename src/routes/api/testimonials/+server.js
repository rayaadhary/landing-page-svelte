import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { testimonials } from '$lib/server/db/schema.js';
import { asc, eq } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all = await db.select().from(testimonials).where(eq(testimonials.active, true)).orderBy(asc(testimonials.sortOrder));
	return json(all);
}
