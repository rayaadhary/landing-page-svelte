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
		Spline
	} from 'lucide-svelte';

	// 1. Tangkap props data bawaan SvelteKit
	let { data } = $props();

	// 2. Variabel product otomatis reaktif memantau perubahan data lewat $derived
	let product = $derived(data.product);

	function iconFor(m) {
		const t = m.toLowerCase();

		// Domain Healthcare (SIMRS / Klinik)
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

		// Domain HRIS (Human Resource)
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

		// Domain POS & Inventory (Commerce)
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

		// Infrastructure / Common Modules
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
	<title>{product.title} | AORTA — Solusi Sistem Informasi {product.category}</title>
	<meta
		name="description"
		content="{product.overview} Hubungi AORTA untuk konsultasi dan demo gratis."
	/>
	<link rel="canonical" href="https://aorta.my.id/products/{product.slug}" />
</svelte:head>

<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-slate-50/50">
	<div
		class="absolute top-[5%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-gradient-to-br from-[#00C2CB]/5 to-transparent blur-[120px]"
	></div>
	<div
		class="absolute top-[40%] left-[-10%] h-[50vh] w-[60vw] rounded-full bg-gradient-to-tr from-[#0155FF]/5 to-transparent blur-[150px]"
	></div>
</div>

<section class="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
	<div
		class="flex w-fit items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-1.5 text-xs font-semibold text-slate-500 shadow-sm"
	>
		<a href="/" class="flex items-center gap-1 transition-colors hover:text-[#0155FF]">
			<ArrowLeft size={12} /> Beranda
		</a>
		<span class="text-slate-300">/</span>
		<a href="/#products" class="transition-colors hover:text-[#0155FF]">Produk</a>
		<span class="text-slate-300">/</span>
		<span class="font-bold text-slate-800">{product.title}</span>
	</div>

	<div class="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
		<div class="space-y-4 lg:col-span-5">
			<span
				class="inline-block rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-black tracking-[0.2em] text-[#0155FF] uppercase"
			>
				{product.category}
			</span>
			<h1 class="text-4xl leading-tight font-black tracking-tight text-slate-900 sm:text-5xl">
				{product.title}
			</h1>
			<p class="pt-2 text-base leading-relaxed font-medium text-slate-600">
				{product.overview}
			</p>
			<div class="flex items-center gap-4 pt-4">
				<a
					href="#pricing"
					class="rounded-xl bg-[#0155FF] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:opacity-90 active:scale-95"
				>
					Lihat Skema Harga
				</a>
				<a
					href="#modules"
					class="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:border-[#0155FF]"
				>
					Eksplor Modul
				</a>
			</div>
		</div>

		<div class="lg:col-span-7">
			<div
				class="relative rounded-[2.5rem] border border-white/80 bg-white/60 p-3 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-4"
			>
				<div
					class="group relative aspect-[16/10] overflow-hidden rounded-[1.8rem] border border-slate-900 bg-slate-950 shadow-inner"
				>
					<div
						class="absolute inset-x-0 top-0 z-10 flex h-10 items-center justify-between border-b border-slate-800/50 bg-slate-900/90 px-4 backdrop-blur-md"
					>
						<div class="flex items-center gap-1.5">
							<span class="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-green-500/80"></span>
						</div>
						<span class="font-mono text-[10px] tracking-wider text-slate-500"
							>{product.slug}_interface_v4.png</span
						>
						<div class="w-10"></div>
					</div>

					{#if product.screenshots && product.screenshots.length > 0}
						<img
							src={product.screenshots[0]}
							alt={product.title}
							loading="lazy"
							decoding="async"
							class="h-full w-full object-cover pt-10 transition-transform duration-700 group-hover:scale-[1.02]"
						/>
					{:else}
						<div
							class="flex h-full w-full flex-col items-center justify-center pt-10 font-mono text-xs text-slate-500"
						>
							<Zap size={24} class="mb-2 animate-pulse text-[#00C2CB]" />
							NO PREVIEW AVAILABLE
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<section id="modules" class="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto mb-12 max-w-2xl space-y-2 text-center">
		<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
			Architecture Modules
		</h2>
		<p class="text-sm font-medium text-slate-500">
			Seluruh ekosistem fitur inti terintegrasi tanpa putus, siap mendongkrak performa manajemen
			institusi Anda.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each product.modules as m}
			<div
				class="group rounded-2xl border border-slate-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0155FF]/40 hover:shadow-[0_20px_40px_-15px_rgba(1,85,255,0.05)]"
			>
				<div class="flex flex-col gap-4">
					<div
						class="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 shadow-sm transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-[#0155FF] group-hover:to-[#00C2CB]"
					>
						<svelte:component
							this={iconFor(m)}
							size={20}
							class="text-slate-700 transition-colors duration-300 group-hover:text-white"
						/>
					</div>
					<div>
						<h3
							class="text-base font-bold text-slate-900 transition-colors group-hover:text-[#0155FF]"
						>
							{m}
						</h3>
						<p class="mt-1.5 text-xs leading-relaxed text-slate-500">
							Modul tersinkronisasi otomatis dengan enkripsi database berlapis dan dukungan bridging
							sistem eksternal.
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<section
	id="pricing"
	class="mx-auto max-w-5xl scroll-mt-24 border-t border-slate-200/60 px-4 py-16 sm:px-6 lg:px-8"
>
	<div class="mx-auto mb-12 max-w-2xl space-y-2 text-center">
		<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
			Skema Investasi & Kemitraan
		</h2>
		<p class="text-sm font-medium text-slate-500">
			Sistem modular yang fleksibel, disesuaikan sepenuhnya dengan skala operasional dan regulasi
			institusi Anda.
		</p>
	</div>

	<div
		class="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.04)] sm:p-12"
	>
		<div
			class="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#0155FF]/10 to-[#00C2CB]/10 blur-2xl"
		></div>

		<div class="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
			<div class="space-y-5 text-left lg:col-span-7">
				<div
					class="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black tracking-widest text-[#0155FF] uppercase"
				>
					Tailored Enterprise Solution
				</div>
				<h3 class="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
					Implementasi Sesuai Kebutuhan Spesifik
				</h3>
				<p class="text-sm leading-relaxed font-medium text-slate-500">
					Kami memahami bahwa setiap institusi memiliki standarisasi alur kerja, volume pengguna,
					dan kebutuhan infrastruktur yang berbeda. Layanan kami bersifat modular—Anda hanya
					berinvestasi pada fitur dan kapasitas yang benar-benar digunakan.
				</p>

				<div class="grid grid-cols-1 gap-3 pt-2 text-xs font-bold text-slate-600 sm:grid-cols-2">
					<div class="flex items-center gap-2.5">
						<div
							class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#0155FF]"
						>
							<Check size={12} strokeWidth={3} />
						</div>
						<span>SLA Uptime & Support 24/7</span>
					</div>
					<div class="flex items-center gap-2.5">
						<div
							class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#0155FF]"
						>
							<Check size={12} strokeWidth={3} />
						</div>
						<span>Kepatuhan Regulasi Kemenkes/BPJS</span>
					</div>
					<div class="flex items-center gap-2.5">
						<div
							class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#0155FF]"
						>
							<Check size={12} strokeWidth={3} />
						</div>
						<span>Opsi On-Premise / Hybrid Cloud</span>
					</div>
					<div class="flex items-center gap-2.5">
						<div
							class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#015FF]"
						>
							<Check size={12} strokeWidth={3} />
						</div>
						<span>Pelatihan Staf & Maintenance Full</span>
					</div>
				</div>
			</div>

			<div
				class="flex flex-col justify-between rounded-3xl border border-slate-900 bg-slate-950 p-6 text-center text-white shadow-xl sm:p-8 lg:col-span-5 lg:text-left"
			>
				<div class="space-y-2">
					<p class="text-[10px] font-black tracking-widest text-[#00C2CB] uppercase">
						Informasi Lebih Lanjut
					</p>
					<h4 class="text-xl font-black tracking-tight text-white">Minta Penawaran Resmi</h4>
					<p class="pt-1 text-xs leading-relaxed font-medium text-slate-400">
						Diskusikan arsitektur sistem yang Anda butuhkan bersama Technical Product Consultant
						kami untuk mendapatkan rincian biaya penawaran (Quotation).
					</p>
				</div>

				<div class="mt-8 space-y-3">
					<a
						href="/#contact"
						class="flex w-full items-center justify-center rounded-xl bg-[#0155FF] py-3.5 text-center text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:opacity-90 active:scale-95"
					>
						Hubungi Sales Executive
					</a>
					<p class="text-center text-[10px] leading-normal font-semibold text-slate-500">
						Atau jadwalkan Zoom Technical Meeting via WhatsApp.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div
		class="relative overflow-hidden rounded-[2.5rem] border border-slate-900 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 px-8 py-12 shadow-2xl sm:px-12"
	>
		<div
			class="pointer-events-none absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-[#00C2CB]/10 blur-3xl"
		></div>
		<div
			class="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-[#0155FF]/10 blur-3xl"
		></div>

		<div class="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
			<div class="max-w-xl space-y-3 text-center lg:text-left">
				<span class="block text-[10px] font-black tracking-[0.2em] text-[#00C2CB] uppercase"
					>LIVE DEMO TESTING</span
				>
				<h2 class="text-3xl leading-tight font-black tracking-tight text-white sm:text-4xl">
					Siap mentransformasi alur kerja instansi Anda?
				</h2>
				<p class="text-sm font-medium text-slate-400">
					Jadwalkan uji coba live-system gratis bersama tim technical engineer kami sekarang juga.
				</p>
			</div>

			<div class="flex w-full shrink-0 flex-wrap items-center justify-center gap-4 sm:w-auto">
				<a
					href="/#contact"
					class="inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-4 text-center text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-slate-50 active:scale-98 sm:w-auto"
				>
					Request Demo Langsung
				</a>
				<a
					href="/#signup"
					class="inline-flex w-full items-center justify-center rounded-xl bg-white/5 px-6 py-4 text-center text-sm font-bold text-white ring-1 ring-white/20 backdrop-blur-sm transition-all ring-inset hover:bg-white/10 active:scale-98 sm:w-auto"
				>
					Coba Akses Gratis
				</a>
			</div>
		</div>
	</div>
</section>
