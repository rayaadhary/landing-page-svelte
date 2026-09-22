<script>
	import { fade, fly } from 'svelte/transition';
	import { CheckCircle2, X, Settings2, ArrowRight } from 'lucide-svelte';
	import ProductCard from './ProductCard.svelte';
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';

	const products = [
		{
			slug: 'custom-erp',
			title: 'Custom App & ERP Engine',
			description:
				'Infrastruktur pengembangan software modular untuk bisnis dengan alur kerja unik. Bebas menentukan modul, skema database, dan integrasi pihak ketiga.',
			features: [
				'Arsitektur Modular Terintegrasi',
				'Alur Kerja Fleksibel',
				'Skalabilitas Enterprise',
				'Konektivitas Open API'
			],
			screenshot: null
		},
		{
			slug: 'simrs',
			title: 'SIMRS Core Enterprise',
			description:
				'Solusi digital menyeluruh untuk manajemen Rumah Sakit. sinkronkan alur kerja klinis, operasional, hingga keuangan dalam satu pusat data.',
			features: [
				'Rekam Medis Elektronik (EMR)',
				'Antrean Multi-Layanan Pintar',
				'Modul Farmasi Terpadu',
				'Billing + Bridging BPJS'
			],
			screenshot: '/assets/hospital2.png'
		},
		{
			slug: 'sim-klinik',
			title: 'SIM Klinik Pratama & Utama',
			description:
				'Sistem manajemen klinik modern multi-cabang. Potong birokrasi pendaftaran, kontrol rekam medis, dan percepat perputaran pasien.',
			features: [
				'Reservasi Online & Antrean',
				'Rekam Medis Elektronik (RME)',
				'Kasir Billing Terpadu',
				'Notifikasi WhatsApp Otomatis'
			],
			screenshot: '/assets/clinic2.png'
		},
		{
			slug: 'hris',
			title: 'HRIS Smart Corporate',
			description:
				'Sistem manajemen SDM berbasis cloud. Otomasikan administrasi personalia, presensi, penggajian, dan portal karyawan.',
			features: [
				'Presensi GPS & Biometrik',
				'Penjadwalan Kerja Fleksibel',
				'Payroll + PPh 21 Otomatis',
				'Portal Mandiri Karyawan (ESS)'
			],
			screenshot: '/assets/hris.png'
		},
		{
			slug: 'pos-inventory',
			title: 'POS & Intelligent Inventory',
			description:
				'Aplikasi kasir pintar untuk retail, grosir, dan F&B. Kendalikan stok multi-gudang, transaksi QRIS, dan laporan keuangan real-time.',
			features: [
				'Kasir Omnichannel (QRIS, E-Wallet)',
				'Inventori Multi-Gudang',
				'Harga Fleksibel (Grosir/Eceran)',
				'Dashboard Keuangan Real-Time'
			],
			screenshot: '/assets/pos.png'
		}
	];

	let selectedProduct = $state(null);
	let dialogRef = $state();

	function openModal(product) {
		selectedProduct = product;
	}

	function closeModal() {
		selectedProduct = null;
	}

	$effect(() => {
		if (selectedProduct && dialogRef) {
			dialogRef.focus();
		}
	});

	function onOverlayKeydown(e) {
		if (e.key === 'Escape') closeModal();
	}
</script>

<section id="layanan" class="px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mb-12 max-w-2xl">
			<h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
				Produk Kami
			</h2>
			<p class="mt-3 text-base text-slate-600">
				Pilih aplikasi siap pakai atau rancang sistem kustom bersama tim engineer kami.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each products as p, i (p.slug)}
				<div
					class="cursor-pointer"
					onclick={() => openModal(p)}
					onkeydown={(e) => e.key === 'Enter' && openModal(p)}
					role="button"
					tabindex="0"
					aria-label="Buka detail {p.title}"
				>
					<ProductCard index={i} {...p} />
				</div>
			{/each}
		</div>
	</div>
</section>

{#if selectedProduct}
	<div
		transition:fade={{ duration: 150 }}
		class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
		onclick={closeModal}
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
		role="presentation"
	>
		<div
			transition:fly={{ y: 20, duration: 250 }}
			class="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:max-h-[80vh] md:grid-cols-12"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Escape' && closeModal()}
			role="dialog"
			aria-modal="true"
			aria-labelledby="product-modal-title"
			bind:this={dialogRef}
			tabindex="-1"
		>
			<button
				class="absolute top-3 right-3 z-50 rounded-lg bg-slate-100 p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
				onclick={closeModal}
				aria-label="Close modal"
			>
				<X size={16} />
			</button>

			<div
				class="flex min-h-[200px] items-center justify-center overflow-y-auto border-b border-slate-100 bg-slate-50 p-6 md:col-span-7 md:h-full md:border-r md:border-b-0"
			>
				{#if selectedProduct.screenshot}
					<div class="w-full rounded-lg border border-slate-200 bg-white p-1">
						<img
							src={selectedProduct.screenshot}
							alt={selectedProduct.title}
							loading="lazy"
							decoding="async"
							class="w-full rounded-md object-contain"
						/>
					</div>
				{:else}
					<div
						class="flex aspect-[16/10] w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-400"
					>
						<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-[#0155FF]">
							<Settings2 size={24} />
						</div>
						<p class="text-sm font-bold text-slate-700">TAILORED ENGINE</p>
						<p class="mt-1 max-w-xs text-xs text-slate-400">
							Kustomisasi tanpa batas sesuai kebutuhan alur kerja Anda.
						</p>
					</div>
				{/if}
			</div>

			<div
				class="flex h-full flex-col justify-between overflow-y-auto bg-white p-6 sm:p-8 md:col-span-5"
			>
				<div class="space-y-5">
					<h3
						id="product-modal-title"
						class="text-xl font-bold text-slate-900"
					>
						{selectedProduct.title}
					</h3>

					<p class="text-sm leading-relaxed text-slate-600">
						{selectedProduct.description}
					</p>

					<div class="space-y-3">
						<h4 class="text-xs font-semibold tracking-wider text-slate-400 uppercase">
							Fitur Utama:
						</h4>
						<ul class="space-y-2">
							{#each selectedProduct.features as feature}
								<li class="flex items-start gap-2 text-sm text-slate-700">
									<CheckCircle2 size={14} class="mt-0.5 shrink-0 text-[#00C2CB]" />
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<div class="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
					<a
						href="/products/{selectedProduct.slug}"
						class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0155FF] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0145dd] active:scale-[0.98]"
						onclick={closeModal}
					>
						Lihat Detail <ArrowRight size={14} />
					</a>
					<a
						href={whatsappLink}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]"
						onclick={closeModal}
					>
						Tanya Sales
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
