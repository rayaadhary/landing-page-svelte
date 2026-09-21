import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { blogPosts } from '$lib/server/db/schema.js';
import { eq, desc } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
	return json(all);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const data = await request.json();
	const result = await db.insert(blogPosts).values(data).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const { id, ...data } = await request.json();
	data.updatedAt = new Date();
	const result = await db.update(blogPosts).set(data).where(eq(blogPosts.id, id)).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
	const { id } = await request.json();
	await db.delete(blogPosts).where(eq(blogPosts.id, id));
	return json({ success: true });
}
