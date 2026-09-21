import { db } from '$lib/server/db/index.js';
import { heroSlides, products as productsTable, features, testimonials, faqs, settings } from '$lib/server/db/schema.js';
import { asc, eq } from 'drizzle-orm';
import { getAllArticles } from '$lib/data/blog/articles.js';
import { getProductBySlug, getAllProducts } from '$lib/data/products.js';

async function fetchFromDB() {
	try {
		const [slides, products, feats, tests, faqItems, settingsRows] = await Promise.all([
			db.select().from(heroSlides).where(eq(heroSlides.active, true)).orderBy(asc(heroSlides.sortOrder)),
			db.select().from(productsTable).where(eq(productsTable.active, true)).orderBy(asc(productsTable.sortOrder)),
			db.select().from(features).where(eq(features.active, true)).orderBy(asc(features.sortOrder)),
			db.select().from(testimonials).where(eq(testimonials.active, true)).orderBy(asc(testimonials.sortOrder)),
			db.select().from(faqs).where(eq(faqs.active, true)).orderBy(asc(faqs.sortOrder)),
			db.select().from(settings)
		]);

		const settingsMap = {};
		for (const s of settingsRows) {
			settingsMap[s.key] = s.value;
		}

		return {
			heroSlides: slides,
			products,
			features: feats,
			testimonials: tests,
			faqs: faqItems,
			settings: settingsMap,
			fromDB: true
		};
	} catch {
		return null;
	}
}

export async function load() {
	const dbData = await fetchFromDB();

	if (dbData) {
		return dbData;
	}

	// Fallback to hardcoded data
	return {
		heroSlides: [],
		products: getAllProducts(),
		features: [],
		testimonials: [],
		faqs: [
			{ q: 'Apakah sistem bisa di-custom?', a: 'Bisa. Semua produk AORTA bisa dikustomisasi sesuai kebutuhan operasional Anda — dari alur kerja, tampilan, hingga integrasi sistem pihak ketiga.' },
			{ q: 'Apakah menerima jasa buat aplikasi lain?', a: 'Ya. Selain produk standar, kami juga menerima jasa pembuatan aplikasi custom — ERP, e-learning, portal layanan publik, dan lainnya.' },
			{ q: 'Berapa lama proses implementasi?', a: 'SIM Klinik: 14–21 hari. SIMRS: 2–6 bulan. Aplikasi custom: disepakati setelah analisis kebutuhan.' },
			{ q: 'Sudah terintegrasi BPJS & SatuSehat?', a: 'Ya. Bridging BPJS (VClaim) dan SatuSehat sudah termasuk dalam paket, bukan biaya tambahan.' },
			{ q: 'Bagaimana support setelah beli?', a: 'SLA tertulis, support 24/7 via WhatsApp & tiket, dedicated engineer, dan update otomatis.' }
		],
		settings: {},
		fromDB: false
	};
}
