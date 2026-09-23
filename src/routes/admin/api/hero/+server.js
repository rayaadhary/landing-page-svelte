import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { hero } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const rows = await db.select().from(hero).limit(1);
	return json(rows[0] ?? null);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const data = await request.json();
	delete data.id;

	const rows = await db.select().from(hero).limit(1);
	if (rows[0]) {
		const result = await db.update(hero).set(data).where(eq(hero.id, rows[0].id)).returning();
		return json(result[0]);
	}

	const result = await db
		.insert(hero)
		.values({ id: 1, ...data })
		.returning();
	return json(result[0]);
}
