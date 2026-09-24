import { error } from '@sveltejs/kit';
import { readFile, stat } from 'fs/promises';
import { join, basename } from 'path';

const uploadDir = process.env.UPLOAD_DIR || join(process.cwd(), 'uploads');

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const name = basename(params.file);
	if (!/^[\w.-]+$/.test(name)) throw error(400, 'Bad filename');

	const path = join(uploadDir, name);
	try {
		const s = await stat(path);
		if (!s.isFile()) throw error(404, 'Not found');
	} catch {
		throw error(404, 'Not found');
	}

	const data = await readFile(path);
	const type = name.endsWith('.webp')
		? 'image/webp'
		: name.endsWith('.png')
			? 'image/png'
			: name.endsWith('.jpg') || name.endsWith('.jpeg')
				? 'image/jpeg'
				: name.endsWith('.jfif')
					? 'image/jpeg'
					: 'application/octet-stream';

	return new Response(data, {
		headers: {
			'content-type': type,
			'cache-control': 'public, max-age=31536000, immutable'
		}
	});
}
