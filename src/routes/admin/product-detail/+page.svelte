<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { LayoutTemplate, Pencil } from 'lucide-svelte';
	import PageHeader from '$lib/components/admin/primitives/PageHeader.svelte';
	import EmptyState from '$lib/components/admin/primitives/EmptyState.svelte';

	/** @type {any[]} */
	let items = $state([]);
	let loading = $state(true);

	onMount(load);

	async function load() {
		const res = await fetch('/admin/api/products');
		items = await res.json();
		loading = false;
	}
</script>

<div class="space-y-6">
	<PageHeader title="Detail Produk">
		<span class="text-xs text-slate-400">Hero · Konten · Screenshots · Modules · Pricing</span>
	</PageHeader>

	{#if loading}
		<div class="space-y-3">
			{#each [1, 2, 3] as _}
				<div class="h-16 animate-pulse rounded-xl bg-slate-100"></div>
			{/each}
		</div>
	{:else if items.length === 0}
		<EmptyState
			icon={LayoutTemplate}
			message="Belum ada produk. Tambahkan produk dulu di menu Produk."
			actionLabel="Ke Produk"
			onaction={() => goto('/admin/products')}
		/>
	{:else}
		<div class="space-y-2">
			{#each items as item}
				<div
					class="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 transition-colors hover:border-slate-200"
				>
					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-slate-800">{item.title}</p>
						<p class="truncate text-xs text-slate-400">
							{item.category} · {item.slug} · {item.screenshots?.length ?? 0} screenshot · {item
								.modules?.length ?? 0} modul · {item.pricing?.length ?? 0} tier
						</p>
					</div>
					<div class="flex shrink-0 gap-1">
						<button
							onclick={() => goto(`/admin/product-detail/${item.id}`)}
							class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
							aria-label="Edit detail"
						>
							<Pencil size={15} strokeWidth={1.5} />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
