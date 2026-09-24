import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { demoRequests } from '$lib/server/db/schema.js';
import { eq, desc } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all = await db.select().from(demoRequests).orderBy(desc(demoRequests.createdAt));
	return json(all);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const { id, ...data } = await request.json();
	const result = await db.update(demoRequests).set(data).where(eq(demoRequests.id, id)).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
	const { id } = await request.json();
	await db.delete(demoRequests).where(eq(demoRequests.id, id));
	return json({ success: true });
}
