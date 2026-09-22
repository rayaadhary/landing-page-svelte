<script>
	import { onMount } from 'svelte';
	import { Zap, Pencil, Trash2, Plus } from 'lucide-svelte';
	import PageHeader from '$lib/components/admin/primitives/PageHeader.svelte';
	import Card from '$lib/components/admin/primitives/Card.svelte';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import Input from '$lib/components/admin/primitives/Input.svelte';
	import EmptyState from '$lib/components/admin/primitives/EmptyState.svelte';
	import ConfirmDialog from '$lib/components/admin/primitives/ConfirmDialog.svelte';

	let items = $state([]);
	let loading = $state(true);
	let editing = $state(null);
	let form = $state({ title: '', description: '', iconName: 'CheckCircle', sortOrder: 0 });
	let confirmOpen = $state(false);
	let deleteId = $state(null);

	onMount(load);

	async function load() {
		const res = await fetch('/admin/api/features');
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
			await fetch('/admin/api/features', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
		} else {
			await fetch('/admin/api/features', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing, ...form }) });
		}
		editing = null;
		await load();
	}

	function confirmDelete(id) {
		deleteId = id;
		confirmOpen = true;
	}

	async function remove() {
		await fetch('/admin/api/features', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: deleteId }) });
		await load();
	}
</script>

<div class="space-y-6">
	<PageHeader title="Fitur">
		<button onclick={startNew} class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0155FF] text-white transition-colors hover:bg-[#0144dd]" aria-label="Tambah Fitur">
			<Plus size={16} strokeWidth={2} />
		</button>
	</PageHeader>

	{#if editing !== null}
		<Card class="p-6">
			<h2 class="mb-4 text-sm font-bold text-slate-800">{editing === 'new' ? 'Fitur Baru' : 'Edit Fitur'}</h2>
			<div class="space-y-3">
				<Input bind:value={form.title} placeholder="Judul" />
				<Input bind:value={form.description} type="textarea" placeholder="Deskripsi" rows={2} />
				<Input bind:value={form.iconName} placeholder="Icon Name (lucide)" />
				<Input bind:value={form.sortOrder} type="number" placeholder="Sort Order" />
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
	{:else if items.length === 0}
		<EmptyState icon={Zap} message="Belum ada fitur" actionLabel="Tambah Fitur" onaction={startNew} />
	{:else}
		<div class="space-y-2">
			{#each items as item}
				<div class="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 transition-colors hover:border-slate-200">
					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-slate-800">{item.title}</p>
						<p class="truncate text-xs text-slate-400">{item.description}</p>
					</div>
					<div class="flex shrink-0 gap-1">
						<button onclick={() => startEdit(item)} class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600" aria-label="Edit">
							<Pencil size={15} strokeWidth={1.5} />
						</button>
						<button onclick={() => confirmDelete(item.id)} class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500" aria-label="Hapus">
							<Trash2 size={15} strokeWidth={1.5} />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<ConfirmDialog bind:open={confirmOpen} title="Hapus fitur?" message="Fitur yang dihapus tidak dapat dikembalikan." onconfirm={remove} />
