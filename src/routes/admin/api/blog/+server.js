import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { blogPosts } from '$lib/server/db/schema.js';
import { eq, desc } from 'drizzle-orm';

const columnNames = new Set(Object.keys(blogPosts));

/** @param {Record<string, unknown>} data */
function pickKnown(data) {
	const out = {};
	for (const key of Object.keys(data)) {
		if (columnNames.has(key)) out[key] = data[key];
	}
	return out;
}

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
	return json(all);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const raw = await request.json();
	const data = pickKnown(raw);
	const result = await db.insert(blogPosts).values(data).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const { id, ...raw } = await request.json();
	const data = pickKnown(raw);
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
