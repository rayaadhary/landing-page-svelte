import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { blogPosts } from '$lib/server/db/schema.js';
import { eq, desc } from 'drizzle-orm';

const columnNames = new Set(Object.keys(blogPosts));
const READ_ONLY = new Set(['id', 'createdAt', 'updatedAt']);

/** @param {Record<string, unknown>} data */
function pickEditable(data) {
	const out = {};
	for (const key of Object.keys(data)) {
		if (columnNames.has(key) && !READ_ONLY.has(key) && data[key] !== undefined) {
			out[key] = data[key];
		}
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
	const data = pickEditable(raw);
	if (data.metaDescription === null) delete data.metaDescription;
	if (data.tags === null) delete data.tags;
	if (data.active === null) delete data.active;
	const result = await db.insert(blogPosts).values(data).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const raw = await request.json();
	const id = Number(raw.id);
	if (!Number.isInteger(id) || id <= 0) {
		return json({ error: 'id wajib' }, { status: 400 });
	}
	const data = pickEditable(raw);
	if (data.metaDescription === null) delete data.metaDescription;
	if (data.tags === null) delete data.tags;
	if (data.active === null) delete data.active;
	data.updatedAt = new Date();
	const result = await db.update(blogPosts).set(data).where(eq(blogPosts.id, id)).returning();
	if (!result[0]) {
		return json({ error: 'post tidak ditemukan' }, { status: 404 });
	}
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
	const { id } = await request.json();
	await db.delete(blogPosts).where(eq(blogPosts.id, id));
	return json({ success: true });
}
