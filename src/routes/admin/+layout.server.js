import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals, url }) {
	if (url.pathname === '/admin/login') {
		return {};
	}

	if (!locals.user) {
		throw redirect(302, '/admin/login');
	}

	return { user: locals.user };
}
