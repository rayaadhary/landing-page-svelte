<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import TiptapEditor from '$lib/components/admin/TiptapEditor.svelte';

	const id = page.params.id;
	const isNew = id === 'new';

	let form = $state({
		slug: '',
		title: '',
		category: 'SIMRS',
		image: '/assets/hospital2.png',
		author: 'Tim AORTA',
		date: new Date().toISOString().split('T')[0],
		readTime: '5 menit',
		excerpt: '',
		content: '',
		metaDescription: ''
	});
	let loading = $state(true);

	onMount(async () => {
		if (!isNew) {
			const res = await fetch('/api/blog');
			const items = await res.json();
			const found = items.find((i) => i.id === Number(id));
			if (found) form = found;
		}
		loading = false;
	});

	function handleContent(html) {
		form.content = html;
	}

	async function save() {
		const method = isNew ? 'POST' : 'PUT';
		const body = isNew ? form : { id: Number(id), ...form };
		await fetch('/api/blog', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
		goto('/admin/blog');
	}
</script>

{#if loading}
	<p class="text-sm text-slate-500">Loading...</p>
{:else}
	<div class="space-y-6 max-w-4xl">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-black text-slate-900">{isNew ? 'Tambah Blog Post' : 'Edit Blog Post'}</h1>
			<button onclick={save} class="rounded-lg bg-[#0155FF] px-4 py-2 text-sm font-bold text-white hover:opacity-90">Simpan</button>
		</div>

		<div class="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
			<input bind:value={form.slug} placeholder="slug (e.g. cara-memilih-simrs)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			<input bind:value={form.title} placeholder="Judul" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			<div class="grid grid-cols-2 gap-4">
				<select bind:value={form.category} class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
					<option>SIMRS</option>
					<option>SIM Klinik</option>
					<option>HRIS</option>
					<option>Custom Software</option>
					<option>Perbandingan</option>
				</select>
				<input bind:value={form.readTime} placeholder="Read Time" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
				<input bind:value={form.date} type="date" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
				<input bind:value={form.image} placeholder="Image URL" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			</div>
			<input bind:value={form.excerpt} placeholder="Excerpt" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			<input bind:value={form.metaDescription} placeholder="Meta Description (SEO)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
		</div>

		<div class="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
			<h2 class="font-bold text-slate-800">Konten Artikel</h2>
			<TiptapEditor content={form.content} onchange={handleContent} />
		</div>
	</div>
{/if}
