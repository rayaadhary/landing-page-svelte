<script>
	import { onMount } from 'svelte';
	import { Plus, Trash2, Save } from 'lucide-svelte';
	import PageHeader from '$lib/components/admin/primitives/PageHeader.svelte';
	import Card from '$lib/components/admin/primitives/Card.svelte';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import Input from '$lib/components/admin/primitives/Input.svelte';

	let loading = $state(true);
	let saving = $state(false);
	/** @type {{ titlePrefix: string, titleHighlight: string, highlightColor: string, description: string, ctaPrimaryLabel: string, ctaPrimaryHref: string, ctaSecondaryLabel: string, ctaSecondaryHref: string, stats: { value: string, label: string }[] }} */
	let form = $state({
		titlePrefix: '',
		titleHighlight: '',
		highlightColor: '#0155FF',
		description: '',
		ctaPrimaryLabel: '',
		ctaPrimaryHref: '',
		ctaSecondaryLabel: '',
		ctaSecondaryHref: '',
		stats: []
	});

	onMount(load);

	async function load() {
		const res = await fetch('/admin/api/hero');
		const data = await res.json();
		if (data) {
			form = { ...form, ...data, stats: data.stats || [] };
		}
		loading = false;
	}

	function addStat() {
		form.stats = [...form.stats, { value: '', label: '' }];
	}

	/** @param {number} index */
	function removeStat(index) {
		form.stats = form.stats.filter((_, i) => i !== index);
	}

	async function save() {
		saving = true;
		await fetch('/admin/api/hero', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		});
		saving = false;
	}
</script>

<div class="space-y-6">
	<PageHeader title="Hero">
		<Button variant="primary" onclick={save} disabled={saving}>
			<Save size={14} class="mr-1.5" />
			{saving ? 'Menyimpan...' : 'Simpan'}
		</Button>
	</PageHeader>

	{#if loading}
		<div class="h-64 animate-pulse rounded-xl bg-slate-100"></div>
	{:else}
		<div class="space-y-6">
			<Card class="p-6">
				<h2 class="mb-4 text-sm font-bold text-slate-800">Judul</h2>
				<div class="space-y-3">
					<div class="grid gap-3 sm:grid-cols-2">
						<Input bind:value={form.titlePrefix} label="Prefix" placeholder="Jasa Pembuatan" />
						<Input
							bind:value={form.titleHighlight}
							label="Highlight"
							placeholder="Aplikasi & Software Kustom"
						/>
					</div>
					<div class="flex items-end gap-3">
						<div class="flex-1">
							<Input
								bind:value={form.highlightColor}
								label="Warna Highlight"
								placeholder="#0155FF"
							/>
						</div>
						<input
							bind:value={form.highlightColor}
							type="color"
							class="h-10 w-20 shrink-0 rounded-lg border border-slate-200"
							aria-label="Pilih warna highlight"
						/>
					</div>
					<Input bind:value={form.description} type="textarea" label="Deskripsi" rows={3} />
				</div>
			</Card>

			<Card class="p-6">
				<h2 class="mb-4 text-sm font-bold text-slate-800">Tombol CTA</h2>
				<div class="space-y-3">
					<div class="grid gap-3 sm:grid-cols-2">
						<Input
							bind:value={form.ctaPrimaryLabel}
							label="Label Utama"
							placeholder="Konsultasi Gratis"
						/>
						<Input
							bind:value={form.ctaPrimaryHref}
							label="Link Utama"
							placeholder="Kosong = WhatsApp"
						/>
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<Input
							bind:value={form.ctaSecondaryLabel}
							label="Label Sekunder"
							placeholder="Lihat Produk"
						/>
						<Input
							bind:value={form.ctaSecondaryHref}
							label="Link Sekunder"
							placeholder="#layanan"
						/>
					</div>
				</div>
			</Card>

			<Card class="p-6">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-sm font-bold text-slate-800">Statistik</h2>
					<button
						onclick={addStat}
						class="flex h-8 items-center gap-1.5 rounded-lg bg-[#0155FF] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0144dd]"
					>
						<Plus size={14} strokeWidth={2} />
						Tambah
					</button>
				</div>
				{#if form.stats.length === 0}
					<p class="text-sm text-slate-400">Belum ada statistik.</p>
				{:else}
					<div class="space-y-2">
						{#each form.stats as stat, i}
							<div class="flex items-end gap-2">
								<div class="w-32 shrink-0">
									<Input bind:value={stat.value} placeholder="Nilai" />
								</div>
								<div class="flex-1">
									<Input bind:value={stat.label} placeholder="Label" />
								</div>
								<button
									onclick={() => removeStat(i)}
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
									aria-label="Hapus statistik"
								>
									<Trash2 size={15} strokeWidth={1.5} />
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</Card>

			<div class="flex justify-end">
				<Button variant="primary" onclick={save} disabled={saving}>
					<Save size={14} class="mr-1.5" />
					{saving ? 'Menyimpan...' : 'Simpan'}
				</Button>
			</div>
		</div>
	{/if}
</div>
