<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let slides = $state([]);
	let loading = $state(true);
	let editing = $state(null);
	let form = $state({ title: '', subtitle: '', description: '', svgHtml: '', color: '#0155FF', sortOrder: 0 });

	onMount(loadSlides);

	async function loadSlides() {
		const res = await fetch('/api/hero');
		slides = await res.json();
		loading = false;
	}

	function startEdit(slide) {
		editing = slide.id;
		form = { ...slide };
	}

	function startNew() {
		editing = 'new';
		form = { title: '', subtitle: '', description: '', svgHtml: '', color: '#0155FF', sortOrder: slides.length };
	}

	async function save() {
		if (editing === 'new') {
			await fetch('/api/hero', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
		} else {
			await fetch('/api/hero', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing, ...form }) });
		}
		editing = null;
		await loadSlides();
	}

	async function remove(id) {
		if (!confirm('Hapus slide ini?')) return;
		await fetch('/api/hero', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
		await loadSlides();
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-black text-slate-900">Hero Slides</h1>
		<button onclick={startNew} class="rounded-lg bg-[#0155FF] px-4 py-2 text-sm font-bold text-white hover:opacity-90">+ Tambah Slide</button>
	</div>

	{#if editing !== null}
		<div class="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
			<h2 class="font-bold text-slate-800">{editing === 'new' ? 'Slide Baru' : 'Edit Slide'}</h2>
			<input bind:value={form.title} placeholder="Title" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			<input bind:value={form.subtitle} placeholder="Subtitle" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			<textarea bind:value={form.description} placeholder="Description" rows="3" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
			<textarea bind:value={form.svgHtml} placeholder="SVG HTML" rows="2" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono text-xs"></textarea>
			<div class="flex gap-4">
				<input bind:value={form.color} type="color" class="h-10 w-20 rounded-lg border border-slate-300" />
				<input bind:value={form.sortOrder} type="number" placeholder="Sort Order" class="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			</div>
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
			{#each slides as slide}
				<div class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
					<div class="flex items-center gap-3">
						<div class="h-8 w-8 rounded-lg" style="background-color: {slide.color}"></div>
						<div>
							<p class="font-bold text-slate-800">{slide.title}</p>
							<p class="text-xs text-slate-500">{slide.subtitle}</p>
						</div>
					</div>
					<div class="flex gap-2">
						<button onclick={() => startEdit(slide)} class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200">Edit</button>
						<button onclick={() => remove(slide.id)} class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100">Hapus</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
