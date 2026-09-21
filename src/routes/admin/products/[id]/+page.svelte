<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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
			const res = await fetch('/api/products');
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
		await fetch('/api/products', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
		goto('/admin/products');
	}
</script>

{#if loading}
	<p class="text-sm text-slate-500">Loading...</p>
{:else}
	<div class="space-y-6 max-w-3xl">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-black text-slate-900">{isNew ? 'Tambah Produk' : 'Edit Produk'}</h1>
			<button onclick={save} class="rounded-lg bg-[#0155FF] px-4 py-2 text-sm font-bold text-white hover:opacity-90">Simpan</button>
		</div>

		<div class="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
			<input bind:value={form.slug} placeholder="slug (e.g. simrs)" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			<input bind:value={form.title} placeholder="Judul" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
			<select bind:value={form.category} class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
				<option>HEALTHCARE SYSTEM</option>
				<option>BUSINESS ENTERPRISE</option>
				<option>RETAIL & COMMERCE</option>
			</select>
			<textarea bind:value={form.overview} placeholder="Overview" rows="3" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
		</div>

		<div class="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
			<h2 class="font-bold text-slate-800">Modules</h2>
			<div class="flex gap-2">
				<input bind:value={newModule} placeholder="Tambah module" class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" onkeydown={(e) => e.key === 'Enter' && addModule()} />
				<button onclick={addModule} class="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-white">Add</button>
			</div>
			<div class="space-y-2">
				{#each form.modules as mod, i}
					<div class="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
						<span class="text-sm">{mod}</span>
						<button onclick={() => removeModule(i)} class="text-xs text-red-500 hover:text-red-700">Hapus</button>
					</div>
				{/each}
			</div>
		</div>

		<div class="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
			<h2 class="font-bold text-slate-800">Pricing Tiers</h2>
			<div class="flex gap-2">
				<input bind:value={newPricingName} placeholder="Nama tier" class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
				<input bind:value={newPricingPrice} placeholder="Harga" class="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
				<button onclick={addPricing} class="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-white">Add</button>
			</div>
			{#each form.pricing as pricing, pi}
				<div class="rounded-lg border border-slate-200 p-4 space-y-3">
					<div class="flex items-center justify-between">
						<p class="font-bold text-sm">{pricing.name} — {pricing.price}</p>
						<button onclick={() => removePricing(pi)} class="text-xs text-red-500 hover:text-red-700">Hapus Tier</button>
					</div>
					<div class="flex gap-2">
						<input bind:value={newPricingHighlight} placeholder="Tambah highlight" class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs" onkeydown={(e) => e.key === 'Enter' && addHighlight(pi)} />
						<button onclick={() => addHighlight(pi)} class="rounded-lg bg-slate-200 px-3 py-2 text-xs font-bold">Add</button>
					</div>
					<ul class="space-y-1">
						{#each pricing.highlights as h}
							<li class="text-xs text-slate-600">• {h}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
{/if}
