<script>
	import { onMount } from 'svelte';

	let items = $state([]);
	let loading = $state(true);
	let editing = $state(null);
	let form = $state({ title: '', description: '', iconName: 'CheckCircle', sortOrder: 0 });

	onMount(load);

	async function load() {
		const res = await fetch('/api/features');
		items = await res.json();
		loading = false;
	}

	function startEdit(item) {
		editing = item.id;
		form = { ...item };
	}

	function startNew() {
		editing = 'new';
		form = { title: '', description: '', iconName: 'CheckCircle', sortOrder: items.length };
	}

	async function save() {
		if (editing === 'new') {
			await fetch('/api/features', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
		} else {
			await fetch('/api/features', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing, ...form }) });
		}
		editing = null;
		await load();
	}

	async function remove(id) {
		if (!confirm('Hapus fitur ini?')) return;
		await fetch('/api/features', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
		await load();
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-black text-slate-900">Fitur</h1>
		<button onclick={startNew} class="rounded-lg bg-[#0155FF] px-4 py-2 text-sm font-bold text-white hover:opacity-90">+ Tambah Fitur</button>
	</div>

	{#if editing !== null}
		<div class="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
			<h2 class="font-bold text-slate-800">{editing === 'new' ? 'Fitur Baru' : 'Edit Fitur'}</h2>
			<input bind:value={form.title} placeholder="Judul" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			<textarea bind:value={form.description} placeholder="Deskripsi" rows="2" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
			<input bind:value={form.iconName} placeholder="Icon Name (lucide)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			<input bind:value={form.sortOrder} type="number" placeholder="Sort Order" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			<div class="flex gap-2">
				<button onclick={save} class="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white hover:opacity-90">Simpan</button>
				<button onclick={() => (editing = null)} class="rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-300">Batal</button>
			</div>
		</div>
	{/if}

	{#if loading}
		<p class="text-sm text-slate-500">Loading...</p>
	{:else}
		<div class="space-y-3">
			{#each items as item}
				<div class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
					<div>
						<p class="font-bold text-slate-800">{item.title}</p>
						<p class="text-xs text-slate-500">{item.description}</p>
					</div>
					<div class="flex gap-2">
						<button onclick={() => startEdit(item)} class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200">Edit</button>
						<button onclick={() => remove(item.id)} class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100">Hapus</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
