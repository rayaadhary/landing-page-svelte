<script>
	import { CheckCircle2, ArrowRight, ChevronRight } from 'lucide-svelte';
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { reveal } from '$lib/actions/reveal.js';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let { items = [] } = $props();

	const fallbackServices = [
		{
			slug: 'custom-software-app',
			title: 'Custom Web & Mobile App',
			tagline: 'Solusi Tailor-made untuk Skala Enterprise',
			description:
				'Pengembangan aplikasi kustom dari nol sesuai kebutuhan unik bisnis Anda. Bebas menentukan arsitektur, fitur, dan integrasi API tanpa batasan template.',
			image: '',
			features: [
				'Arsitektur Tailor-made & Scalable',
				'UI/UX Kustom, Responsive & Modern',
				'Integrasi Third-Party API & Payment Gateway',
				'Keamanan Tingkat Tinggi & Optimasi Performa'
			]
		},
		{
			slug: 'custom-erp',
			title: 'Enterprise Resource Planning (ERP)',
			tagline: 'Otomatisasi & Integrasi Alur Bisnis Terpusat',
			description:
				'Sistem manajemen terintegrasi untuk mengotomatisasi seluruh alur kerja operasional, keuangan, supply chain, hingga manufaktur secara real-time.',
			image: '',
			features: [
				'Modul Bisnis Fleksibel & Modular',
				'Multi-Branch, Multi-Warehouse & Currency',
				'Dashboard Laporan Keuangan Real-time',
				'Otomatisasi Workflow & Approval Multi-Level'
			]
		},
		{
			slug: 'simrs-klinik',
			title: 'SIMRS & SIM Klinik',
			tagline: 'Digitalisasi Ekosistem Fasilitas Kesehatan',
			description:
				'Solusi digitalisasi operasional Fasilitas Kesehatan (Faskes) dari pendaftaran, rekam medis elektronik (RME), hingga integrasi BPJS & Satusehat.',
			image: '',
			features: [
				'Rekam Medis Elektronik (RME) Standar Kemenkes',
				'Antrean Pintar, Farmasi & Laboratorium',
				'Bridging BPJS V-Claim & Integrasi Satusehat',
				'Kasir Billing & Laporan Klaim Terpadu'
			]
		},
		{
			slug: 'hris-payroll',
			title: 'HRIS & Payroll System',
			tagline: 'Kelola SDM & Penggajian Lebih Efisien',
			description:
				'Sistem pengelolaan SDM otomatis untuk menyederhanakan administrasi personalia, presensi GPS berbasis lokasi/biometrik, hingga kalkulasi payroll.',
			image: '',
			features: [
				'Presensi GPS, Geofencing & Face Recognition',
				'Kalkulasi PPh 21, BPJS Ketenagakerjaan & Kesehatan',
				'Portal Mandiri Karyawan / ESS App',
				'Manajemen Shift, Cuti & Overtime'
			]
		},
		{
			slug: 'pos-inventory',
			title: 'POS & Smart Inventory',
			tagline: 'Kasir Pintar & Kontrol Stok Multi-Gudang',
			description:
				'Sistem kasir dan manajemen stok terpusat untuk retail, grosir, maupun F&B dengan pemantauan multi-gudang secara akurat dan real-time.',
			image: '',
			features: [
				'Kasir Omnichannel (QRIS, EDC & E-Wallet)',
				'Manajemen Stok Multi-Gudang & Barcode',
				'Dashboard Laporan Penjualan & Profitability',
				'Skema Harga Fleksibel (Grosir/Eceran/Promo)'
			]
		}
	];

	const services = $derived(
		items.length
			? items.map((/** @type {any} */ p) => ({
					slug: p.slug,
					title: p.title,
					tagline: p.tagline || p.category,
					description: p.overview,
					image: p.image || '',
					features: p.modules || []
				}))
			: fallbackServices
	);

	let activeIndex = $state(0);
	let activeService = $derived(services[Math.min(activeIndex, services.length - 1)]);

	$effect(() => {
		services;
		if (activeIndex >= services.length) activeIndex = 0;
	});
