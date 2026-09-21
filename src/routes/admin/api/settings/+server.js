import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { settings } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all = await db.select().from(settings);
	const result = {};
	for (const s of all) {
		result[s.key] = s.value;
	}
	return json(result);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const data = await request.json();
	for (const [key, value] of Object.entries(data)) {
		const existing = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
		if (existing.length > 0) {
			await db.update(settings).set({ value }).where(eq(settings.key, key));
		} else {
			await db.insert(settings).values({ key, value });
		}
	}
	return json({ success: true });
}
