import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { heroSlides } from '$lib/server/db/schema.js';
import { asc, eq } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const slides = await db.select().from(heroSlides).where(eq(heroSlides.active, true)).orderBy(asc(heroSlides.sortOrder));
	return json(slides);
}
