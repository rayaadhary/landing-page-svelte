import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '$env/dynamic/private';
import * as schema from './schema.js';

let _db;

function initDb() {
	if (!_db) {
		if (!env.DATABASE_URL) {
			throw new Error('DATABASE_URL environment variable is not set');
		}
		const client = postgres(env.DATABASE_URL);
		_db = drizzle(client, { schema });
	}
	return _db;
}

export const db = new Proxy({} , {
	get(_, prop) {
		return initDb()[prop];
	}
});
