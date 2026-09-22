import { json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const formData = await request.formData();
	const file = formData.get('file');

	if (!file || typeof file === 'string') {
		return json({ error: 'No file uploaded' }, { status: 400 });
	}

	const ext = file.name.split('.').pop();
	const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
	const uploadDir = join(process.cwd(), 'static', 'uploads');

	await mkdir(uploadDir, { recursive: true });
	const buffer = Buffer.from(await file.arrayBuffer());
	await writeFile(join(uploadDir, filename), buffer);

	return json({ url: `/uploads/${filename}` });
}