</script>

<section id="layanan" class="bg-white px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Header Section -->
		<div class="mb-12 max-w-2xl" use:reveal>
			<h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
				Layanan & <span class="text-[#0155FF]">Solusi Digital</span>
			</h2>
			<p class="mt-3 text-base text-slate-600">
				Pilih jenis solusi di sebelah kiri untuk melihat gambaran sistem, cakupan fitur, dan opsi
				pengembangannya.
			</p>
		</div>

		<!-- Layout Main Grid (Kiri List, Kanan Detail) -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
			<!-- SEBELAH KIRI: List Navigation (4/12 Grid) -->
			<div class="flex flex-col gap-2 lg:col-span-4">
				{#each services as item, index}
					<button
						type="button"
						onclick={() => (activeIndex = index)}
						use:reveal={{ delay: 80 + index * 70 }}
						class="group relative flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 {activeIndex ===
						index
							? 'border-slate-300 bg-white text-slate-900'
							: 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-white/60 hover:text-slate-900'}"
					>
						<div class="pl-2">
							<p
								class="text-xs font-semibold tracking-wider uppercase {activeIndex === index
									? 'text-[#0155FF]'
									: 'text-slate-400'}"
							>
								0{index + 1}
							</p>
							<h3
								class="text-base font-bold {activeIndex === index
									? 'text-[#0155FF]'
									: 'text-slate-700'}"
							>
								{item.title}
							</h3>
						</div>

						<ChevronRight
							size={18}
							class="transition-transform duration-200 {activeIndex === index
								? 'translate-x-0.5 text-[#0155FF]'
								: 'text-slate-300 group-hover:text-slate-500'}"
						/>
					</button>
				{/each}
			</div>

			<!-- SEBELAH KANAN: Detail Content (8/12 Grid) - Card Polos Tanpa Shadow -->
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-8"
				use:reveal={{ delay: 200 }}
			>
				{#key activeIndex}
					<div class="space-y-6" in:fly={{ y: 12, duration: 350, easing: cubicOut }}>
						<div class="flex flex-col gap-6 sm:flex-row sm:items-start">
							<div class="min-w-0 flex-1">
								<span
									class="inline-block rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#0155FF]"
								>
									{activeService.tagline}
								</span>
								<h3 class="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
									{activeService.title}
								</h3>
								<p class="mt-3 text-base leading-relaxed text-slate-600">
									{activeService.description}
								</p>
							</div>
							{#if activeService.image}
								<img
									src={activeService.image}
									alt={activeService.title}
									class="h-40 w-full shrink-0 rounded-xl border border-slate-100 object-cover sm:ml-auto sm:h-36 sm:w-48 lg:h-44 lg:w-70"
								/>
							{/if}
						</div>

						<!-- Fitur Utama -->
						<div class="border-t border-slate-100 pt-6">
							<h4 class="mb-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
								Cakupan Fitur & Kemampuan Utama:
							</h4>
							<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
								{#each activeService.features as feature}
									<div class="flex items-start gap-2.5 text-sm text-slate-700">
										<CheckCircle2 size={16} class="mt-0.5 shrink-0 text-[#0155FF]" />
										<span>{feature}</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Action Buttons -->
						<div class="flex flex-wrap gap-4 border-t border-slate-100 pt-6 sm:items-center">
							<a
								href={whatsappLink}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-lg bg-[#0155FF] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0145dd] active:scale-[0.98]"
							>
								Konsultasi Modul Ini <ArrowRight size={16} />
							</a>
							<a
								href="#kontak"
								class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
							>
								Tanya Spesifikasi
							</a>
						</div>
					</div>
				{/key}
			</div>
		</div>
	</div>
</section>
