import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { products, blogPosts, features, testimonials } from '$lib/server/db/schema.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const [productCount, blogCount, featureCount, testimonialCount] = await Promise.all([
		db.select({ count: products.id }).from(products),
		db.select({ count: blogPosts.id }).from(blogPosts),
		db.select({ count: features.id }).from(features),
		db.select({ count: testimonials.id }).from(testimonials)
	]);

	return json({
		products: productCount.length,
		blogPosts: blogCount.length,
		features: featureCount.length,
		testimonials: testimonialCount.length
	});
}
