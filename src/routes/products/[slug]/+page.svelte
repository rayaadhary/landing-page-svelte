<script>
	import {
		CheckCircle,
		ClipboardList,
		FileText,
		Microscope,
		Stethoscope,
		ListChecks,
		Pill,
		Package,
		Receipt,
		Printer,
		Scan,
		BarChart3,
		Users,
		Calendar,
		Plug,
		ShieldCheck
	} from 'lucide-svelte';
	export let data;
	const { product } = data;
	function iconFor(m) {
		const t = m.toLowerCase();
		if (t.includes('pendaftaran')) return ClipboardList;
		if (t.includes('rekam medis') || t.includes('emr')) return FileText;
		if (t.includes('lab') || t.includes('laboratorium') || t.includes('radiologi')) return Microscope;
		if (t.includes('pelayanan medis') || t.includes('medis')) return Stethoscope;
		if (t.includes('antrean') || t.includes('antrian')) return ListChecks;
		if (t.includes('farmasi')) return Pill;
		if (t.includes('gudang') || t.includes('stok') || t.includes('inventory') || t.includes('varian')) return Package;
		if (t.includes('kasir')) return Receipt;
		if (t.includes('billing') || t.includes('klaim')) return Receipt;
		if (t.includes('laporan')) return BarChart3;
		if (t.includes('sdm') || t.includes('manajemen') || t.includes('membership')) return Users;
		if (t.includes('printer')) return Printer;
		if (t.includes('scanner')) return Scan;
		if (t.includes('janji') || t.includes('notifikasi')) return Calendar;
		if (t.includes('integrasi api')) return Plug;
		if (t.includes('role') || t.includes('permission')) return ShieldCheck;
		if (t.includes('audit') || t.includes('logging')) return FileText;
		if (t.includes('dashboard')) return BarChart3;
		if (t.includes('integrasi bpjs') || t.includes('satu sehat')) return Plug;
		return CheckCircle;
	}
</script>

<svelte:head>
	<title>{product.title} — Detail Produk</title>
	<meta name="description" content={product.overview} />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
	<div class="flex items-center gap-2 text-sm text-neutral-600">
		<a href="/" class="hover:text-neutral-900">Beranda</a>
		<span>/</span>
		<a href="/#products" class="hover:text-neutral-900">Produk</a>
		<span>/</span>
		<span class="text-neutral-900">{product.title}</span>
	</div>
	<div class="mt-6">
		<div class="text-xs uppercase tracking-wide text-neutral-500">{product.category}</div>
		<h1 class="mt-1 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">{product.title}</h1>
		<p class="mt-3 max-w-3xl text-neutral-600">{product.overview}</p>
	</div>
	<div class="mt-8 rounded-2xl bg-neutral-100 p-4">
		<div class="h-full w-full flex items-center justify-center text-neutral-500 text-sm">
			<img src={product.screenshots[0]} alt={product.title} class="rounded-2xl object-cover w-full h-full" />
		</div>
	</div>
</section>


<section id="modules" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
	<h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">Modul yang Didapat</h2>
	<div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each product.modules as m}
			<div class="rounded-xl ring-1 ring-neutral-200 bg-white p-5">
				<div class="flex items-start gap-3">
					<div class="h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-100">
						<svelte:component this={iconFor(m)} size={18} class="text-neutral-700" />
					</div>
					<div>
						<div class="text-neutral-900 font-medium">{m}</div>
						<div class="mt-1 text-sm text-neutral-600">Keterangan modul tersedia sesuai paket.</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<section id="pricing" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
	<h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">Harga</h2>
	<p class="mt-2 text-neutral-600">Pilih paket sesuai kebutuhan. Harga detail dapat disesuaikan.</p>
	<div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
		{#each product.pricing as tier}
			<div class="rounded-2xl ring-1 ring-neutral-200 bg-white p-6 flex flex-col">
				<div class="text-neutral-900 font-medium text-lg">{tier.name}</div>
				<div class="mt-1 text-neutral-600 text-sm">{tier.price}</div>
				<ul class="mt-4 grid gap-2 text-sm text-neutral-700">
					{#each tier.highlights as h}
						<li class="flex items-start gap-2">
							<span class="inline-block h-1.5 w-1.5 rounded-full bg-neutral-400 mt-1"></span>
							<span>{h}</span>
						</li>
					{/each}
				</ul>
				<div class="mt-6">
					<a href="/#contact" class="inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-white text-sm">Hubungi Sales</a>
				</div>
			</div>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
	<div class="rounded-2xl bg-neutral-950 px-8 py-10 sm:px-10">
		<div class="flex flex-col lg:flex-row items-center justify-between gap-6">
			<div class="text-white">
				<div class="text-2xl sm:text-3xl font-semibold tracking-tight">Butuh demo langsung?</div>
				<div class="mt-2 text-neutral-300">Jadwalkan demo untuk melihat alur lengkap sesuai kebutuhan Anda.</div>
			</div>
			<div class="flex items-center gap-4">
				<a href="/#contact" class="inline-flex items-center rounded-md bg-white px-5 py-3 text-neutral-900 text-sm">Request Demo</a>
				<a href="/#signup" class="inline-flex items-center rounded-md ring-1 ring-inset ring-white/20 px-5 py-3 text-white text-sm">Mulai Gratis</a>
			</div>
		</div>
	</div>
</section>
