<script>
	import {
		CheckCircle2,
		ArrowRight,
		ArrowUpRight,
		Blocks,
		Boxes,
		HeartPulse,
		Users,
		ShoppingCart,
		Layers,
		Sparkles,
		Building2
	} from 'lucide-svelte';
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { reveal } from '$lib/actions/reveal.js';
	import { normalizeModule } from '$lib/data/moduleIcons.js';

	let { items = [] } = $props();

	/** @typedef {{ slug: string, title: string, tagline: string, category: string, description: string, image: string, features: string[] }} Service */

	/** @type {Service[]} */
	const fallbackServices = [
		{
			slug: 'custom-software-app',
			title: 'Custom Web & Mobile App',
			tagline: 'Aplikasi sesuai kebutuhan unik',
			category: 'Platform',
			description:
				'Pengembangan aplikasi kustom dari nol sesuai kebutuhan unik bisnis Anda. Bebas menentukan arsitektur, fitur, dan integrasi API tanpa batasan template.',
			image: '',
			features: [
				'Arsitektur tailor-made & scalable',
				'UI/UX kustom, responsive & modern',
				'Integrasi third-party API & payment gateway',
				'Keamanan tingkat tinggi & optimasi performa'
			]
		},
		{
			slug: 'custom-erp',
			title: 'ERP',
			tagline: 'Alur bisnis terpusat',
			category: 'Platform',
			description:
				'Sistem manajemen terintegrasi untuk mengotomatisasi alur kerja operasional, keuangan, supply chain, hingga manufaktur secara real-time.',
			image: '',
			features: [
				'Modul bisnis fleksibel & modular',
				'Multi-branch, multi-warehouse & currency',
				'Dashboard laporan keuangan real-time',
				'Workflow & approval multi-level'
			]
		},
		{
			slug: 'simrs-klinik',
			title: 'SIMRS & SIM Klinik',
			tagline: 'Fasilitas kesehatan',
			category: 'Software',
			description:
				'Digitalisasi operasional faskes dari pendaftaran, rekam medis elektronik (RME), hingga integrasi BPJS & Satusehat.',
			image: '',
			features: [
				'RME standar Kemenkes',
				'Antrean pintar, farmasi & laboratorium',
				'Bridging BPJS V-Claim & Satusehat',
				'Kasir billing & laporan klaim terpadu'
			]
		},
		{
			slug: 'hris-payroll',
			title: 'HRIS & Payroll',
			tagline: 'SDM & penggajian',
			category: 'Software',
			description:
				'Sistem pengelolaan SDM otomatis untuk administrasi personalia, presensi GPS/biometrik, hingga kalkulasi payroll.',
			image: '',
			features: [
				'Presensi GPS, geofencing & face recognition',
				'Kalkulasi PPh 21 & BPJS',
				'Portal mandiri karyawan (ESS)',
				'Manajemen shift, cuti & overtime'
			]
		},
		{
			slug: 'pos-inventory',
			title: 'POS & Inventory',
			tagline: 'Kasir & stok multi-gudang',
			category: 'Software',
			description:
				'Sistem kasir dan manajemen stok terpusat untuk retail, grosir, maupun F&B dengan pemantauan multi-gudang real-time.',
			image: '',
			features: [
				'Kasir omnichannel (QRIS, EDC & e-wallet)',
				'Stok multi-gudang & barcode',
				'Laporan penjualan & profitabilitas',
				'Skema harga grosir/eceran/promo'
			]
		}
	];

	/** @type {Service[]} */
	const services = $derived(
		items.length
			? items.map((/** @type {any} */ p) => ({
					slug: p.slug,
					title: p.title,
					tagline: p.tagline || p.category || '',
					category: p.category || 'Software',
					description: p.overview,
					image: p.image || '',
					features: (p.modules || []).map((/** @type {any} */ m) => normalizeModule(m).name)
				}))
			: fallbackServices
	);

	/** @type {Record<string, any>} */
	const iconBySlug = {
		'custom-software-app': Blocks,
		'custom-erp': Boxes,
		'simrs-klinik': HeartPulse,
		'hris-payroll': Users,
		'pos-inventory': ShoppingCart
	};
	const palettes = [
		{ from: '#ef4444', to: '#b91c1c' },
		{ from: '#38bdf8', to: '#0155FF' },
		{ from: '#3b82f6', to: '#1d4ed8' },
		{ from: '#fbbf24', to: '#f97316' },
		{ from: '#a78bfa', to: '#7c3aed' },
		{ from: '#475569', to: '#1e3a8a' }
	];

	const tabs = $derived(['Semua', ...new Set(services.map((s) => s.category))]);
	let activeTab = $state('Semua');

	const visible = $derived(
		activeTab === 'Semua' ? services : services.filter((s) => s.category === activeTab)
	);

	const enterprise = $derived(
		services.find((s) => s.slug.includes('custom')) ?? services[0]
	);

	$effect(() => {
		if (!tabs.includes(activeTab)) activeTab = 'Semua';
	});
