import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { users, sessions } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

async function verifyPassword(password, hash) {
	const [salt, key] = hash.split(':');
	const buf = await scryptAsync(password, salt, 64);
	const keyBuffer = Buffer.from(key, 'hex');
	return keyBuffer.length === buf.length && timingSafeEqual(buf, keyBuffer);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
	const { email, password } = await request.json();

	if (!email || !password) {
		return json({ success: false, error: 'Email dan password harus diisi' }, { status: 400 });
	}

	const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

	if (user.length === 0) {
		return json({ success: false, error: 'Email atau password salah' }, { status: 401 });
	}

	const valid = await verifyPassword(password, user[0].passwordHash);
	if (!valid) {
		return json({ success: false, error: 'Email atau password salah' }, { status: 401 });
	}

	const token = randomBytes(32).toString('hex');
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

	await db.insert(sessions).values({
		token,
		userId: user[0].id,
		expiresAt
	});

	cookies.set('session_token', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: false, // set true in production with HTTPS
		maxAge: 7 * 24 * 60 * 60
	});

	return json({ success: true });
}
