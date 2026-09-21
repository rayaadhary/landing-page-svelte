<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let items = $state([]);
	let loading = $state(true);

	onMount(load);

	async function load() {
		const res = await fetch('/api/blog');
		items = await res.json();
		loading = false;
	}

	function addNew() {
		goto('/admin/blog/new');
	}

	function edit(id) {
		goto(`/admin/blog/${id}`);
	}

	async function remove(id) {
		if (!confirm('Hapus blog post ini?')) return;
		await fetch('/api/blog', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
		await load();
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-black text-slate-900">Blog</h1>
		<button onclick={addNew} class="rounded-lg bg-[#0155FF] px-4 py-2 text-sm font-bold text-white hover:opacity-90">+ Tambah Post</button>
	</div>

	{#if loading}
		<p class="text-sm text-slate-500">Loading...</p>
	{:else}
		<div class="space-y-3">
			{#each items as item}
				<div class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
					<div>
						<p class="font-bold text-slate-800">{item.title}</p>
						<p class="text-xs text-slate-500">{item.category} · {item.date}</p>
					</div>
					<div class="flex gap-2">
						<button onclick={() => edit(item.id)} class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200">Edit</button>
						<button onclick={() => remove(item.id)} class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100">Hapus</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
