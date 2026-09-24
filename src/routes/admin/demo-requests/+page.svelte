<script>
	import { onMount } from 'svelte';
	import {
		Inbox,
		Trash2,
		ChevronDown,
		ChevronUp,
		Mail,
		Phone,
		Building2,
		Package
	} from 'lucide-svelte';
	import Input from '$lib/components/admin/primitives/Input.svelte';
	import EmptyState from '$lib/components/admin/primitives/EmptyState.svelte';
	import ConfirmDialog from '$lib/components/admin/primitives/ConfirmDialog.svelte';

	/** @type {any[]} */
	let items = $state([]);
	let loading = $state(true);
	/** @type {number | null} */
	let expandedId = $state(null);
	let confirmOpen = $state(false);
	/** @type {number | null} */
	let deleteId = $state(null);

	const statusOptions = [
		{ value: 'baru', label: 'Baru' },
		{ value: 'dihubungi', label: 'Dihubungi' },
		{ value: 'selesai', label: 'Selesai' }
	];

	/** @type {Record<string, string>} */
	const statusStyles = {
		baru: 'bg-blue-50 text-[#0155FF]',
		dihubungi: 'bg-amber-50 text-amber-600',
		selesai: 'bg-green-50 text-green-600'
	};

	onMount(load);

	async function load() {
		const res = await fetch('/admin/api/demo-requests');
		items = await res.json();
		loading = false;
	}

	/** @param {number} id */
	function toggle(id) {
		expandedId = expandedId === id ? null : id;
	}

	/**
	 * @param {number} id
	 * @param {string} status
	 */
	async function updateStatus(id, status) {
		await fetch('/admin/api/demo-requests', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, status })
		});
		await load();
	}

	/** @param {number} id */
	function confirmDelete(id) {
		deleteId = id;
		confirmOpen = true;
	}

	async function remove() {
		await fetch('/admin/api/demo-requests', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: deleteId })
		});
		await load();
	}

	/** @param {string} iso */
	function formatDate(iso) {
		try {
			return new Date(iso).toLocaleString('id-ID', {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch {
			return iso;
		}
	}

	/**
	 * @param {any} item
	 * @param {Event} e
	 */
	function handleStatusChange(item, e) {
		const target = /** @type {HTMLSelectElement} */ (e.target);
		updateStatus(item.id, target.value);
	}

	/** @param {any} item */
	function statusChangeHandler(item) {
		return (/** @type {Event} */ e) => handleStatusChange(item, e);
	}
</script>

<div class="space-y-6">
	<h1 class="text-lg font-bold tracking-tight text-slate-800">Request Demo</h1>

	{#if loading}
		<div class="space-y-3">
			{#each [1, 2, 3] as _}
				<div class="h-16 animate-pulse rounded-xl bg-slate-100"></div>
			{/each}
		</div>
	{:else if items.length === 0}
		<EmptyState icon={Inbox} message="Belum ada request demo" />
	{:else}
		<div class="space-y-2">
			{#each items as item (item.id)}
				<div
					class="rounded-xl border border-slate-100 bg-white transition-colors hover:border-slate-200"
				>
					<button
						type="button"
						onclick={() => toggle(item.id)}
						class="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
					>
						<div class="flex min-w-0 items-center gap-3">
							<div
								class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0155FF]/5 text-[#0155FF]"
							>
								<Mail size={15} strokeWidth={1.5} />
							</div>
							<div class="min-w-0">
								<p class="truncate text-sm font-semibold text-slate-800">
									{item.name}
									{#if item.companyName}
										<span class="font-normal text-slate-400">· {item.companyName}</span>
									{/if}
								</p>
								<p class="truncate text-xs text-slate-400">
									{item.email} · {item.productTitle || 'Umum'} · {formatDate(item.createdAt)}
								</p>
							</div>
						</div>
						<div class="flex shrink-0 items-center gap-2">
							<span
								class="rounded-full px-2 py-0.5 text-[11px] font-semibold {statusStyles[
									String(item.status)
								] || statusStyles.baru}"
							>
								{statusOptions.find((s) => s.value === item.status)?.label || item.status}
							</span>
							{#if expandedId === item.id}
								<ChevronUp size={15} class="text-slate-400" />
							{:else}
								<ChevronDown size={15} class="text-slate-400" />
							{/if}
						</div>
					</button>

					{#if expandedId === item.id}
						<div class="border-t border-slate-100 px-4 py-4">
							<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
								<div class="flex items-center gap-2 text-sm text-slate-600">
									<Mail size={14} class="text-slate-400" />
									<a href="mailto:{item.email}" class="hover:text-[#0155FF]">{item.email}</a>
								</div>
								<div class="flex items-center gap-2 text-sm text-slate-600">
									<Phone size={14} class="text-slate-400" />
									<a href="tel:{item.phone}" class="hover:text-[#0155FF]">{item.phone}</a>
								</div>
								{#if item.companyName}
									<div class="flex items-center gap-2 text-sm text-slate-600">
										<Building2 size={14} class="text-slate-400" />
										{item.companyName}
									</div>
								{/if}
								<div class="flex items-center gap-2 text-sm text-slate-600">
									<Package size={14} class="text-slate-400" />
									{item.productTitle || 'Umum'}
								</div>
							</div>

							{#if item.message}
								<p
									class="mt-3 rounded-lg bg-slate-50 p-3 text-sm whitespace-pre-wrap text-slate-600"
								>
									{item.message}
								</p>
							{/if}

							<div class="mt-4 flex flex-wrap items-end gap-2">
								<div class="w-40">
									<Input
										type="select"
										value={item.status}
										options={statusOptions}
										onchange={statusChangeHandler(item)}
									/>
								</div>
								<button
									type="button"
									onclick={() => confirmDelete(item.id)}
									class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
									aria-label="Hapus"
								>
									<Trash2 size={15} strokeWidth={1.5} />
								</button>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<ConfirmDialog
	bind:open={confirmOpen}
	title="Hapus request demo?"
	message="Request yang dihapus tidak dapat dikembalikan."
	onconfirm={remove}
/>
