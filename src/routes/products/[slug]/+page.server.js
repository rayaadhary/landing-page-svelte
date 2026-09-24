import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { products as productsTable } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { getProductBySlug } from '$lib/data/products.js';

export async function load({ params }) {
	let product = null;
	let dbAvailable = false;

	try {
		const rows = await db
			.select()
			.from(productsTable)
			.where(eq(productsTable.slug, params.slug))
			.limit(1);
		product = rows[0] ?? null;
		dbAvailable = true;
	} catch {
		product = null;
	}

	// Static fallback hanya saat DB error — bukan saat slug tidak ada
	// (biar data admin tidak ditimpa data statis lama)
	if (!product && !dbAvailable) {
		product = getProductBySlug(params.slug);
	}

	if (!product) {
		throw error(404, 'Produk tidak ditemukan');
	}

	return { product };
}
