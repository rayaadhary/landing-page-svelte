<script>
	import { onMount } from 'svelte';
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
			title: 'SIMRS',
			category: 'Healthcare',
			description: 'Sistem Informasi Manajemen Rumah Sakit untuk operasional terpadu.',
			features: [
				'Pendaftaran & EMR',
				'Farmasi & Gudang',
				'Billing & klaim BPJS',
				'Laporan regulasi'
			],
			screenshot: '/assets/hospital2.png'
		},
		{
			slug: 'sim-klinik',
			title: 'SIM Klinik',
			category: 'Healthcare',
			description: 'Manajemen klinik end-to-end untuk praktik, cabang, dan jaringan.',
			features: [
				'Pendaftaran pasien',
				'Kasir & inventory',
				'Rekam medis',
				'Janji temu & notifikasi'
			],
			screenshot: '/assets/clinic2.png'
		},
		{
            slug: 'hris',
            title: 'HRIS SITEMEDIKA',
            category: 'Healthcare',
            description: 'Sistem manajemen SDM terintegrasi untuk efisiensi administrasi personel medis dan staf.',
            features: [
                'Manajemen Shift & Jadwal Medis', 
                'Presensi Online & GPS', 
                'Payroll', 
                'Pengajuan Cuti & Lembur'
            ],
            screenshot: '/assets/hris.png'
        },
		{
			slug: 'invitation-digital',
			title: 'Invitation Digital',
			category: 'Event',
			description: 'Platform untuk mengirim undangan digital kepada tamu.',
			features: ['Desain kustom', 'Terjangkau', 'Praktis'],
			screenshot: '/assets/invitation.png'
		},
		{
			slug: 'custom',
			title: 'Create Your Own System',
			category: 'Custom',
			description: 'Bangun sistem sesuai kebutuhan bisnis Anda dengan modul siap pakai.',
			features: ['Modular & scalable', 'Integrasi API', 'Role & permission', 'Deploy cepat'],
			screenshot: ''
		}
	];
	// let page = 0;
	// let perPage = 3;
	function updatePerPage() {
		const w = window.innerWidth;
		perPage = w < 640 ? 1 : w < 1024 ? 2 : 3;
		const tp = Math.ceil(products.length / perPage);
		page = Math.min(page, tp - 1);
	}
	function next() {
		const tp = Math.ceil(products.length / perPage);
		page = (page + 1) % tp;
	}
	function prev() {
		const tp = Math.ceil(products.length / perPage);
		page = (page - 1 + tp) % tp;
	}
	onMount(() => {
		updatePerPage();
		window.addEventListener('resize', updatePerPage);
		return () => window.removeEventListener('resize', updatePerPage);
	});
	// $: totalPages = Math.ceil(products.length / perPage);
	let totalPages = $derived(Math.ceil(products.length / perPage));
</script>

<section id="products" class="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
	<div class="text-center">
		<h2 class="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Produk Kami</h2>
		<p class="mt-3 text-neutral-600">
			SIMRS, Klinik, POS, dan sistem kustom untuk berbagai industri.
		</p>
	</div>
	<div class="relative mt-10">
		<div class="overflow-hidden">
			<div
				class="flex transition-transform duration-500 ease-out"
				style={`transform: translateX(-${page * 100}%)`}
			>
				{#each products as p}
					<div
						class="min-w-full cursor-pointer px-2 sm:min-w-1/2 lg:min-w-1/3"
						onclick={() => openModal(p)}
					>
						<ProductCard {...p} />
					</div>
				{/each}
			</div>
		</div>
		<div class="mt-6 flex justify-center gap-4">
			<button
				class="inline-flex items-center rounded-md px-3 py-2 text-sm ring-1 ring-neutral-300"
				onclick={prev}
			>
				Sebelumnya
			</button>
			<button
				class="inline-flex items-center rounded-md px-3 py-2 text-sm ring-1 ring-neutral-300"
				onclick={next}
			>
				Selanjutnya
			</button>
		</div>
		<div class="mt-4 flex justify-center gap-2">
			{#each Array(totalPages) as _, i}
				<button
					class="h-2.5 w-2.5 rounded-full ring-1 ring-neutral-300"
					class:opacity-100={page === i}
					class:opacity-50={page !== i}
					onclick={() => (page = i)}
					aria-label="Go to page"
				/>
			{/each}
		</div>
		{#if selectedProduct}
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
				onclick={closeModal}
				role="button"
				tabindex="-1"
			>
				<div class="relative w-full max-w-5xl" onclick={(e) => e.stopPropagation()}>
					<button
						class="absolute top-2 right-2 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/70"
						onclick={closeModal}
						aria-label="Close modal"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					{#if selectedProduct.screenshot}
						<img
							src={selectedProduct.screenshot}
							alt={selectedProduct.title}
							class="h-auto w-full rounded-xl shadow-2xl ring-1 ring-white/20"
						/>
					{:else}
						<div
							class="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-white/30 bg-neutral-900 text-white"
						>
							<p>Preview Gambar Tidak Tersedia</p>
						</div>
					{/if}

					<p class="mt-4 text-center text-sm font-medium text-white/60">
						{selectedProduct.title}
					</p>
				</div>
			</div>
		{/if}
	</div>
</section>
