<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — AORTA</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
	<p class="text-sm font-black tracking-widest text-[#0155FF] uppercase">{page.status}</p>
	<h1 class="mt-4 text-3xl font-black tracking-tight text-slate-900">
		{page.status === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan'}
	</h1>
	<p class="mt-3 max-w-md text-sm font-medium text-slate-500">
		{page.status === 404
			? 'Halaman yang Anda cari mungkin sudah dipindah atau tidak tersedia.'
			: 'Terjadi kendala saat memuat halaman. Silakan coba lagi.'}
	</p>
	<a
		href="/"
		class="mt-8 inline-flex items-center justify-center rounded-xl bg-[#0155FF] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:opacity-90"
	>
		Kembali ke Beranda
	</a>
</div>
