import { db } from '$lib/server/db/index.js';
import { sessions } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const token = event.cookies.get('session_token');

	if (token && event.url.pathname.startsWith('/admin')) {
		const session = await db
			.select()
			.from(sessions)
			.where(eq(sessions.token, token))
			.limit(1);

		if (session.length > 0 && new Date(session[0].expiresAt) > new Date()) {
			event.locals.user = { id: session[0].userId };
		}
	}

	const response = await resolve(event);
	return response;
}
