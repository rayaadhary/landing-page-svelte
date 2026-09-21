import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { heroSlides } from '$lib/server/db/schema.js';
import { eq, asc } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const slides = await db.select().from(heroSlides).orderBy(asc(heroSlides.sortOrder));
	return json(slides);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const data = await request.json();
	const result = await db.insert(heroSlides).values(data).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const { id, ...data } = await request.json();
	const result = await db.update(heroSlides).set(data).where(eq(heroSlides.id, id)).returning();
	return json(result[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
	const { id } = await request.json();
	await db.delete(heroSlides).where(eq(heroSlides.id, id));
	return json({ success: true });
}
