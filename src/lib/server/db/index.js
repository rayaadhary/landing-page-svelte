import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '$env/dynamic/private';
import * as schema from './schema.js';

if (!env.DATABASE_URL) {
	throw new Error('DATABASE_URL environment variable is not set');
}

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });
