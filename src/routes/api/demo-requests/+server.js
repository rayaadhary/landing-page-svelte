import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { demoRequests } from '$lib/server/db/schema.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	let data;
	try {
		data = await request.json();
	} catch {
		return json({ error: 'Invalid request' }, { status: 400 });
	}

	const name = String(data.name ?? '').trim();
	const companyName = String(data.companyName ?? '').trim();
	const email = String(data.email ?? '').trim();
	const phone = String(data.phone ?? '').trim();
	const message = String(data.message ?? '').trim();
	const productSlug = String(data.productSlug ?? '').trim();
	const productTitle = String(data.productTitle ?? '').trim();

	if (!email || !phone) {
		return json({ error: 'Email dan telepon wajib diisi' }, { status: 400 });
	}
	if (!EMAIL_RE.test(email)) {
		return json({ error: 'Email tidak valid' }, { status: 400 });
	}
	if (!name) {
		return json({ error: 'Nama wajib diisi' }, { status: 400 });
	}

	const result = await db
		.insert(demoRequests)
		.values({ name, companyName, email, phone, message, productSlug, productTitle })
		.returning();

	return json(result[0], { status: 201 });
}
