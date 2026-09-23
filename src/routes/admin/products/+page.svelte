<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Package, Pencil, Trash2, Plus } from 'lucide-svelte';
	import PageHeader from '$lib/components/admin/primitives/PageHeader.svelte';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import EmptyState from '$lib/components/admin/primitives/EmptyState.svelte';
	import ConfirmDialog from '$lib/components/admin/primitives/ConfirmDialog.svelte';

	let items = $state([]);
	let loading = $state(true);
	let confirmOpen = $state(false);
	let deleteId = $state(null);

	onMount(load);

	async function load() {
		const res = await fetch('/admin/api/products');
		items = await res.json();
		loading = false;
	}

	function confirmDelete(id) {
		deleteId = id;
		confirmOpen = true;
	}

	async function remove() {
		await fetch('/admin/api/products', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: deleteId }) });
		await load();
	}
</script>

<div class="space-y-6">
	<PageHeader title="Produk">
		<button onclick={() => goto('/admin/products/new')} class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0155FF] text-white transition-colors hover:bg-[#0144dd]" aria-label="Tambah Produk">
			<Plus size={16} strokeWidth={2} />
		</button>
	</PageHeader>

	{#if loading}
		<div class="space-y-3">
			{#each [1, 2, 3] as _}
				<div class="h-16 animate-pulse rounded-xl bg-slate-100"></div>
			{/each}
		</div>
	{:else if items.length === 0}
		<EmptyState icon={Package} message="Belum ada produk" actionLabel="Tambah Produk" onaction={() => goto('/admin/products/new')} />
	{:else}
		<div class="space-y-2">
			{#each items as item}
				<div class="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 transition-colors hover:border-slate-200">
					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-slate-800">{item.title}</p>
						<p class="truncate text-xs text-slate-400">{item.category} · {item.slug}</p>
					</div>
					<div class="flex shrink-0 gap-1">
						<button onclick={() => goto(`/admin/products/${item.id}`)} class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600" aria-label="Edit">
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

<ConfirmDialog bind:open={confirmOpen} title="Hapus produk?" message="Produk yang dihapus tidak dapat dikembalikan." onconfirm={remove} />
