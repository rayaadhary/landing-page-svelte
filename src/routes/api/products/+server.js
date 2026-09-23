import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { products } from '$lib/server/db/schema.js';
import { asc, eq } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all = await db.select().from(products).where(eq(products.active, true)).orderBy(asc(products.sortOrder));
	return json(all);
}
