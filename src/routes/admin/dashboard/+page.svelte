<script>
	import { onMount } from 'svelte';
	import { Package, FileText, Zap, MessageSquare } from 'lucide-svelte';
	import PageHeader from '$lib/components/admin/primitives/PageHeader.svelte';
	import Card from '$lib/components/admin/primitives/Card.svelte';

	let stats = $state({ products: 0, blogPosts: 0, features: 0, testimonials: 0 });
	let loading = $state(true);

	onMount(async () => {
		const res = await fetch('/admin/api/dashboard');
		if (res.ok) {
			stats = await res.json();
		}
		loading = false;
	});

	const statCards = [
		{ key: 'products', label: 'Produk', icon: Package, accent: 'bg-blue-50 text-blue-600' },
		{ key: 'blogPosts', label: 'Blog Posts', icon: FileText, accent: 'bg-cyan-50 text-cyan-600' },
		{ key: 'features', label: 'Fitur', icon: Zap, accent: 'bg-emerald-50 text-emerald-600' },
		{ key: 'testimonials', label: 'Testimoni', icon: MessageSquare, accent: 'bg-violet-50 text-violet-600' }
	];
</script>

<div class="space-y-6">
	<PageHeader title="Dashboard" />

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each statCards as card}
			<Card variant="stat" class="p-5">
				<div class="flex items-start justify-between">
					<div class="flex h-9 w-9 items-center justify-center rounded-lg {card.accent}">
						<card.icon size={18} strokeWidth={2} />
					</div>
				</div>
				<p class="mt-4 text-[13px] font-medium text-slate-500">{card.label}</p>
				{#if loading}
					<div class="mt-1.5 h-8 w-16 animate-pulse rounded bg-slate-100"></div>
				{:else}
					<p class="mt-1 text-2xl font-bold tracking-tight text-slate-800">{stats[card.key]}</p>
				{/if}
			</Card>
		{/each}
	</div>
</div>
