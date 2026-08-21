import { getAllArticles } from '$lib/data/blog/articles.js';
import { getAllProducts } from '$lib/data/products.js';

const BASE = 'https://aorta.my.id';

export async function GET() {
	const today = new Date().toISOString().split('T')[0];
	const staticPages = [
		{ loc: '/', lastmod: today, priority: '1.0', changefreq: 'weekly' },
		{ loc: '/blog', lastmod: today, priority: '0.9', changefreq: 'weekly' }
	];

	const productPages = getAllProducts().map((p) => ({
		loc: `/products/${p.slug}`,
		lastmod: p.updated,
		priority: '0.9',
		changefreq: 'monthly'
	}));

	const blogPages = getAllArticles().map((a) => ({
		loc: `/blog/${a.slug}`,
		lastmod: a.date,
		priority: '0.7',
		changefreq: 'monthly'
	}));

	const all = [...staticPages, ...productPages, ...blogPages];

	const urls = all
		.map(
			(p) => `  <url>
    <loc>${BASE}${p.loc}</loc>
    ${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}
    ${p.priority ? `<priority>${p.priority}</priority>` : ''}
    ${p.changefreq ? `<changefreq>${p.changefreq}</changefreq>` : ''}
  </url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
