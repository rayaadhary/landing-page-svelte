<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { ArrowRight, ArrowLeft, CheckCircle2, Layout, Layers, X, Settings2 } from 'lucide-svelte';
	import ProductCard from './ProductCard.svelte';

	// PRODUCTS LIST (Ditambahkan Custom App Engine di baris paling pertama)
	const products = [
		{
			slug: 'custom-erp',
			title: 'Custom App & ERP Engine',
			description: 'Infrastruktur pengembangan software modular yang dirancang khusus untuk bisnis dengan alur kerja unik. Anda bebas menentukan modul operasional, skema database, aturan approval, hingga integrasi pihak ketiga tanpa harus terikat oleh keterbatasan template aplikasi konvensional.',
			features: [
				'Arsitektur Modular Terintegrasi (Aktifkan modul POS, HRIS, Akuntansi, atau CRM dalam satu database tunggal)',
				'Rancang Alur Kerja Fleksibel (Kustomisasi penuh hak akses, reporting dashboard, dan skema birokrasi internal)',
				'Skalabilitas Skala Enterprise (Siap menampung jutaan data transaksi dengan performa server cloud yang optimal)',
				'Konektivitas Open API (Kemudahan bridging dengan software internal eksisting maupun layanan eksternal)'
			],
			screenshot: null // Biar ngerender kondisi keren "Custom Engine State" pas modal dibuka
		},
		{
			slug: 'simrs',
			title: 'SIMRS Core Enterprise',
			description: 'Solusi transformasi digital menyeluruh untuk manajemen Rumah Sakit skala besar. Menyinkronkan seluruh alur kerja klinis, operasional, hingga administrasi keuangan dalam satu pusat data terpadu guna mendongkrak efisiensi layanan, memangkas antrean pasien, serta menjamin validitas pelaporan.',
			features: [
				'Rekam Medis Elektronik (EMR) terintegrasi penuh & 100% Siap Bridging SatuSehat Kemenkes',
				'Sistem Antrean Multi-Layanan Pintar untuk IGD, Rawat Jalan, Rawat Inap, dan Penunjang Medis',
				'Modul Farmasi Terpadu (E-Prescribing, Manajemen Stok Obat, Gudang Utama, & Resep Otomatis)',
				'Billing System Akurat dengan Fitur Auto-Klaim & Bridging Sistem BPJS Kesehatan (VClaim/P-Care)'
			],
			screenshot: '/assets/hospital2.png'
		},
		{
			slug: 'sim-klinik',
			title: 'SIM Klinik Pratama & Utama',
			description: 'Sistem manajemen klinik modern multi-cabang yang dirancang end-to-end untuk memotong birokrasi pendaftaran yang lambat. Membantu pemilik klinik mengontrol rekam medis, mempercepat perputaran pasien, dan menutup rapat setiap celah potensi kebocoran biaya operasional harian.',
			features: [
				'Portal Reservasi Online Pasien Mandiri & Sistem Antrean Terjadwal Real-Time',
				'Pencatatan Rekam Medis Elektronik (RME) Ringkas & Terstandarisasi Kemenkes RI',
				'Kasir Billing Kas terintegrasi dengan modul Live Inventory obat dan alat kesehatan',
				'Sistem Notifikasi WhatsApp Otomatis untuk pengingat jadwal kontrol & kuitansi digital'
			],
			screenshot: '/assets/clinic2.png'
		},
		{
			slug: 'hris',
			title: 'HRIS Smart Corporate',
			description: 'Sistem manajemen SDM cerdas berbasis cloud yang dirancang untuk mengotomatisasi seluruh administrasi personalia perusahaan Anda. Menghilangkan kerumitan pengelolaan manual, menyinkronkan data kehadiran, serta menjaga keharmonisan internal lewat transparansi kalkulasi komponen hak karyawan.',
			features: [
				'Aplikasi Presensi Online Anti-Fake GPS dengan verifikasi pengenalan wajah (Biometrik/Face Recognition)',
				'Manajemen Penjadwalan Kerja Fleksibel untuk mendukung multi-shift, lembur, dan rotasi divisi',
				'Kalkulator Payroll Otomatis yang memproses Gaji Pokok, Lembur, Insentif, BPJS, hingga PPh 21 dalam hitungan menit',
				'Portal Mandiri Karyawan (ESS App) untuk pengajuan klaim reimbursement, cuti, dan slip gaji paperless'
			],
			screenshot: '/assets/hris.png'
		},
		{
			slug: 'pos-inventory',
			title: 'POS & Intelligent Inventory',
			description: 'Aplikasi kasir pintar serbaguna yang dirancang khusus untuk mengamankan pendapatan dan mengoptimalkan manajemen stok pada bisnis retail, grosir, maupun F&B. Membantu memantau performa bisnis dari mana saja, mempercepat layanan kasir, dan mencegah kerugian akibat kelalaian pencatatan persediaan.',
			features: [
				'Aplikasi Kasir Omnichannel yang mendukung Multi-Payment modern (QRIS, E-Wallet, & Virtual Account)',
				'Sistem Manajemen Inventori Multi-Gudang dengan deteksi otomatis barang lambat laku (Slow-moving) & Expired Date',
				'Penyesuaian Harga Fleksibel (Grosir, Eceran, Multi-Satuan) dilengkapi fitur auto-order ke Supplier saat stok menipis',
				'Dashboard Laporan Keuangan Komprehensif (Laba Rugi, Margin, Neraca) yang bisa dipantau Real-Time lewat HP'
			],
			screenshot: '/assets/pos.png'
		}
	];

	let page = $state(0);
	let perPage = $state(3);
	let autoSlide;

	let selectedProduct = $state(null);

	function openModal(product) {
		selectedProduct = product;
	}

	function closeModal() {
		selectedProduct = null;
	}
	
	function updatePerPage() {
		const w = window.innerWidth;
		perPage = w < 640 ? 1 : w < 1024 ? 2 : 3;
		handleAutoSlide();
	}
	
	let maxPage = $derived(
		Math.max(0, products.length - perPage)
	);
	
	function next() {
		page = page >= maxPage ? 0 : page + 1;
	}
	
	function prev() {
		page = page <= 0 ? maxPage : page - 1;
	}

	function handleAutoSlide() {
		if (autoSlide) clearInterval(autoSlide);

		if (products.length > perPage) {
			autoSlide = setInterval(() => {
				next();
			}, 3500); // Sedikit dinaikkan biar jeda baca card custom lebih dapet
		}
	}
	
	onMount(() => {
		updatePerPage();
		window.addEventListener('resize', updatePerPage);
	
		return () => {
			window.removeEventListener('resize', updatePerPage);
			if (autoSlide) clearInterval(autoSlide);
		};
	});
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
</svelte:head>

