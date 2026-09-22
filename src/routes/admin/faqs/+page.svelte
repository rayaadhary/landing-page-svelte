<script>
	import { onMount } from 'svelte';
	import { HelpCircle, Pencil, Trash2, Plus } from 'lucide-svelte';
	import PageHeader from '$lib/components/admin/primitives/PageHeader.svelte';
	import Card from '$lib/components/admin/primitives/Card.svelte';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import Input from '$lib/components/admin/primitives/Input.svelte';
	import EmptyState from '$lib/components/admin/primitives/EmptyState.svelte';
	import ConfirmDialog from '$lib/components/admin/primitives/ConfirmDialog.svelte';

	let items = $state([]);
	let loading = $state(true);
	let editing = $state(null);
	let form = $state({ question: '', answer: '', sortOrder: 0 });
	let confirmOpen = $state(false);
	let deleteId = $state(null);

	onMount(load);

	async function load() {
		const res = await fetch('/admin/api/faqs');
		items = await res.json();
		loading = false;
	}

	function startEdit(item) {
		editing = item.id;
		form = { ...item };
	}

	function startNew() {
		editing = 'new';
		form = { question: '', answer: '', sortOrder: items.length };
	}

	async function save() {
		if (editing === 'new') {
			await fetch('/admin/api/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
		} else {
			await fetch('/admin/api/faqs', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing, ...form }) });
		}
		editing = null;
		await load();
	}

	function confirmDelete(id) {
		deleteId = id;
		confirmOpen = true;
	}

	async function remove() {
		await fetch('/admin/api/faqs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: deleteId }) });
		await load();
	}
</script>

<div class="space-y-6">
	<PageHeader title="FAQ">
		<button onclick={startNew} class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0155FF] text-white transition-colors hover:bg-[#0144dd]" aria-label="Tambah FAQ">
			<Plus size={16} strokeWidth={2} />
		</button>
	</PageHeader>

	{#if editing !== null}
		<Card class="p-6">
			<h2 class="mb-4 text-sm font-bold text-slate-800">{editing === 'new' ? 'FAQ Baru' : 'Edit FAQ'}</h2>
			<div class="space-y-3">
				<Input bind:value={form.question} placeholder="Pertanyaan" />
				<Input bind:value={form.answer} type="textarea" placeholder="Jawaban" rows={4} />
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
		<EmptyState icon={HelpCircle} message="Belum ada FAQ" actionLabel="Tambah FAQ" onaction={startNew} />
	{:else}
		<div class="space-y-2">
			{#each items as item}
				<div class="flex items-start justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 transition-colors hover:border-slate-200">
					<div class="min-w-0 flex-1">
						<p class="truncate text-sm font-semibold text-slate-800">{item.question}</p>
						<p class="mt-0.5 line-clamp-1 text-xs text-slate-400">{item.answer}</p>
					</div>
					<div class="ml-3 flex shrink-0 gap-1">
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

<ConfirmDialog bind:open={confirmOpen} title="Hapus FAQ?" message="FAQ yang dihapus tidak dapat dikembalikan." onconfirm={remove} />
