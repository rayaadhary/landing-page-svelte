<script>
	import { onMount } from 'svelte';
	import ProductCard from './ProductCard.svelte';
	const products = [
		{
			slug: 'simrs',
			title: 'SIMRS',
			category: 'Healthcare',
			description: 'Sistem Informasi Manajemen Rumah Sakit untuk operasional terpadu.',
			features: ['Pendaftaran & EMR', 'Farmasi & Gudang', 'Billing & klaim BPJS', 'Laporan regulasi'],
			screenshot: '/assets/sim-klinik-login.png'
		},
		{
			slug: 'sim-klinik',
			title: 'SIM Klinik',
			category: 'Healthcare',
			description: 'Manajemen klinik end-to-end untuk praktik, cabang, dan jaringan.',
			features: ['Pendaftaran pasien', 'Kasir & inventory', 'Rekam medis', 'Janji temu & notifikasi'],
			screenshot: '/assets/sim-klinik-login.png'
		},
		{
			slug: 'pos',
			title: 'POS',
			category: 'Retail',
			description: 'Point of Sale modern untuk toko, restoran, dan gerai.',
			features: ['Kasir cepat', 'Stok & varian', 'Diskon & membership', 'Laporan penjualan'],
			screenshot: '/assets/pos-login.png'
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
	let page = 0;
	let perPage = 3;
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
	$: totalPages = Math.ceil(products.length / perPage);
</script>

<section id="products" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
	<div class="text-center">
		<h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">Produk Kami</h2>
		<p class="mt-3 text-neutral-600">SIMRS, Klinik, POS, dan sistem kustom untuk berbagai industri.</p>
	</div>
	<div class="mt-10 relative">
		<div class="overflow-hidden">
			<div class="flex transition-transform duration-500 ease-out" style={`transform: translateX(-${page * 100}%)`}>
				{#each products as p}
					<div class="min-w-full sm:min-w-1/2 lg:min-w-1/3 px-2">
						<ProductCard {...p} />
					</div>
				{/each}
			</div>
		</div>
		<div class="mt-6 flex justify-center gap-4">
			<button class="inline-flex items-center rounded-md ring-1 ring-neutral-300 px-3 py-2 text-sm" on:click={prev}>
				Sebelumnya
			</button>
			<button class="inline-flex items-center rounded-md ring-1 ring-neutral-300 px-3 py-2 text-sm" on:click={next}>
				Selanjutnya
			</button>
		</div>
		<div class="mt-4 flex justify-center gap-2">
			{#each Array(totalPages) as _, i}
				<button
					class="h-2.5 w-2.5 rounded-full ring-1 ring-neutral-300"
					class:opacity-100={page === i}
					class:opacity-50={page !== i}
					on:click={() => (page = i)}
					aria-label="Go to page"
				/>
			{/each}
		</div>
	</div>
</section>