<section id="products" class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00C2CB]/5 blur-[120px] pointer-events-none"></div>

	<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
		<div class="space-y-3 max-w-xl text-left">
			<div class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[10px] font-black tracking-widest text-[#0155FF] uppercase">
				<Layers size={12} /> GLOBAL CORE ECOSYSTEM
			</div>
			<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
				Katalog Modul Aplikasi
			</h2>
			<p class="text-sm text-slate-500 font-medium leading-relaxed">
				Gunakan aplikasi instan siap pakai yang kami sediakan, atau rancang bangun ekosistem software kustom Anda sendiri bersama tim engineer kami.
			</p>
		</div>

		<div class="flex items-center gap-2 self-start md:self-end" class:hidden={products.length <= perPage}>
			<button
				class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-[#0155FF] hover:text-[#0155FF] active:scale-95 shadow-sm"
				onclick={prev}
				aria-label="Previous slide"
			>
				<ArrowLeft size={18} />
			</button>
			<button
				class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-[#0155FF] hover:text-[#0155FF] active:scale-95 shadow-sm"
				onclick={next}
				aria-label="Next slide"
			>
				<ArrowRight size={18} />
			</button>
		</div>
	</div>

	<div class="relative z-10 w-full overflow-hidden">
		<div
			class="flex transition-transform duration-700 custom-easing"
			style="transform: translateX(-{page * (100 / perPage)}%)"
		>
			{#each products as p (p.slug)}
				<div
					class="shrink-0 px-3"
					style="width: calc(100% / {perPage})"
				>
					<div
						class="relative group h-full cursor-pointer transition-all duration-300 hover:-translate-y-2"
						onclick={() => openModal(p)}
						onkeydown={(e) => e.key === 'Enter' && openModal(p)}
						role="button"
						tabindex="0"
					>
						<ProductCard {...p} />
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#if selectedProduct}
		<div
			transition:fade={{ duration: 200 }}
			class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 sm:p-6 md:p-10 backdrop-blur-md"
			onclick={closeModal}
			role="button"
			tabindex="-1"
		>
			<div
				transition:fly={{ x: 100, duration: 400 }}
				class="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(15,23,42,0.25)] overflow-hidden border border-slate-100 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
				onclick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
			>
				<button
					class="absolute top-4 right-4 z-50 rounded-xl bg-slate-100 text-slate-500 p-2.5 transition-all hover:bg-slate-900 hover:text-white active:scale-95 shadow-sm"
					onclick={closeModal}
					aria-label="Close modal"
				>
					<X size={18} />
				</button>

				<div class="md:col-span-7 bg-slate-50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 overflow-y-auto min-h-[260px] md:h-full">
					{#if selectedProduct.screenshot}
						<div class="relative bg-white p-2 rounded-2xl shadow-md border border-slate-200/60 w-full">
							<img
								src={selectedProduct.screenshot}
								alt={selectedProduct.title}
								class="h-auto w-full rounded-xl object-contain"
							/>
						</div>
					{:else}
						<div class="flex flex-col items-center justify-center text-slate-400 font-mono text-xs text-center border-2 border-dashed border-slate-200 rounded-3xl w-full aspect-[16/10] bg-white p-8 shadow-sm">
							<div class="h-14 w-14 rounded-2xl bg-blue-50 text-[#0155FF] flex items-center justify-center mb-3 border border-blue-100/60 animate-pulse">
								<Settings2 size={28} class="stroke-[1.5]" />
							</div>
							<p class="font-black text-slate-700 tracking-tight text-sm">TAILORED ENGINE BLUEPRINT</p>
							<p class="text-[10px] text-slate-400 mt-1 max-w-xs leading-normal">Kustomisasi tanpa batas. Tim arsitek sistem kami siap menyusun modul baru terintegrasi sesuai kebutuhan alur kerja inti perusahaan Anda.</p>
						</div>
					{/if}
				</div>

				<div class="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full overflow-y-auto bg-white">
					<div class="space-y-5">
						<div>
							<h3 class="text-2xl font-black text-slate-900 mt-2.5 tracking-tight leading-tight">
								{selectedProduct.title}
							</h3>
						</div>

						<p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
							{selectedProduct.description}
						</p>

						<div class="space-y-3">
							<h4 class="text-xs font-black tracking-wider text-slate-400 uppercase">Fitur Kunci Modul:</h4>
							<ul class="space-y-2.5">
								{#each selectedProduct.features as feature}
									<li class="flex items-start gap-2.5 text-xs text-slate-700 font-semibold">
										<CheckCircle2 size={15} class="text-[#00C2CB] shrink-0 mt-0.5" />
										<span>{feature}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>

					<div class="pt-8 mt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
						<a 
							href="/products/{selectedProduct.slug}" 
							class="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0155FF] to-[#00C2CB] text-white py-3 px-4 font-bold text-xs shadow-md shadow-blue-500/10 hover:opacity-95 transition-all active:scale-95 text-center"
							onclick={closeModal}
						>
							Eksplor Detail Produk <ArrowRight size={14} />
						</a>
						<a 
							href="/#contact" 
							class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 px-4 font-bold text-xs transition-all active:scale-95 text-center"
							onclick={closeModal}
						>
							Tanya Sales
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.custom-easing {
		transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
	}
</style>