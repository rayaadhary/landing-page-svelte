const BASE = 'https://aorta-digital.vercel.app';

const products = [
	{ slug: 'simrs', updated: '2025-07-15' },
	{ slug: 'sim-klinik', updated: '2025-07-15' },
	{ slug: 'hris', updated: '2025-07-15' },
	{ slug: 'pos-inventory', updated: '2025-07-15' },
];

const blogArticles = [
	{ slug: 'cara-memilih-simrs-rumah-sakit', updated: '2025-07-10' },
	{ slug: 'apa-itu-sim-klinik-manfaat', updated: '2025-07-05' },
	{ slug: 'biaya-jasa-pembuatan-aplikasi-custom', updated: '2025-06-28' },
	{ slug: 'perbedaan-simrs-dan-aplikasi-klinik', updated: '2025-06-20' },
];

export async function GET() {
	const staticPages = [
		{ loc: '/', priority: '1.0', changefreq: 'weekly' },
		{ loc: '/blog', priority: '0.9', changefreq: 'weekly' },
		{ loc: '/sitemap.xml', priority: '0.0' },
	];

	const productPages = products.map((p) => ({
		loc: `/products/${p.slug}`,
		lastmod: p.updated,
		priority: '0.9',
		changefreq: 'monthly',
	}));

	const blogPages = blogArticles.map((a) => ({
		loc: `/blog/${a.slug}`,
		lastmod: a.updated,
		priority: '0.8',
		changefreq: 'monthly',
	}));

	const all = [...staticPages, ...productPages, ...blogPages];

	const urls = all
		.map(
			(p) => `  <url>
    <loc>${BASE}${p.loc}</loc>
    ${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}
    ${p.priority ? `<priority>${p.priority}</priority>` : ''}
    ${p.changefreq ? `<changefreq>${p.changefreq}</changefreq>` : ''}
  </url>`,
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
}
