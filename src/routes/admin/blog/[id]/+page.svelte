<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Card from '$lib/components/admin/primitives/Card.svelte';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import Input from '$lib/components/admin/primitives/Input.svelte';
	import TiptapEditor from '$lib/components/admin/TiptapEditor.svelte';

	const id = page.params.id;
	const isNew = id === 'new';

	let form = $state({
		slug: '',
		title: '',
		category: 'SIMRS',
		image: '/assets/hospital2.png',
		author: 'Tim AORTA',
		date: new Date().toISOString().split('T')[0],
		readTime: '5 menit',
		excerpt: '',
		content: '',
		metaDescription: '',
		tags: ''
	});
	let loading = $state(true);
	let uploading = $state(false);
	let slugEdited = $state(false);
	let fileInput = $state(null);
	let saveError = $state('');
	let saving = $state(false);

	onMount(async () => {
		if (!isNew) {
			const res = await fetch('/admin/api/blog');
			const items = await res.json();
			const found = items.find((i) => i.id === Number(id));
			if (found) {
				form = {
					slug: found.slug,
					title: found.title,
					category: found.category,
					image: found.image,
					author: found.author,
					date: found.date,
					readTime: found.readTime,
					excerpt: found.excerpt,
					content: found.content,
					metaDescription: found.metaDescription ?? '',
					tags: found.tags || ''
				};
			}
			slugEdited = true;
		}
		loading = false;
	});

	function toSlug(text) {
		return text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	function handleTitleInput() {
		if (!slugEdited) {
			form.slug = toSlug(form.title);
		}
	}

	function handleSlugInput() {
		slugEdited = true;
	}

	function handleContent(html) {
		form.content = html;
	}

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
		saveError = '';
		saving = true;
		try {
			const method = isNew ? 'POST' : 'PUT';
			const body = isNew ? { ...form } : { id: Number(id), ...form };
			const res = await fetch('/admin/api/blog', {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});
			if (!res.ok) {
				let detail = '';
				try {
					const data = await res.json();
					detail = data.error || '';
				} catch {
					// non-JSON error body
				}
				saveError = detail || `Gagal menyimpan (HTTP ${res.status})`;
				return;
			}
			goto('/admin/blog');
		} catch (err) {
			console.error('Save failed:', err);
			saveError = 'Gagal menyimpan. Periksa koneksi lalu coba lagi.';
		} finally {
			saving = false;
		}
	}
</script>

{#if loading}
	<div class="space-y-4">
		{#each [1, 2] as _}
			<div class="h-40 animate-pulse rounded-xl bg-slate-100"></div>
		{/each}
	</div>
{:else}
	<div class="max-w-4xl space-y-6">
		<div class="flex items-center justify-between">
			<h1 class="text-lg font-bold tracking-tight text-slate-800">
				{isNew ? 'Tambah Blog Post' : 'Edit Blog Post'}
			</h1>
			<Button onclick={save} disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button>
		</div>
		{#if saveError}
			<div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
				{saveError}
			</div>
		{/if}

		<Card class="p-6">
			<div class="space-y-3">
				<Input bind:value={form.title} placeholder="Judul" oninput={handleTitleInput} />
				<Input bind:value={form.slug} placeholder="slug" oninput={handleSlugInput} />
				<div class="grid grid-cols-2 gap-3">
					<Input
						bind:value={form.category}
						type="select"
						options={[
							{ value: 'SIMRS', label: 'SIMRS' },
							{ value: 'SIM Klinik', label: 'SIM Klinik' },
							{ value: 'HRIS', label: 'HRIS' },
							{ value: 'Custom Software', label: 'Custom Software' },
							{ value: 'Perbandingan', label: 'Perbandingan' }
						]}
					/>
					<Input bind:value={form.readTime} placeholder="Read Time" />
				</div>
				<div class="grid grid-cols-2 gap-3">
					<Input bind:value={form.date} type="date" />
					<div>
						<label class="mb-1.5 block text-[13px] font-medium text-slate-600">Gambar</label>
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
							type="file"
							accept="image/*"
							onchange={handleImageUpload}
							bind:this={fileInput}
							class="w-full text-[13px] text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#0155FF]/5 file:px-3 file:py-1.5 file:text-[13px] file:font-semibold file:text-[#0155FF] hover:file:bg-[#0155FF]/10"
						/>
						{#if uploading}
							<p class="mt-1 text-xs text-slate-400">Uploading...</p>
						{/if}
					</div>
				</div>
				<Input
					bind:value={form.tags}
					placeholder="Tags (koma pemisah: simrs, kesehatan, digital)"
				/>
				<Input bind:value={form.excerpt} placeholder="Excerpt" />
				<Input bind:value={form.metaDescription} placeholder="Meta Description (SEO)" />
			</div>
		</Card>

		<Card class="p-6">
			<h2 class="mb-3 text-sm font-bold text-slate-800">Konten Artikel</h2>
			<TiptapEditor content={form.content} onchange={handleContent} />
		</Card>
	</div>
{/if}
