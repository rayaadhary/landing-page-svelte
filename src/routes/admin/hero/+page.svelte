<script>
	import { onMount } from 'svelte';
	import { Image, Pencil, Trash2, Plus } from 'lucide-svelte';
	import PageHeader from '$lib/components/admin/primitives/PageHeader.svelte';
	import Card from '$lib/components/admin/primitives/Card.svelte';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import Input from '$lib/components/admin/primitives/Input.svelte';
	import EmptyState from '$lib/components/admin/primitives/EmptyState.svelte';
	import ConfirmDialog from '$lib/components/admin/primitives/ConfirmDialog.svelte';

	let slides = $state([]);
	let loading = $state(true);
	let editing = $state(null);
	let form = $state({ title: '', subtitle: '', description: '', svgHtml: '', color: '#0155FF', sortOrder: 0 });
	let confirmOpen = $state(false);
	let deleteId = $state(null);

	onMount(loadSlides);

	async function loadSlides() {
		const res = await fetch('/admin/api/hero');
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
			await fetch('/admin/api/hero', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
		} else {
			await fetch('/admin/api/hero', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing, ...form }) });
		}
		editing = null;
		await loadSlides();
	}

	function confirmDelete(id) {
		deleteId = id;
		confirmOpen = true;
	}

	async function remove() {
		await fetch('/admin/api/hero', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: deleteId }) });
		await loadSlides();
	}
</script>

<div class="space-y-6">
	<PageHeader title="Hero Slides">
		<button onclick={startNew} class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0155FF] text-white transition-colors hover:bg-[#0144dd]" aria-label="Tambah Slide">
			<Plus size={16} strokeWidth={2} />
		</button>
	</PageHeader>

	{#if editing !== null}
		<Card class="p-6">
			<h2 class="mb-4 text-sm font-bold text-slate-800">{editing === 'new' ? 'Slide Baru' : 'Edit Slide'}</h2>
			<div class="space-y-3">
				<Input bind:value={form.title} placeholder="Title" />
				<Input bind:value={form.subtitle} placeholder="Subtitle" />
				<Input bind:value={form.description} type="textarea" placeholder="Description" rows={3} />
				<Input bind:value={form.svgHtml} type="textarea" placeholder="SVG HTML" rows={2} />
				<div class="flex gap-4">
					<input bind:value={form.color} type="color" class="h-10 w-20 rounded-lg border border-slate-200" />
					<Input bind:value={form.sortOrder} type="number" placeholder="Sort Order" />
				</div>
			</div>
			<div class="mt-4 flex gap-2">
				<Button variant="primary" onclick={save}>Simpan</Button>
				<Button variant="secondary" onclick={() => (editing = null)}>Batal</Button>
			</div>
		</Card>
	{/if}

	{#if loading}
		<div class="space-y-3">
			{#each [1, 2, 3] as _}
				<div class="h-16 animate-pulse rounded-xl bg-slate-100"></div>
			{/each}
		</div>
	{:else if slides.length === 0}
		<EmptyState icon={Image} message="Belum ada slide" actionLabel="Tambah Slide" onaction={startNew} />
	{:else}
		<div class="space-y-2">
			{#each slides as slide}
				<div class="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 transition-colors hover:border-slate-200">
					<div class="flex items-center gap-3">
						<div class="h-8 w-8 shrink-0 rounded-lg" style="background-color: {slide.color}"></div>
						<div class="min-w-0">
							<p class="truncate text-sm font-semibold text-slate-800">{slide.title}</p>
							<p class="truncate text-xs text-slate-400">{slide.subtitle}</p>
						</div>
					</div>
					<div class="flex shrink-0 gap-1">
						<button onclick={() => startEdit(slide)} class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600" aria-label="Edit">
							<Pencil size={15} strokeWidth={1.5} />
						</button>
						<button onclick={() => confirmDelete(slide.id)} class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500" aria-label="Hapus">
							<Trash2 size={15} strokeWidth={1.5} />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<ConfirmDialog bind:open={confirmOpen} title="Hapus slide?" message="Slide yang dihapus tidak dapat dikembalikan." onconfirm={remove} />
