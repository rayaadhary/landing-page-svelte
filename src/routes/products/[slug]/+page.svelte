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
		BarChart3,
		Users,
		Calendar,
		Plug,
		ShieldCheck,
		ArrowLeft,
		Check,
		Zap,
		Lock,
		Fingerprint,
		Coins,
		Smartphone,
		Percent,
		Barcode,
		Spline,
		ChevronRight,
		ArrowUpRight
	} from 'lucide-svelte';
	import { ICON_MAP, normalizeModule } from '$lib/data/moduleIcons.js';
	import bgMain3 from '$lib/assets/bg_main3.jpg';

	// 1. Props & Reactive Data
	let { data } = $props();
	let product = $derived(data.product);
	let modules = $derived((product.modules ?? []).map(normalizeModule));

	// 2. Icon Mapper (fallback untuk data lama / icon kosong)
	function iconFor(m) {
		const t = m.toLowerCase();

		if (t.includes('pendaftaran')) return ClipboardList;
		if (t.includes('rekam medis') || t.includes('emr') || t.includes('rme')) return FileText;
		if (
			t.includes('lab') ||
			t.includes('laboratorium') ||
			t.includes('radiologi') ||
			t.includes('ris/pacs')
		)
			return Microscope;
		if (t.includes('pelayanan medis') || t.includes('medis') || t.includes('klinis'))
			return Stethoscope;
		if (t.includes('antrean') || t.includes('antrian')) return ListChecks;
		if (t.includes('farmasi') || t.includes('obat')) return Pill;

		if (
			t.includes('absensi') ||
			t.includes('biometrik') ||
			t.includes('gps') ||
			t.includes('presensi')
		)
			return Fingerprint;
		if (t.includes('payroll') || t.includes('gaji') || t.includes('pph 21')) return Coins;
		if (t.includes('shift') || t.includes('jadwal') || t.includes('penjadwalan')) return Calendar;
		if (t.includes('ess app') || t.includes('portal mandiri') || t.includes('karyawan'))
			return Smartphone;
		if (t.includes('performa') || t.includes('staf') || t.includes('sdm')) return Users;

		if (t.includes('kasir') || t.includes('omnichannel') || t.includes('qris')) return Receipt;
		if (
			t.includes('gudang') ||
			t.includes('stok') ||
			t.includes('inventory') ||
			t.includes('logistik')
		)
			return Package;
		if (t.includes('expired') || t.includes('slow-moving')) return Lock;
		if (t.includes('grosir') || t.includes('eceran') || t.includes('harga')) return Percent;
		if (t.includes('printer') || t.includes('scanner') || t.includes('barcode')) return Barcode;

		if (t.includes('laporan') || t.includes('dashboard') || t.includes('keuangan'))
			return BarChart3;
		if (
			t.includes('integrasi api') ||
			t.includes('bridging') ||
			t.includes('satu sehat') ||
			t.includes('bpjs')
		)
			return Plug;
		if (t.includes('role') || t.includes('permission') || t.includes('hak akses'))
			return ShieldCheck;
		if (t.includes('audit') || t.includes('logging')) return Spline;

		return CheckCircle;
	}
</script>

<svelte:head>
	<title>{product.title} — AORTA</title>
	<meta name="description" content="{product.overview} Hubungi AORTA untuk konsultasi dan demo gratis." />
	<link rel="canonical" href="https://aorta.my.id/products/{product.slug}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={product.title} />
	<meta property="og:description" content={product.overview} />
	<meta property="og:url" content="https://aorta.my.id/products/{product.slug}" />
	<meta
		property="og:image"
		content={product.screenshots?.[0]
			? 'https://aorta.my.id' + product.screenshots[0]
			: 'https://aorta.my.id/assets/logo.png'}
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={product.title} />
	<meta name="twitter:description" content={product.overview} />
	<meta
		name="twitter:image"
		content={product.screenshots?.[0]
			? 'https://aorta.my.id' + product.screenshots[0]
			: 'https://aorta.my.id/assets/logo.png'}
	/>
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			"name": product.title,
			"description": product.overview,
			"url": `https://aorta.my.id/products/${product.slug}`,
			"applicationCategory": "BusinessApplication",
			"operatingSystem": "Web",
			"inLanguage": "id-ID",
			"publisher": { "@id": "https://aorta.my.id/#organization" }
		})}
	</script>
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Beranda", item: "https://aorta.my.id/" },
				{ "@type": "ListItem", position: 2, name: "Produk", item: "https://aorta.my.id/#products" },
				{ "@type": "ListItem", position: 3, name: product.title, item: `https://aorta.my.id/products/${product.slug}` }
			]
		})}
	</script>
