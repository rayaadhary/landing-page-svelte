import { error } from '@sveltejs/kit';
import { getProductBySlug } from '$lib/data/products.js';

export function load({ params }) {
	const product = getProductBySlug(params.slug);
	if (!product) {
		throw error(404, 'Produk tidak ditemukan');
	}
	return { product };
}
