<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Card from '$lib/components/admin/primitives/Card.svelte';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import Input from '$lib/components/admin/primitives/Input.svelte';

	const id = page.params.id;
	const isNew = id === 'new';

	let form = $state({
		slug: '',
		title: '',
		category: 'HEALTHCARE SYSTEM',
		overview: '',
		screenshots: [],
		modules: [],
		pricing: [],
		sortOrder: 0
	});
	let newModule = $state('');
	let newPricingName = $state('');
	let newPricingPrice = $state('');
	let newPricingHighlight = $state('');
	let loading = $state(true);

	onMount(async () => {
		if (!isNew) {
			const res = await fetch('/admin/api/products');
			const items = await res.json();
			const found = items.find((i) => i.id === Number(id));
			if (found) form = found;
		}
		loading = false;
	});

	function addModule() {
		if (newModule.trim()) {
			form.modules = [...form.modules, newModule.trim()];
			newModule = '';
		}
	}

	function removeModule(i) {
		form.modules = form.modules.filter((_, idx) => idx !== i);
	}

	function addPricing() {
		if (newPricingName && newPricingPrice) {
			form.pricing = [...form.pricing, { name: newPricingName, price: newPricingPrice, highlights: [] }];
			newPricingName = '';
			newPricingPrice = '';
		}
	}

	function addHighlight(pricingIdx) {
		if (newPricingHighlight.trim()) {
			form.pricing[pricingIdx].highlights = [...form.pricing[pricingIdx].highlights, newPricingHighlight.trim()];
			newPricingHighlight = '';
		}
	}

	function removePricing(i) {
		form.pricing = form.pricing.filter((_, idx) => idx !== i);
	}

	async function save() {
		const method = isNew ? 'POST' : 'PUT';
		const body = isNew ? form : { id: Number(id), ...form };
		await fetch('/admin/api/products', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
		goto('/admin/products');
	}
</script>

{#if loading}
	<div class="space-y-4">
		{#each [1, 2] as _}
			<div class="h-40 animate-pulse rounded-xl bg-slate-100"></div>
		{/each}
	</div>
{:else}
	<div class="space-y-6 max-w-3xl">
		<div class="flex items-center justify-between">
			<h1 class="text-lg font-bold tracking-tight text-slate-800">{isNew ? 'Tambah Produk' : 'Edit Produk'}</h1>
			<Button onclick={save}>Simpan</Button>
		</div>

		<Card class="p-6">
			<div class="space-y-3">
				<Input bind:value={form.slug} placeholder="slug (e.g. simrs)" />
				<Input bind:value={form.title} placeholder="Judul" />
				<Input bind:value={form.category} type="select" options={[
					{ value: 'HEALTHCARE SYSTEM', label: 'HEALTHCARE SYSTEM' },
					{ value: 'BUSINESS ENTERPRISE', label: 'BUSINESS ENTERPRISE' },
					{ value: 'RETAIL & COMMERCE', label: 'RETAIL & COMMERCE' }
				]} />
				<Input bind:value={form.overview} type="textarea" placeholder="Overview" rows={3} />
			</div>
		</Card>

		<Card class="p-6">
			<h2 class="mb-3 text-sm font-bold text-slate-800">Modules</h2>
			<div class="flex gap-2">
				<input bind:value={newModule} placeholder="Tambah module" class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:outline-none focus:ring-2 focus:ring-[#0155FF]/10" onkeydown={(e) => e.key === 'Enter' && addModule()} />
				<Button variant="secondary" onclick={addModule}>Add</Button>
			</div>
			{#if form.modules.length > 0}
				<div class="mt-3 space-y-1.5">
					{#each form.modules as mod, i}
						<div class="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
							<span class="text-[13px] text-slate-700">{mod}</span>
							<button onclick={() => removeModule(i)} class="text-xs text-red-500 hover:text-red-700">Hapus</button>
						</div>
					{/each}
				</div>
			{/if}
		</Card>

		<Card class="p-6">
			<h2 class="mb-3 text-sm font-bold text-slate-800">Pricing Tiers</h2>
			<div class="flex gap-2">
				<input bind:value={newPricingName} placeholder="Nama tier" class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:outline-none focus:ring-2 focus:ring-[#0155FF]/10" />
				<input bind:value={newPricingPrice} placeholder="Harga" class="w-40 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:outline-none focus:ring-2 focus:ring-[#0155FF]/10" />
				<Button variant="secondary" onclick={addPricing}>Add</Button>
			</div>
			{#if form.pricing.length > 0}
				<div class="mt-3 space-y-3">
					{#each form.pricing as pricing, pi}
						<div class="rounded-lg border border-slate-100 p-3">
							<div class="flex items-center justify-between">
								<p class="text-sm font-semibold text-slate-800">{pricing.name} <span class="font-normal text-slate-400">— {pricing.price}</span></p>
								<button onclick={() => removePricing(pi)} class="text-xs text-red-500 hover:text-red-700">Hapus Tier</button>
							</div>
							<div class="mt-2 flex gap-2">
								<input bind:value={newPricingHighlight} placeholder="Tambah highlight" class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:outline-none focus:ring-2 focus:ring-[#0155FF]/10" onkeydown={(e) => e.key === 'Enter' && addHighlight(pi)} />
								<Button variant="ghost" onclick={() => addHighlight(pi)}>Add</Button>
							</div>
							{#if pricing.highlights.length > 0}
								<ul class="mt-2 space-y-0.5">
									{#each pricing.highlights as h}
										<li class="text-xs text-slate-500">· {h}</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</Card>
	</div>
{/if}