</svelte:head>

<!-- Gradient Background Subtle -->
<div class="pointer-events-none fixed inset-0 -z-10 bg-slate-50/50">
	<div class="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-full max-w-7xl bg-[radial-gradient(ellipse_at_top,rgba(1,85,255,0.06),transparent_70%)]"></div>
</div>

<main class="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
	<!-- Breadcrumb Minimalis -->
	<nav class="flex items-center gap-2 text-xs text-slate-500 font-medium">
		<a href="/" class="flex items-center gap-1 hover:text-slate-900 transition-colors">
			<ArrowLeft size={14} class="text-slate-400" /> Beranda
		</a>
		<ChevronRight size={12} class="text-slate-300" />
		<a href="/#products" class="hover:text-slate-900 transition-colors">Produk</a>
		<ChevronRight size={12} class="text-slate-300" />
		<span class="text-slate-900 font-semibold">{product.title}</span>
	</nav>

	<!-- Hero Section -->
	<section class="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
		<!-- Main Info -->
		<div class="space-y-6 lg:col-span-6">
			<div class="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-[#0155FF]">
				<span class="h-1.5 w-1.5 rounded-full bg-[#0155FF]"></span>
				{product.category}
			</div>

			<h1 class="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:leading-tight">
				{product.title}
			</h1>

			<p class="text-base leading-relaxed text-slate-600">
				{product.overview}
			</p>

			<div class="flex items-center gap-3 pt-2">
				<a
					href="#pricing"
					class="inline-flex items-center justify-center rounded-lg bg-[#0155FF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-[0.98]"
				>
					Lihat Harga
				</a>
				<a
					href="#modules"
					class="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-[0.98]"
				>
					Eksplor Modul
				</a>
			</div>
		</div>

		<!-- Screenshot Showcase -->
		<div class="lg:col-span-6">
			<div class="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-lg shadow-slate-200/40">
				<div class="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-900">
					{#if product.screenshots && product.screenshots.length > 0}
						<img
							src={product.screenshots[0]}
							alt={product.title}
							loading="lazy"
							decoding="async"
							class="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
						/>
					{:else}
						<div class="flex h-full w-full flex-col items-center justify-center font-mono text-xs text-slate-500">
							<Zap size={20} class="mb-2 text-[#0155FF]" />
							<span>No preview available</span>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Content Prose (Optional) -->
	{#if product.content}
		<section class="mt-20 border-t border-slate-200/60 pt-16">
			<div class="prose max-w-none prose-slate prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-lg prose-p:text-slate-600 prose-a:text-[#0155FF] prose-strong:text-slate-900">
				{@html product.content}
			</div>
		</section>
	{/if}

	<!-- Architecture Modules -->
	<section id="modules" class="mt-24 scroll-mt-12">
		<div class="max-w-2xl space-y-2">
			<h2 class="text-2xl font-semibold tracking-tight text-slate-900">
				Modul Sistem Inti
			</h2>
			<p class="text-sm text-slate-500">
				Seluruh fitur dirancang modular dan terintegrasi untuk mendukung efisiensi operasional.
			</p>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each modules as m}
				{@const IconComponent = m.icon
					? (ICON_MAP[m.icon] ?? iconFor(m.name))
					: iconFor(m.name)}
				<div class="group rounded-xl border border-slate-200/80 bg-white p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-100">
					<div class="flex items-start gap-4">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-700 transition-colors group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-[#0155FF]">
							<IconComponent size={18} />
						</div>
						<div class="space-y-1">
							<h3 class="text-sm font-semibold text-slate-900">
								{m.name}
							</h3>
							<p class="text-xs leading-relaxed text-slate-500">
								Tersinkronisasi otomatis dengan standar enkripsi data dan performa tinggi.
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Investment & Pricing -->
	<section id="pricing" class="mt-24 scroll-mt-12">
		<div class="max-w-2xl space-y-2">
			<h2 class="text-2xl font-semibold tracking-tight text-slate-900">
				Skema Investasi
			</h2>
			<p class="text-sm text-slate-500">
				Pilihan fleksibel yang disesuaikan dengan skala dan kapasitas instansi Anda.
			</p>
		</div>

		<div class="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8">
			{#if product.pricing && product.pricing.length > 0}
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each product.pricing as tier}
						<div class="flex flex-col rounded-xl border border-slate-200 p-6 bg-slate-50/50">
							<p class="text-xs font-bold uppercase tracking-wider text-[#0155FF]">{tier.name}</p>
							<p class="mt-2 text-2xl font-semibold text-slate-900">{tier.price}</p>
							{#if tier.highlights?.length}
								<ul class="mt-6 flex-1 space-y-2.5 text-xs text-slate-600">
									{#each tier.highlights as h}
										<li class="flex items-start gap-2">
											<Check size={14} class="mt-0.5 shrink-0 text-[#0155FF]" />
											<span>{h}</span>
										</li>
									{/each}
								</ul>
							{/if}
							<a
								href="/#get-started"
								class="mt-6 flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50"
							>
								Minta Penawaran
							</a>
						</div>
					{/each}
				</div>
			{:else}
				<div class="grid grid-cols-1 gap-8 items-center lg:grid-cols-12">
					<div class="space-y-4 lg:col-span-7">
						<div class="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0155FF]">
							Tailored Enterprise Solution
						</div>
						<h3 class="text-xl font-semibold text-slate-900">
							Implementasi Sesuai Kebutuhan Spesifik
						</h3>
						<p class="text-xs leading-relaxed text-slate-600">
							Setiap institusi memiliki alur kerja dan regulasi yang unik. Kami menyediakan skema kustom modular agar Anda berinvestasi tepat pada fitur dan kapasitas yang dibutuhkan.
						</p>

						<div class="grid grid-cols-1 gap-2.5 pt-2 text-xs font-medium text-slate-700 sm:grid-cols-2">
							<div class="flex items-center gap-2">
								<Check size={14} class="text-[#0155FF]" />
								<span>SLA Uptime & Support 24/7</span>
							</div>
							<div class="flex items-center gap-2">
								<Check size={14} class="text-[#0155FF]" />
								<span>Integrasi Third-Party API & Payment Gateway</span>
							</div>
							<div class="flex items-center gap-2">
								<Check size={14} class="text-[#0155FF]" />
								<span>Opsi On-Premise / Cloud</span>
							</div>
							<div class="flex items-center gap-2">
								<Check size={14} class="text-[#0155FF]" />
								<span>Pendampingan & Pelatihan Staf</span>
							</div>
						</div>
					</div>

					<div class="rounded-xl border border-slate-900 bg-slate-900 p-6 text-white lg:col-span-5">
						<h4 class="text-base font-semibold text-white">Minta Penawaran Resmi</h4>
						<p class="mt-2 text-xs text-slate-300 leading-relaxed">
							Diskusikan kebutuhan arsitektur sistem bersama Product Consultant kami untuk estimasi biaya.
						</p>
						<a
							href="/#get-started"
							class="mt-6 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0155FF] py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-600"
						>
							Hubungi Tim Sales <ArrowUpRight size={14} />
						</a>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Call to Action Banner -->
	<section class="mt-20">
		<div class="relative overflow-hidden rounded-2xl border border-slate-800 px-6 py-10 sm:px-12">
			<!-- Background Image dengan Gradient Overlay agar Teks Tetap Readabel -->
			<div class="absolute inset-0 -z-10">
				<img
					src={bgMain3}
					alt="Background"
					class="h-full w-full object-cover object-center"
				/>
				<!-- Dark Overlay lembut -->
				<div class="absolute inset-0 z-0 bg-gradient-to-t from-slate-950/90 via-slate-900/75 to-slate-900/60"></div>
			</div>

			<!-- Content -->
			<div class="relative z-10 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
				<div class="space-y-1">
					<h2 class="text-xl font-semibold text-white">
						Siap mentransformasi alur kerja Anda?
					</h2>
					<p class="text-xs text-slate-300">
						Jadwalkan uji coba sistem bersama tim engineer teknis kami.
					</p>
				</div>
				<div class="mt-6 flex flex-col gap-2.5 sm:mt-0 sm:flex-row">
					<a
						href="/#get-started"
						class="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 transition-all hover:bg-slate-100 active:scale-[0.98]"
					>
						Request Uji Coba Demo
					</a>
				</div>
			</div>
		</div>
	</section>
</main>