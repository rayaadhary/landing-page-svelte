import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { sessions } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies }) {
	const token = cookies.get('session_token');
	if (token) {
		await db.delete(sessions).where(eq(sessions.token, token));
	}
	cookies.delete('session_token', { path: '/' });
	return json({ success: true });
}