</script>

<section id="layanan" class="bg-white px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
			<!-- Solusi modular -->
			<div class="lg:col-span-7" use:reveal>
				<div class="flex items-center gap-3">
					<span
						class="flex size-10 items-center justify-center rounded-full bg-blue-50 text-[#0155FF]"
					>
						<Sparkles size={18} />
					</span>
					<h2 class="text-2xl font-bold tracking-tight text-slate-900">Solusi modular</h2>
				</div>
				<p class="mt-3 pl-[52px] text-base text-slate-600">
					Software siap pakai untuk berbagai fungsi bisnis
				</p>

				<div class="mt-6 rounded-3xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
					<!-- Tabs pill -->
					<div
						role="group"
						aria-label="Filter kategori produk"
						class="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-slate-200/70 p-1"
					>
						{#each tabs as tab}
							<button
								type="button"
								aria-pressed={activeTab === tab}
								onclick={() => (activeTab = tab)}
								class="rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#0155FF] focus-visible:outline-none {activeTab ===
								tab
									? 'bg-white text-slate-900 shadow-sm'
									: 'text-slate-500 hover:text-slate-800'}"
							>
								{tab}
							</button>
						{/each}
					</div>

					<!-- Grid kartu produk -->
					<div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
						{#each visible as item, index (item.slug)}
							{@const Icon = iconBySlug[item.slug] ?? Layers}
							{@const c = palettes[index % palettes.length]}
							<a
								href="/products/{item.slug}"
								class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0155FF]/40 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] focus-visible:ring-2 focus-visible:ring-[#0155FF] focus-visible:outline-none"
							>
								<div class="flex items-start justify-between">
									{#if item.image}
										<img
											src={item.image}
											alt=""
											class="size-11 rounded-xl object-cover"
											loading="lazy"
											decoding="async"
										/>
									{:else}
										<span
											class="flex size-11 items-center justify-center rounded-xl text-white shadow-sm"
											style="background: linear-gradient(135deg, {c.from}, {c.to});"
										>
											<Icon size={20} strokeWidth={2.2} />
										</span>
									{/if}
									<ArrowUpRight
										size={18}
										class="text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0155FF]"
									/>
								</div>

								<h3 class="mt-4 text-base font-bold text-slate-900">{item.title}</h3>
								<p class="mt-1 text-sm text-slate-500">{item.tagline}</p>
							</a>
						{/each}
					</div>
				</div>
			</div>

			<!-- Solusi enterprise -->
			<div class="flex flex-col lg:col-span-5" use:reveal={{ delay: 120 }}>
				<div class="flex items-center gap-3">
					<span
						class="flex size-10 items-center justify-center rounded-full bg-blue-50 text-[#0155FF]"
					>
						<Building2 size={18} />
					</span>
					<h2 class="text-2xl font-bold tracking-tight text-slate-900">Solusi enterprise</h2>
				</div>
				<p class="mt-3 pl-[52px] text-base text-slate-600">
					Didesain untuk mengikuti pertumbuhan bisnis
				</p>

				<div
					class="mt-6 flex flex-1 flex-col rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 sm:p-7"
				>
					<div class="flex items-center gap-2.5">
						<span
							class="flex size-8 items-center justify-center rounded-lg bg-[#0155FF] text-white"
						>
							<Blocks size={16} />
						</span>
						<h3 class="text-lg font-extrabold tracking-tight text-slate-900">
							{enterprise.title}
						</h3>
					</div>

					<p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
						{enterprise.description}
					</p>

					{#if enterprise.features.length}
						<ul class="mt-5 space-y-2.5">
							{#each enterprise.features.slice(0, 4) as feature}
								<li class="flex items-start gap-2.5 text-sm leading-snug text-slate-700">
									<CheckCircle2
										size={18}
										class="mt-0.5 shrink-0 fill-emerald-500 text-white"
										strokeWidth={2}
									/>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					{/if}

					<div class="mt-auto flex flex-col gap-2.5 pt-7 sm:flex-row">
						<a
							href="/products/{enterprise.slug}"
							class="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#0155FF] transition-all hover:border-[#0155FF]/40 hover:bg-blue-50/50 focus-visible:ring-2 focus-visible:ring-[#0155FF] focus-visible:outline-none active:scale-[0.98]"
						>
							Pelajari lebih lanjut <ArrowRight size={16} />
						</a>
						<a
							href={whatsappLink}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0155FF] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0145dd] focus-visible:ring-2 focus-visible:ring-[#0155FF] focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
						>
							Konsultasi gratis
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
