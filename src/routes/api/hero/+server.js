import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { hero } from '$lib/server/db/schema.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const rows = await db.select().from(hero).limit(1);
	return json(rows[0] ?? null);
}
