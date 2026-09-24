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
		tagline: '',
		overview: '',
		image: '',
		sortOrder: 0
	});
	let loading = $state(true);
	let uploading = $state(false);

	onMount(async () => {
		if (!isNew) {
			const res = await fetch('/admin/api/products');
			const items = await res.json();
			const found = items.find((i) => i.id === Number(id));
			if (found) form = { ...found, tagline: found.tagline || '', image: found.image || '' };
		}
		loading = false;
	});

	async function handleImageUpload(e) {
		const file = e.target.files?.[0];
		if (!file) return;

		uploading = true;
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('/admin/api/upload', { method: 'POST', body: formData });
			const data = await res.json();
			if (data.url) {
				form.image = data.url;
			}
		} catch (err) {
			console.error('Upload failed:', err);
		} finally {
			uploading = false;
		}
	}

	async function save() {
		const method = isNew ? 'POST' : 'PUT';
		const base = {
			slug: form.slug,
			title: form.title,
			category: form.category,
			tagline: form.tagline,
			overview: form.overview,
			image: form.image,
			sortOrder: form.sortOrder ?? 0
		};
		const body = isNew ? base : { id: Number(id), ...base };
		await fetch('/admin/api/products', {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
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
	<div class="max-w-3xl space-y-6">
		<div class="flex items-center justify-between">
			<h1 class="text-lg font-bold tracking-tight text-slate-800">
				{isNew ? 'Tambah Produk' : 'Edit Produk'}
			</h1>
			<Button onclick={save}>Simpan</Button>
		</div>

		<Card class="p-6">
			<div class="space-y-3">
				<Input bind:value={form.slug} placeholder="slug (e.g. simrs)" />
				<Input bind:value={form.title} placeholder="Judul" />
				<Input
					bind:value={form.tagline}
					placeholder="Tagline / Badge (e.g. Solusi Tailor-made untuk Skala Enterprise)"
				/>
				<Input
					bind:value={form.category}
					type="select"
					options={[
						{ value: 'HEALTHCARE SYSTEM', label: 'HEALTHCARE SYSTEM' },
						{ value: 'BUSINESS ENTERPRISE', label: 'BUSINESS ENTERPRISE' },
						{ value: 'RETAIL & COMMERCE', label: 'RETAIL & COMMERCE' }
					]}
				/>
				<Input
					bind:value={form.overview}
					type="textarea"
					placeholder="Overview / Deskripsi"
					rows={3}
				/>

				<div>
					<label for="product-image" class="mb-1.5 block text-[13px] font-medium text-slate-600"
						>Gambar</label
					>
					{#if form.image}
						<div class="relative mb-2">
							<img src={form.image} alt="Preview" class="h-32 w-full rounded-lg object-cover" />
							<button
								type="button"
								onclick={() => {
									form.image = '';
								}}
								class="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-xs text-white hover:bg-black/70"
								>x</button
							>
						</div>
					{/if}
					<input
						id="product-image"
						type="file"
						accept="image/*"
						onchange={handleImageUpload}
						class="w-full text-[13px] text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#0155FF]/5 file:px-3 file:py-1.5 file:text-[13px] file:font-semibold file:text-[#0155FF] hover:file:bg-[#0155FF]/10"
					/>
					{#if uploading}
						<p class="mt-1 text-xs text-slate-400">Uploading...</p>
					{/if}
				</div>
			</div>
		</Card>

		<p class="text-xs text-slate-400">
			Screenshots, modules, &amp; pricing diatur di menu
			<a href="/admin/product-detail" class="font-semibold text-[#0155FF] hover:underline"
				>Detail Produk</a
			>.
		</p>
	</div>
{/if}
