<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { ArrowRight, ArrowLeft, CheckCircle2, Layout, Layers, X, Eye } from 'lucide-svelte';
	import ProductCard from './ProductCard.svelte';

	let selectedProduct = $state(null);
	let page = $state(0);
	let perPage = $state(3);
	
	function openModal(product) {
		selectedProduct = product;
	}

	function closeModal() {
		selectedProduct = null;
	}

	const products = [
		{
			slug: 'simrs',
			title: 'SIMRS Core Enterprise',
			// category: 'Healthcare System',
			description: 'Sistem Informasi Manajemen Rumah Sakit untuk digitalisasi operasional medis, bridging SatuSehat, dan klaim BPJS terpadu.',
			features: [
				'Pendaftaran & EMR (SatuSehat Ready)',
				'Farmasi, Apotek & Gudang Farmasi',
				'Billing System & Auto-Klaim BPJS',
				'Laporan Regulasi & Kemenkes otomatis'
			],
			screenshot: '/assets/hospital2.png'
		},
		{
			slug: 'sim-klinik',
			title: 'SIM Klinik Pratama & Utama',
			// category: 'Healthcare System',
			description: 'Manajemen klinik modern multi-cabang end-to-end untuk menyederhanakan antrean, rekam medis elektronik, dan kasir.',
			features: [
				'Pendaftaran pasien & Antrean Mandiri',
				'Kasir POS, Billing & Live Inventory',
				'Rekam Medis Elektronik (RME) ringkas',
				'Janji Temu Online & Notifikasi WhatsApp'
			],
			screenshot: '/assets/clinic2.png'
		},
		{
			slug: 'hris',
			title: 'HRIS',
			// category: 'Healthcare System',
			description: 'Sistem manajemen SDM cerdas yang dirancang khusus untuk memetakan shift dinamis dokter, perawat, dan staf medis.',
			features: [
				'Manajemen Shift Komplex & Jadwal Medis', 
				'Presensi Online Anti-Fake GPS & Biometrik', 
				'Payroll Otomatis (Insentif, Lembur, Potongan)', 
				'Pengajuan Cuti, Tukar Shift & Lembur App'
			],
			screenshot: '/assets/hris.png'
		},
		// {
		// 	slug: 'invitation-digital',
		// 	title: 'Premium Digital Invitation',
		// 	category: 'Event Platform',
		// 	description: 'Platform undangan digital interaktif kelas premium dengan animasi super smooth, RSVP real-time, dan kustomisasi tanpa batas.',
		// 	features: ['Desain Kustom Eksklusif & Elegan', 'Manajemen Buku Tamu & RSVP Kontrol', 'Praktis, Instan & High Performance Layout'],
		// 	screenshot: '/assets/invitation.png'
		// },
		// {
		// 	slug: 'custom',
		// 	title: 'Create Your Own System',
		// 	category: 'Custom Architecture',
		// 	description: 'Bangun platform berskala enterprise yang dirancang khusus sesuai dengan blueprint logika bisnis unik institusi Anda.',
		// 	features: ['Arsitektur Modular & Highly Scalable', 'Integrasi API Publik & Eksternal Gate', 'Role & Advanced Permission Level Security', 'Rapid Deployment & Cloud Infrastructure'],
		// 	screenshot: ''
		// }
	];

	function updatePerPage() {
		const w = window.innerWidth;
		perPage = w < 640 ? 1 : w < 1024 ? 2 : 3;
		// Batasi halaman aktif agar tidak melebihi indeks maks baru
		if (page > maxPage) page = maxPage;
	}

	let maxPage = $derived(Math.max(0, products.length - perPage));

	function next() {
		page = page >= maxPage ? 0 : page + 1;
	}

	function prev() {
		page = page <= 0 ? maxPage : page - 1;
	}

	onMount(() => {
		updatePerPage();
		window.addEventListener('resize', updatePerPage);
		return () => window.removeEventListener('resize', updatePerPage);
	});
</script>

<section id="products" class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00C2CB]/5 blur-[120px] pointer-events-none"></div>

	<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
		<div class="space-y-3 max-w-xl text-left">
			<div class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[10px] font-black tracking-widest text-[#0155FF] uppercase">
				<Layers size={12} /> AORTA PRODUCT SUITE
			</div>
			<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
				Produk Digital Unggulan
			</h2>
			<p class="text-sm text-slate-500 font-medium leading-relaxed">
				Sistem manajemen fasilitas kesehatan pintar, aplikasi HRIS, hingga platform kustom enterprise siap pakai.
			</p>
		</div>

		<div class="flex items-center gap-2 self-start md:self-end">
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

	<div class="relative z-10">
		<div class="overflow-visible">
			<div
				class="flex transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
				style="transform: translateX(-{page * (100 / perPage)}%);"
			>
				{#each products as p}
					<div
						class="px-3 shrink-0"
						style="width: {100 / perPage}%;"
					>
						<div 
							class="relative group cursor-pointer h-full"
							onclick={() => openModal(p)}
							onkeydown={(e) => e.key === 'Enter' && openModal(p)}
							role="button"
							tabindex="0"
						>
							<ProductCard {...p} />
							
							<div class="absolute top-4 right-4 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-20">
								<div class="flex items-center gap-1.5 rounded-lg bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-1.5 backdrop-blur-sm shadow-md">
									<Eye size={12} /> Quick View
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-10 flex justify-center gap-2">
			{#each Array(maxPage + 1) as _, i}
				<button
					class="h-1.5 rounded-full transition-all duration-300 {page === i ? 'w-6 bg-gradient-to-r from-[#0155FF] to-[#00C2CB]' : 'w-1.5 bg-slate-200'}"
					onclick={() => (page = i)}
					aria-label="Go to page {i + 1}"
				/>
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
				transition:fly={{ y: 30, duration: 400, easing: cubicOut }}
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
						<div class="flex flex-col items-center justify-center text-slate-400 font-mono text-xs text-center border-2 border-dashed border-slate-200 rounded-2xl w-full aspect-[16/10] bg-white p-8">
							<Layout size={32} class="text-[#00C2CB] mb-2 stroke-[1.5]" />
							<p class="font-bold text-slate-600">LIVE SCREENSHOT NOT FOUND</p>
							<p class="text-[10px] text-slate-400 mt-1">Sistem sedang di-deploy di lingkungan staging.</p>
						</div>
					{/if}
				</div>

				<div class="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full overflow-y-auto bg-white">
					<div class="space-y-5">
						<div>
							<!-- <span class="text-[9px] font-black tracking-widest text-[#0155FF] bg-blue-50 px-2 py-1 rounded border border-blue-100 uppercase">
								{selectedProduct.category}
							</span> -->
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