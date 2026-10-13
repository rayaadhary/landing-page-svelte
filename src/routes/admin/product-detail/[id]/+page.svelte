<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Card from '$lib/components/admin/primitives/Card.svelte';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import TiptapEditor from '$lib/components/admin/TiptapEditor.svelte';
	import { moduleIcons, ICON_MAP, normalizeModule } from '$lib/data/moduleIcons.js';
	import { CheckCircle } from 'lucide-svelte';

	const id = page.params.id;

	/**
	 * @typedef {{ name: string, price: string, highlights: string[] }} PricingTier
	 * @typedef {{ name: string, icon: string }} ModuleItem
	 * @typedef {{ question: string, answer: string }} FaqItem
	 * @typedef {{ title: string, category: string, tagline: string, overview: string, content: string, screenshots: string[], modules: ModuleItem[], pricing: PricingTier[], faqs: FaqItem[] }} DetailForm
	 */

	/** @type {DetailForm} */
	let form = $state({
		title: '',
		category: '',
		tagline: '',
		overview: '',
		content: '',
		screenshots: [],
		modules: [],
		pricing: [],
		faqs: []
	});
	let newModule = $state('');
	let newModuleIcon = $state('');
	let newPricingName = $state('');
	let newPricingPrice = $state('');
	let newPricingHighlight = $state('');
	let newFaqQuestion = $state('');
	let newFaqAnswer = $state('');
	let loading = $state(true);
	let notFound = $state(false);
	let uploading = $state(false);

	/** @type {string} */
	let productSlug = $state('');
	/** @type {any[]} */
	let allProducts = $state([]);
	/** @type {any[]} */
	let allTestimonials = $state([]);
	let productTestimonials = $derived(
		allTestimonials.filter((/** @type {any} */ t) => t.productSlug === productSlug)
	);
	let newT = $state({
		projectName: '',
		clientName: '',
		clientRole: '',
		quote: '',
		category: '',
		avatarLetter: '',
		avatarColor: '#0155FF'
	});

	onMount(async () => {
		const res = await fetch('/admin/api/products');
		/** @type {any[]} */
		const items = await res.json();
		allProducts = items;
		const found = items.find((/** @type {any} */ i) => i.id === Number(id));
		if (found) {
			productSlug = found.slug ?? '';
			form = {
				title: found.title,
				category: found.category ?? '',
				tagline: found.tagline ?? '',
				overview: found.overview ?? '',
				content: found.content ?? '',
				screenshots: found.screenshots ?? [],
				modules: (found.modules ?? []).map(normalizeModule),
				pricing: found.pricing ?? [],
				faqs: found.faqs ?? []
			};
		} else {
			notFound = true;
		}
		loading = false;
		fetch('/admin/api/testimonials')
			.then((r) => r.json())
			.then((t) => (allTestimonials = t))
			.catch(() => (allTestimonials = []));
	});

	async function addTestimonial() {
		if (!newT.quote.trim() || !newT.clientName.trim()) return;
		await fetch('/admin/api/testimonials', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...newT,
				productSlug,
				avatarLetter: newT.avatarLetter || newT.clientName[0].toUpperCase(),
				rating: 5,
				sortOrder: allTestimonials.length
			})
		});
		newT = {
			projectName: '',
			clientName: '',
			clientRole: '',
			quote: '',
			category: '',
			avatarLetter: '',
			avatarColor: '#0155FF'
		};
		await loadTestimonials();
	}

	async function setTestimonialProduct(/** @type {any} */ t, /** @type {string} */ slug) {
		t.productSlug = slug || null;
		await fetch('/admin/api/testimonials', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: t.id, productSlug: t.productSlug })
		});
		await loadTestimonials();
	}

	async function removeTestimonial(/** @type {number} */ tid) {
		await fetch('/admin/api/testimonials', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: tid })
		});
		await loadTestimonials();
	}

	async function loadTestimonials() {
		const r = await fetch('/admin/api/testimonials');
		allTestimonials = await r.json();
	}

	function addModule() {
		if (newModule.trim()) {
			form.modules = [...form.modules, { name: newModule.trim(), icon: newModuleIcon }];
			newModule = '';
			newModuleIcon = '';
		}
	}

	function removeModule(/** @type {number} */ i) {
		form.modules = form.modules.filter((_, idx) => idx !== i);
	}

	function setModuleIcon(/** @type {number} */ i, /** @type {string} */ icon) {
		form.modules[i] = { ...form.modules[i], icon };
	}

	function addPricing() {
		if (newPricingName && newPricingPrice) {
			form.pricing = [
				...form.pricing,
				{ name: newPricingName, price: newPricingPrice, highlights: [] }
			];
			newPricingName = '';
			newPricingPrice = '';
		}
	}

	function removePricing(/** @type {number} */ i) {
		form.pricing = form.pricing.filter((_, idx) => idx !== i);
	}

	function addHighlight(/** @type {number} */ pricingIdx) {
		if (newPricingHighlight.trim()) {
			form.pricing[pricingIdx].highlights = [
				...form.pricing[pricingIdx].highlights,
				newPricingHighlight.trim()
			];
			newPricingHighlight = '';
		}
	}

	function removeHighlight(/** @type {number} */ pricingIdx, /** @type {number} */ highlightIdx) {
		form.pricing[pricingIdx].highlights = form.pricing[pricingIdx].highlights.filter(
			(_, idx) => idx !== highlightIdx
		);
	}

	function removeScreenshot(/** @type {number} */ i) {
		form.screenshots = form.screenshots.filter((_, idx) => idx !== i);
	}

	function addFaq() {
		if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
			form.faqs = [...form.faqs, { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }];
			newFaqQuestion = '';
			newFaqAnswer = '';
		}
	}

	function removeFaq(/** @type {number} */ i) {
		form.faqs = form.faqs.filter((_, idx) => idx !== i);
	}

	async function handleScreenshotUpload(/** @type {Event} */ e) {
		const input = /** @type {HTMLInputElement} */ (e.target);
		const files = input.files;
		if (!files?.length) return;

		uploading = true;
		try {
			for (const file of files) {
				const formData = new FormData();
				formData.append('file', file);
				const res = await fetch('/admin/api/upload', { method: 'POST', body: formData });
				const data = await res.json();
				if (data.url) {
					form.screenshots = [...form.screenshots, data.url];
				}
			}
		} catch (err) {
			console.error('Upload failed:', err);
		} finally {
			uploading = false;
			input.value = '';
		}
	}

	async function save() {
		await fetch('/admin/api/products', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: Number(id),
				category: form.category,
				tagline: form.tagline,
				overview: form.overview,
				content: form.content,
				screenshots: form.screenshots,
				modules: form.modules,
				pricing: form.pricing,
				faqs: form.faqs
			})
		});
		goto('/admin/product-detail');
	}
