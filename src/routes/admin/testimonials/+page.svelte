<script>
	import { onMount } from 'svelte';
	import { MessageSquare, Pencil, Trash2, Plus } from 'lucide-svelte';
	import PageHeader from '$lib/components/admin/primitives/PageHeader.svelte';
	import Card from '$lib/components/admin/primitives/Card.svelte';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import Input from '$lib/components/admin/primitives/Input.svelte';
	import EmptyState from '$lib/components/admin/primitives/EmptyState.svelte';
	import ConfirmDialog from '$lib/components/admin/primitives/ConfirmDialog.svelte';

	let items = $state([]);
	let loading = $state(true);
	let editing = $state(null);
	let uploading = $state(false);
	let confirmOpen = $state(false);
	let deleteId = $state(null);

	const emptyForm = {
		quote: '',
		clientName: '',
		clientRole: '',
		avatarLetter: '',
		avatarColor: '#10b981',
		projectName: '',
		category: '',
		image: '',
		rating: 5,
		sortOrder: 0
	};
	let form = $state({ ...emptyForm });

	onMount(load);

	async function load() {
		const res = await fetch('/admin/api/testimonials');
		items = await res.json();
		loading = false;
	}

	function startEdit(item) {
		editing = item.id;
		form = {
			...emptyForm,
			...item,
			category: item.category ?? '',
			image: item.image ?? '',
			rating: item.rating ?? 5
		};
	}

	function startNew() {
		editing = 'new';
		form = { ...emptyForm, sortOrder: items.length };
	}

	async function handleImageUpload(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		uploading = true;
		try {
			const formData = new FormData();
			formData.append('file', file);
			const res = await fetch('/admin/api/upload', { method: 'POST', body: formData });
			const data = await res.json();
			if (data.url) form.image = data.url;
		} catch (err) {
			console.error('Upload failed:', err);
		} finally {
			uploading = false;
			e.target.value = '';
		}
	}

	async function save() {
		const body = JSON.stringify(form);
		if (editing === 'new') {
			await fetch('/admin/api/testimonials', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body
			});
		} else {
			await fetch('/admin/api/testimonials', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: editing, ...form })
			});
		}
		editing = null;
		await load();
	}

	function confirmDelete(id) {
		deleteId = id;
		confirmOpen = true;
	}

	async function remove() {
		await fetch('/admin/api/testimonials', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: deleteId })
		});
		await load();
	}
</script>

<div class="space-y-6">
	<PageHeader title="Testimoni">
		<button
			onclick={startNew}
			class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0155FF] text-white transition-colors hover:bg-[#0144dd]"
			aria-label="Tambah Testimoni"
		>
			<Plus size={16} strokeWidth={2} />
		</button>
	</PageHeader>

	{#if editing !== null}
		<Card class="p-6">
			<h2 class="mb-4 text-sm font-bold text-slate-800">
				{editing === 'new' ? 'Testimoni Baru' : 'Edit Testimoni'}
			</h2>
			<div class="space-y-3">
				<Input
					bind:value={form.projectName}
					placeholder="Judul Showcase (mis. Kaigopedia (LMS Platform))"
				/>
				<Input bind:value={form.category} placeholder="Category badge (mis. E-LEARNING & LMS)" />
				<div class="grid grid-cols-3 gap-3">
					<Input bind:value={form.clientName} placeholder="Nama Klien" />
					<Input bind:value={form.clientRole} placeholder="Role/Perusahaan" />
					<Input bind:value={form.rating} type="number" placeholder="Rating 1-5" />
				</div>
				<Input bind:value={form.quote} type="textarea" placeholder="Quote" rows={3} />
				<div class="grid grid-cols-2 gap-3">
					<Input bind:value={form.avatarLetter} placeholder="Avatar Letter (1 char)" />
					<Input bind:value={form.avatarColor} placeholder="Avatar Color (#10b981)" />
				</div>
				<Input bind:value={form.sortOrder} type="number" placeholder="Sort Order" />

				<div>
					<label for="testimonial-image" class="mb-1.5 block text-[13px] font-medium text-slate-600"
						>Gambar Showcase</label
					>
					{#if form.image}
						<div class="relative mb-2">
							<img
								src={form.image}
								alt="Preview"
								class="h-32 w-full rounded-lg object-cover object-top"
							/>
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
						id="testimonial-image"
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
		<EmptyState
			icon={MessageSquare}
			message="Belum ada testimoni"
			actionLabel="Tambah Testimoni"
			onaction={startNew}
		/>
	{:else}
		<div class="space-y-2">
			{#each items as item}
				<div
					class="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 transition-colors hover:border-slate-200"
				>
					<div class="flex min-w-0 items-center gap-3">
						<div
							class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
							style="background-color: {item.avatarColor}"
						>
							{item.avatarLetter}
						</div>
						<div class="min-w-0">
							<p class="truncate text-sm font-semibold text-slate-800">{item.clientName}</p>
							<p class="truncate text-xs text-slate-400">
								{item.category || '—'} · {item.projectName || item.quote}
							</p>
						</div>
					</div>
					<div class="flex shrink-0 gap-1">
						<button
							onclick={() => startEdit(item)}
							class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
							aria-label="Edit"
						>
							<Pencil size={15} strokeWidth={1.5} />
						</button>
						<button
							onclick={() => confirmDelete(item.id)}
							class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
							aria-label="Hapus"
						>
							<Trash2 size={15} strokeWidth={1.5} />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<ConfirmDialog
	bind:open={confirmOpen}
	title="Hapus testimoni?"
	message="Testimoni yang dihapus tidak dapat dikembalikan."
	onconfirm={remove}
/>
