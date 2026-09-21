<script>
	import { onMount } from 'svelte';

	let items = $state([]);
	let loading = $state(true);
	let editing = $state(null);
	let form = $state({ quote: '', clientName: '', clientRole: '', avatarLetter: '', avatarColor: 'bg-emerald-500', projectName: '', sortOrder: 0 });

	onMount(load);

	async function load() {
		const res = await fetch('/api/testimonials');
		items = await res.json();
		loading = false;
	}

	function startEdit(item) {
		editing = item.id;
		form = { ...item };
	}

	function startNew() {
		editing = 'new';
		form = { quote: '', clientName: '', clientRole: '', avatarLetter: '', avatarColor: 'bg-emerald-500', projectName: '', sortOrder: items.length };
	}

	async function save() {
		if (editing === 'new') {
			await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
		} else {
			await fetch('/api/testimonials', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing, ...form }) });
		}
		editing = null;
		await load();
	}

	async function remove(id) {
		if (!confirm('Hapus testimoni ini?')) return;
		await fetch('/api/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
		await load();
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-black text-slate-900">Testimoni</h1>
		<button onclick={startNew} class="rounded-lg bg-[#0155FF] px-4 py-2 text-sm font-bold text-white hover:opacity-90">+ Tambah Testimoni</button>
	</div>

	{#if editing !== null}
		<div class="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
			<h2 class="font-bold text-slate-800">{editing === 'new' ? 'Testimoni Baru' : 'Edit Testimoni'}</h2>
			<textarea bind:value={form.quote} placeholder="Quote" rows="3" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
			<div class="grid grid-cols-2 gap-4">
				<input bind:value={form.clientName} placeholder="Nama Klien" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
				<input bind:value={form.clientRole} placeholder="Role/Perusahaan" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
				<input bind:value={form.avatarLetter} placeholder="Avatar Letter (1 char)" maxlength="1" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
				<input bind:value={form.avatarColor} placeholder="Avatar Color (bg-emerald-500)" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			</div>
			<input bind:value={form.projectName} placeholder="Nama Proyek" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
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
					<div class="flex items-center gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-full {item.avatarColor} text-xs font-bold text-white">{item.avatarLetter}</div>
						<div>
							<p class="font-bold text-slate-800">{item.clientName}</p>
							<p class="text-xs text-slate-500 line-clamp-1">{item.quote}</p>
						</div>
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
