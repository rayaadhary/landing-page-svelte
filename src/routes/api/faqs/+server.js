import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { faqs } from '$lib/server/db/schema.js';
import { asc, eq } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all = await db.select().from(faqs).where(eq(faqs.active, true)).orderBy(asc(faqs.sortOrder));
	return json(all);
}
