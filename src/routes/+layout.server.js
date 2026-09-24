import { db } from '$lib/server/db/index.js';
import { products as productsTable } from '$lib/server/db/schema.js';
import { asc, eq } from 'drizzle-orm';

export async function load() {
	try {
		const rows = await db
			.select({
				slug: productsTable.slug,
				title: productsTable.title,
				category: productsTable.category,
				tagline: productsTable.tagline,
				overview: productsTable.overview
			})
			.from(productsTable)
			.where(eq(productsTable.active, true))
			.orderBy(asc(productsTable.sortOrder));

		return { navProducts: rows };
	} catch {
		return { navProducts: [] };
	}
}
