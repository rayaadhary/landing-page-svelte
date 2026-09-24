import { json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

const uploadDir = process.env.UPLOAD_DIR || join(process.cwd(), 'uploads');

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const formData = await request.formData();
	const file = formData.get('file');

	if (!file || typeof file === 'string') {
		return json({ error: 'No file uploaded' }, { status: 400 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	await mkdir(uploadDir, { recursive: true });

	const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

	try {
		await sharp(buffer)
			.resize({ width: 1600, withoutEnlargement: true })
			.webp({ quality: 80 })
			.toFile(join(uploadDir, filename));
	} catch {
		// not an image sharp can read — save as-is
		const ext = file.name.split('.').pop() || 'bin';
		const fallback = `${filename.replace(/\.webp$/, '')}.${ext}`;
		await writeFile(join(uploadDir, fallback), buffer);
		return json({ url: `/uploads/${fallback}` });
	}

	return json({ url: `/uploads/${filename}` });
}
