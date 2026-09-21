import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { features } from '$lib/server/db/schema.js';
import { asc, eq } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all = await db.select().from(features).where(eq(features.active, true)).orderBy(asc(features.sortOrder));
	return json(all);
}
