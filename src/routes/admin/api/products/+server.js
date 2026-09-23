import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { products } from '$lib/server/db/schema.js';
import { eq, asc } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all = await db.select().from(products).orderBy(asc(products.sortOrder));
	return json(all);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const data = await request.json();
	const result = await db.insert(products).values(data).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const { id, ...data } = await request.json();
	const result = await db.update(products).set(data).where(eq(products.id, id)).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
	const { id } = await request.json();
	await db.delete(products).where(eq(products.id, id));
	return json({ success: true });
}
