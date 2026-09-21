<script>
	import { onMount } from 'svelte';

	let stats = $state({ products: 0, blogPosts: 0, features: 0, testimonials: 0 });

	onMount(async () => {
		const res = await fetch('/api/dashboard');
		if (res.ok) {
			stats = await res.json();
		}
	});
</script>

<div class="space-y-6">
	<h1 class="text-2xl font-black text-slate-900">Dashboard</h1>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-xl border border-slate-200 bg-white p-6">
			<p class="text-sm font-medium text-slate-500">Produk</p>
			<p class="mt-2 text-3xl font-black text-slate-900">{stats.products}</p>
		</div>
		<div class="rounded-xl border border-slate-200 bg-white p-6">
			<p class="text-sm font-medium text-slate-500">Blog Posts</p>
			<p class="mt-2 text-3xl font-black text-slate-900">{stats.blogPosts}</p>
		</div>
		<div class="rounded-xl border border-slate-200 bg-white p-6">
			<p class="text-sm font-medium text-slate-500">Fitur</p>
			<p class="mt-2 text-3xl font-black text-slate-900">{stats.features}</p>
		</div>
		<div class="rounded-xl border border-slate-200 bg-white p-6">
			<p class="text-sm font-medium text-slate-500">Testimoni</p>
			<p class="mt-2 text-3xl font-black text-slate-900">{stats.testimonials}</p>
		</div>
	</div>
</div>
