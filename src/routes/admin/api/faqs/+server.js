import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { faqs } from '$lib/server/db/schema.js';
import { eq, asc } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all = await db.select().from(faqs).orderBy(asc(faqs.sortOrder));
	return json(all);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const data = await request.json();
	const result = await db.insert(faqs).values(data).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const { id, ...data } = await request.json();
	const result = await db.update(faqs).set(data).where(eq(faqs.id, id)).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
	const { id } = await request.json();
	await db.delete(faqs).where(eq(faqs.id, id));
	return json({ success: true });
}