</script>

{#if loading}
	<div class="space-y-4">
		{#each [1, 2] as _}
			<div class="h-40 animate-pulse rounded-xl bg-slate-100"></div>
		{/each}
	</div>
{:else if notFound}
	<div class="max-w-3xl space-y-4">
		<p class="text-sm font-medium text-slate-500">Produk tidak ditemukan.</p>
		<Button onclick={() => goto('/admin/product-detail')}>Kembali</Button>
	</div>
{:else}
	<div class="max-w-3xl space-y-6">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-lg font-bold tracking-tight text-slate-800">Edit Detail Produk</h1>
				<p class="text-[13px] text-slate-400">{form.title}</p>
			</div>
			<Button onclick={save}>Simpan</Button>
		</div>

		<Card class="p-6">
			<h2 class="mb-1 text-sm font-bold text-slate-800">Info Hero</h2>
			<p class="mb-3 text-xs text-slate-400">
				Badge kategori, tagline di landing, dan ringkasan di bawah judul halaman detail.
			</p>
			<div class="space-y-3">
				<div>
					<label for="pd-category" class="mb-1 block text-xs font-semibold text-slate-600"
						>Category</label
					>
					<input
						id="pd-category"
						bind:value={form.category}
						placeholder="HEALTHCARE SYSTEM"
						class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					/>
				</div>
				<div>
					<label for="pd-tagline" class="mb-1 block text-xs font-semibold text-slate-600"
						>Tagline</label
					>
					<input
						id="pd-tagline"
						bind:value={form.tagline}
						placeholder="Digitalisasi operasional faskes modern"
						class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					/>
				</div>
				<div>
					<label for="pd-overview" class="mb-1 block text-xs font-semibold text-slate-600"
						>Overview</label
					>
					<textarea
						id="pd-overview"
						bind:value={form.overview}
						rows="3"
						placeholder="Solusi digitalisasi operasional Fasilitas Kesehatan (Faskes)..."
						class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					></textarea>
				</div>
			</div>
		</Card>

		<Card class="p-6">
			<h2 class="mb-1 text-sm font-bold text-slate-800">Konten Detail</h2>
			<p class="mb-3 text-xs text-slate-400">
				Konten utama halaman detail produk. Ditampilkan di antara hero dan Architecture Modules.
			</p>
			<TiptapEditor
				content={form.content}
				onchange={(/** @type {string} */ html) => (form.content = html)}
			/>
		</Card>

		<Card class="p-6">
			<h2 class="mb-1 text-sm font-bold text-slate-800">Screenshots</h2>
			<p class="mb-3 text-xs text-slate-400">
				Dipakai di hero halaman detail &amp; preview OG image. Screenshot pertama jadi utama.
			</p>

			{#if form.screenshots.length > 0}
				<div class="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
					{#each form.screenshots as shot, i}
						<div class="relative">
							<img
								src={shot}
								alt="Screenshot {i + 1}"
								class="h-24 w-full rounded-lg border border-slate-100 object-cover"
							/>
							{#if i === 0}
								<span
									class="absolute top-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white"
									>UTAMA</span
								>
							{/if}
							<button
								type="button"
								onclick={() => removeScreenshot(i)}
								class="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-xs text-white hover:bg-black/70"
								aria-label="Hapus screenshot"
							>
								x
							</button>
						</div>
					{/each}
				</div>
			{/if}

			<input
				type="file"
				accept="image/*"
				multiple
				onchange={handleScreenshotUpload}
				class="w-full text-[13px] text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#0155FF]/5 file:px-3 file:py-1.5 file:text-[13px] file:font-semibold file:text-[#0155FF] hover:file:bg-[#0155FF]/10"
			/>
			{#if uploading}
				<p class="mt-1 text-xs text-slate-400">Uploading...</p>
			{/if}
		</Card>

		<Card class="p-6">
			<h2 class="mb-3 text-sm font-bold text-slate-800">Modules</h2>
			<div class="flex gap-2">
				<select
					bind:value={newModuleIcon}
					class="w-40 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					aria-label="Icon module baru"
				>
					{#each moduleIcons as opt}
						<option value={opt.value}>{opt.label}</option>
					{/each}
				</select>
				<input
					bind:value={newModule}
					placeholder="Tambah module"
					class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					onkeydown={(e) => e.key === 'Enter' && addModule()}
				/>
				<Button variant="secondary" onclick={addModule}>Add</Button>
			</div>
			{#if form.modules.length > 0}
				<div class="mt-3 space-y-1.5">
					{#each form.modules as mod, i}
						{@const PreviewIcon = mod.icon ? (ICON_MAP[mod.icon] ?? CheckCircle) : CheckCircle}
						<div class="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
							<span
								class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-slate-500 shadow-sm"
							>
								<PreviewIcon size={14} />
							</span>
							<select
								value={mod.icon}
								onchange={(e) =>
									setModuleIcon(i, /** @type {HTMLSelectElement} */ (e.target).value)}
								class="w-36 shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 focus:border-[#0155FF] focus:outline-none"
								aria-label="Pilih icon untuk {mod.name}"
							>
								{#each moduleIcons as opt}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
							<span class="min-w-0 flex-1 truncate text-[13px] text-slate-700">{mod.name}</span>
							<button
								onclick={() => removeModule(i)}
								class="shrink-0 text-xs text-red-500 hover:text-red-700">Hapus</button
							>
						</div>
					{/each}
				</div>
			{/if}
		</Card>

		<Card class="p-6">
			<h2 class="mb-3 text-sm font-bold text-slate-800">Pricing Tiers</h2>
			<div class="flex gap-2">
				<input
					bind:value={newPricingName}
					placeholder="Nama tier"
					class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
				/>
				<input
					bind:value={newPricingPrice}
					placeholder="Harga"
					class="w-40 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
				/>
				<Button variant="secondary" onclick={addPricing}>Add</Button>
			</div>
			{#if form.pricing.length > 0}
				<div class="mt-3 space-y-3">
					{#each form.pricing as pricing, pi}
						<div class="rounded-lg border border-slate-100 p-3">
							<div class="flex items-center justify-between">
								<p class="text-sm font-semibold text-slate-800">
									{pricing.name} <span class="font-normal text-slate-400">— {pricing.price}</span>
								</p>
								<button
									onclick={() => removePricing(pi)}
									class="text-xs text-red-500 hover:text-red-700">Hapus Tier</button
								>
							</div>
							<div class="mt-2 flex gap-2">
								<input
									bind:value={newPricingHighlight}
									placeholder="Tambah highlight"
									class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
									onkeydown={(e) => e.key === 'Enter' && addHighlight(pi)}
								/>
								<Button variant="ghost" onclick={() => addHighlight(pi)}>Add</Button>
							</div>
							{#if pricing.highlights.length > 0}
								<ul class="mt-2 space-y-0.5">
									{#each pricing.highlights as h, hi}
										<li class="flex items-center justify-between text-xs text-slate-500">
											<span>· {h}</span>
											<button
												onclick={() => removeHighlight(pi, hi)}
												class="text-red-400 hover:text-red-600">x</button
											>
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</Card>
		<Card class="p-6">
			<h2 class="mb-1 text-sm font-bold text-slate-800">FAQ</h2>
			<p class="mb-3 text-xs text-slate-400">
				Pertanyaan umum produk ini. Ditampilkan sebagai accordion di bawah pricing.
			</p>
			<div class="space-y-2">
				<input
					bind:value={newFaqQuestion}
					placeholder="Pertanyaan"
					class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
				/>
				<textarea
					bind:value={newFaqAnswer}
					rows="3"
					placeholder="Jawaban"
					class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
				></textarea>
				<div class="flex justify-end">
					<Button variant="secondary" onclick={addFaq}>Add</Button>
				</div>
			</div>
			{#if form.faqs.length > 0}
				<div class="mt-3 space-y-1.5">
					{#each form.faqs as faq, i}
						<div class="rounded-lg bg-slate-50 px-3 py-2">
							<div class="flex items-start justify-between gap-2">
								<p class="text-[13px] font-semibold text-slate-700">{faq.question}</p>
								<button
									onclick={() => removeFaq(i)}
									class="shrink-0 text-xs text-red-500 hover:text-red-700">Hapus</button
								>
							</div>
							<p class="mt-0.5 line-clamp-2 text-xs text-slate-500">{faq.answer}</p>
						</div>
					{/each}
				</div>
			{/if}
		</Card>
		<Card class="p-6">
			<h2 class="mb-1 text-sm font-bold text-slate-800">Testimoni</h2>
			<p class="mb-3 text-xs text-slate-400">
				Testimoni milik produk ini. Testimoni tanpa produk tampil di landing page &amp; halaman
				/testimonials.
			</p>

			{#if productTestimonials.length > 0}
				<div class="mb-3 space-y-1.5">
					{#each productTestimonials as t (t.id)}
						<div class="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
							<span
								class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
								style="background-color: {t.avatarColor}"
							>
								{t.avatarLetter}
							</span>
							<div class="min-w-0 flex-1">
								<p class="truncate text-[13px] font-semibold text-slate-700">
									{t.clientName}
									<span class="font-normal text-slate-400">— {t.projectName || t.quote}</span>
								</p>
							</div>
							<select
								value={t.productSlug ?? ''}
								onchange={(e) =>
									setTestimonialProduct(t, /** @type {HTMLSelectElement} */ (e.target).value)}
								class="w-40 shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 focus:border-[#0155FF] focus:outline-none"
								aria-label="Pindahkan testimoni {t.clientName}"
							>
								<option value="">Global</option>
								{#each allProducts as p}
									<option value={p.slug}>{p.title}</option>
								{/each}
							</select>
							<button
								type="button"
								onclick={() => removeTestimonial(t.id)}
								class="shrink-0 text-xs text-red-500 hover:text-red-700">Hapus</button
							>
						</div>
					{/each}
				</div>
			{/if}

			<div class="space-y-2">
				<div class="grid grid-cols-2 gap-2">
					<input
						bind:value={newT.clientName}
						placeholder="Nama Klien"
						class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					/>
					<input
						bind:value={newT.clientRole}
						placeholder="Role / Perusahaan"
						class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					/>
				</div>
				<div class="grid grid-cols-2 gap-2">
					<input
						bind:value={newT.projectName}
						placeholder="Judul Project"
						class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					/>
					<input
						bind:value={newT.category}
						placeholder="Category badge"
						class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					/>
				</div>
				<textarea
					bind:value={newT.quote}
					rows="3"
					placeholder="Quote klien"
					class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
				></textarea>
				<div class="grid grid-cols-2 gap-2">
					<input
						bind:value={newT.avatarLetter}
						placeholder="Inisial (default dari nama)"
						class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					/>
					<input
						bind:value={newT.avatarColor}
						placeholder="#0155FF"
						class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
					/>
				</div>
				<div class="flex justify-end">
					<Button variant="secondary" onclick={addTestimonial}>Tambah</Button>
				</div>
			</div>
		</Card>
	</div>
{/if}
