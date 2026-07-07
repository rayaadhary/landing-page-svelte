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
		if (t.includes('lab') || t.includes('laboratorium') || t.includes('radiologi') || t.includes('ris/pacs')) return Microscope;
		if (t.includes('pelayanan medis') || t.includes('medis') || t.includes('klinis')) return Stethoscope;
		if (t.includes('antrean') || t.includes('antrian')) return ListChecks;
		if (t.includes('farmasi') || t.includes('obat')) return Pill;
		
		// Domain HRIS (Human Resource)
		if (t.includes('absensi') || t.includes('biometrik') || t.includes('gps') || t.includes('presensi')) return Fingerprint;
		if (t.includes('payroll') || t.includes('gaji') || t.includes('pph 21')) return Coins;
		if (t.includes('shift') || t.includes('jadwal') || t.includes('penjadwalan')) return Calendar;
		if (t.includes('ess app') || t.includes('portal mandiri') || t.includes('karyawan')) return Smartphone;
		if (t.includes('performa') || t.includes('staf') || t.includes('sdm')) return Users;
		
		// Domain POS & Inventory (Commerce)
		if (t.includes('kasir') || t.includes('omnichannel') || t.includes('qris')) return Receipt;
		if (t.includes('gudang') || t.includes('stok') || t.includes('inventory') || t.includes('logistik')) return Package;
		if (t.includes('expired') || t.includes('slow-moving')) return Lock;
		if (t.includes('grosir') || t.includes('eceran') || t.includes('harga')) return Percent;
		if (t.includes('printer') || t.includes('scanner') || t.includes('barcode')) return Barcode;
		
		// Infrastructure / Common Modules
		if (t.includes('laporan') || t.includes('dashboard') || t.includes('keuangan')) return BarChart3;
		if (t.includes('integrasi api') || t.includes('bridging') || t.includes('satu sehat') || t.includes('bpjs')) return Plug;
		if (t.includes('role') || t.includes('permission') || t.includes('hak akses')) return ShieldCheck;
		if (t.includes('audit') || t.includes('logging')) return Spline;
		
		return CheckCircle;
	}
</script>

<svelte:head>
	<title>{product.title} — Detail Produk Premium</title>
	<meta name="description" content={product.overview} />
</svelte:head>

<div class="absolute inset-0 pointer-events-none overflow-hidden -z-10 bg-slate-50/50">
	<div class="absolute top-[5%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-gradient-to-br from-[#00C2CB]/5 to-transparent blur-[120px]"></div>
	<div class="absolute top-[40%] left-[-10%] w-[60vw] h-[50vh] rounded-full bg-gradient-to-tr from-[#0155FF]/5 to-transparent blur-[150px]"></div>
</div>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
	<div class="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-100 rounded-full py-1.5 px-4 w-fit shadow-sm">
		<a href="/" class="hover:text-[#0155FF] transition-colors flex items-center gap-1">
			<ArrowLeft size={12} /> Beranda
		</a>
		<span class="text-slate-300">/</span>
		<a href="/#products" class="hover:text-[#0155FF] transition-colors">Produk</a>
		<span class="text-slate-300">/</span>
		<span class="text-slate-800 font-bold">{product.title}</span>
	</div>

	<div class="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
		<div class="lg:col-span-5 space-y-4">
			<span class="inline-block text-[10px] font-black tracking-[0.2em] uppercase text-[#0155FF] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
				{product.category}
			</span>
			<h1 class="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
				{product.title}
			</h1>
			<p class="text-base text-slate-600 leading-relaxed font-medium pt-2">
				{product.overview}
			</p>
			<div class="flex items-center gap-4 pt-4">
				<a href="#pricing" class="bg-gradient-to-r from-[#0155FF] to-[#00C2CB] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-500/10 hover:opacity-95 transition-all active:scale-95">
					Lihat Skema Harga
				</a>
				<a href="#modules" class="border border-slate-200 bg-white hover:border-[#0155FF] text-slate-700 font-bold px-6 py-3 rounded-xl text-sm transition-all">
					Eksplor Modul
				</a>
			</div>
		</div>

		<div class="lg:col-span-7">
			<div class="relative bg-white/60 backdrop-blur-xl p-3 sm:p-4 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(15,23,42,0.06)] border border-white/80">
				<div class="bg-slate-950 rounded-[1.8rem] overflow-hidden aspect-[16/10] shadow-inner relative group border border-slate-900">
					<div class="absolute top-0 inset-x-0 h-10 bg-slate-900/90 backdrop-blur-md flex items-center px-4 justify-between border-b border-slate-800/50 z-10">
						<div class="flex items-center gap-1.5">
							<span class="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-green-500/80"></span>
						</div>
						<span class="text-[10px] font-mono text-slate-500 tracking-wider">{product.slug}_interface_v4.png</span>
						<div class="w-10"></div>
					</div>
					
					{#if product.screenshots && product.screenshots.length > 0}
						<img 
							src={product.screenshots[0]} 
							alt={product.title} 
							loading="lazy"
							decoding="async"
							class="w-full h-full object-cover pt-10 transition-transform duration-700 group-hover:scale-[1.02]" 
						/>
					{:else}
						<div class="w-full h-full flex flex-col items-center justify-center pt-10 text-slate-500 text-xs font-mono">
							<Zap size={24} class="text-[#00C2CB] animate-pulse mb-2" />
							NO PREVIEW AVAILABLE
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<section id="modules" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
	<div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
		<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Architecture Modules</h2>
		<p class="text-sm text-slate-500 font-medium">Seluruh ekosistem fitur inti terintegrasi tanpa putus, siap mendongkrak performa manajemen institusi Anda.</p>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
		{#each product.modules as m}
			<div class="group rounded-2xl border border-slate-200/70 bg-white p-6 transition-all duration-300 hover:border-[#0155FF]/40 hover:shadow-[0_20px_40px_-15px_rgba(1,85,255,0.05)] hover:-translate-y-1">
				<div class="flex flex-col gap-4">
					<div class="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 group-hover:bg-gradient-to-br group-hover:from-[#0155FF] group-hover:to-[#00C2CB] transition-all duration-300 shadow-sm border border-slate-100 group-hover:border-transparent">
						<svelte:component this={iconFor(m)} size={20} class="text-slate-700 group-hover:text-white transition-colors duration-300" />
					</div>
					<div>
						<h3 class="text-slate-900 font-bold text-base group-hover:text-[#0155FF] transition-colors">{m}</h3>
						<p class="mt-1.5 text-xs text-slate-500 leading-relaxed">
							Modul tersinkronisasi otomatis dengan enkripsi database berlapis dan dukungan bridging sistem eksternal.
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<section id="pricing" class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/60 scroll-mt-24">
	<div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
		<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Skema Investasi & Kemitraan</h2>
		<p class="text-sm text-slate-500 font-medium">Sistem modular yang fleksibel, disesuaikan sepenuhnya dengan skala operasional dan regulasi institusi Anda.</p>
	</div>

	<div class="relative rounded-[2.5rem] border border-slate-200 bg-white p-8 sm:p-12 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.04)] overflow-hidden">
		<div class="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-[#0155FF]/10 to-[#00C2CB]/10 rounded-full blur-2xl pointer-events-none"></div>
		
		<div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
			
			<div class="lg:col-span-7 space-y-5 text-left">
				<div class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[10px] font-black tracking-widest text-[#0155FF] uppercase">
					Tailored Enterprise Solution
				</div>
				<h3 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
					Implementasi Sesuai Kebutuhan Spesifik
				</h3>
				<p class="text-sm text-slate-500 font-medium leading-relaxed">
					Kami memahami bahwa setiap institusi memiliki standarisasi alur kerja, volume pengguna, dan kebutuhan infrastruktur yang berbeda. Layanan kami bersifat modular—Anda hanya berinvestasi pada fitur dan kapasitas yang benar-benar digunakan.
				</p>
				
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-600">
					<div class="flex items-center gap-2.5">
						<div class="h-5 w-5 rounded-md bg-blue-50 text-[#0155FF] flex items-center justify-center shrink-0">
							<Check size={12} strokeWidth={3} />
						</div>
						<span>SLA Uptime & Support 24/7</span>
					</div>
					<div class="flex items-center gap-2.5">
						<div class="h-5 w-5 rounded-md bg-blue-50 text-[#0155FF] flex items-center justify-center shrink-0">
							<Check size={12} strokeWidth={3} />
						</div>
						<span>Kepatuhan Regulasi Kemenkes/BPJS</span>
					</div>
					<div class="flex items-center gap-2.5">
						<div class="h-5 w-5 rounded-md bg-blue-50 text-[#0155FF] flex items-center justify-center shrink-0">
							<Check size={12} strokeWidth={3} />
						</div>
						<span>Opsi On-Premise / Hybrid Cloud</span>
					</div>
					<div class="flex items-center gap-2.5">
						<div class="h-5 w-5 rounded-md bg-blue-50 text-[#015FF] flex items-center justify-center shrink-0">
							<Check size={12} strokeWidth={3} />
						</div>
						<span>Pelatihan Staf & Maintenance Full</span>
					</div>
				</div>
			</div>

			<div class="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-slate-900 text-center lg:text-left">
				<div class="space-y-2">
					<p class="text-[10px] font-black uppercase tracking-widest text-[#00C2CB]">Informasi Lebih Lanjut</p>
					<h4 class="text-xl font-black tracking-tight text-white">Minta Penawaran Resmi</h4>
					<p class="text-xs text-slate-400 font-medium leading-relaxed pt-1">
						Diskusikan arsitektur sistem yang Anda butuhkan bersama Technical Product Consultant kami untuk mendapatkan rincian biaya penawaran (Quotation).
					</p>
				</div>

				<div class="mt-8 space-y-3">
					<a 
						href="/#contact" 
						class="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#0155FF] to-[#00C2CB] py-3.5 text-center text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 active:scale-95"
					>
						Hubungi Sales Executive
					</a>
					<p class="text-[10px] text-slate-500 font-semibold text-center leading-normal">
						Atau jadwalkan Zoom Technical Meeting via WhatsApp.
					</p>
				</div>
			</div>

		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
	<div class="relative rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 px-8 py-12 sm:px-12 overflow-hidden shadow-2xl border border-slate-900">
		<div class="absolute -right-10 -bottom-10 w-72 h-72 bg-[#00C2CB]/10 rounded-full blur-3xl pointer-events-none"></div>
		<div class="absolute -left-10 -top-10 w-72 h-72 bg-[#0155FF]/10 rounded-full blur-3xl pointer-events-none"></div>

		<div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
			<div class="text-center lg:text-left space-y-3 max-w-xl">
				<span class="text-[10px] font-black tracking-[0.2em] text-[#00C2CB] uppercase block">LIVE DEMO TESTING</span>
				<h2 class="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">Siap mentransformasi alur kerja instansi Anda?</h2>
				<p class="text-sm text-slate-400 font-medium">Jadwalkan uji coba live-system gratis bersama tim technical engineer kami sekarang juga.</p>
			</div>
			
			<div class="flex flex-wrap items-center justify-center gap-4 shrink-0 w-full sm:w-auto">
				<a href="/#contact" class="w-full sm:w-auto text-center inline-flex items-center justify-center rounded-xl bg-white px-6 py-4 text-slate-950 font-bold text-sm shadow-md hover:bg-slate-50 transition-all active:scale-98">
					Request Demo Langsung
				</a>
				<a href="/#signup" class="w-full sm:w-auto text-center inline-flex items-center justify-center rounded-xl ring-1 ring-inset ring-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 px-6 py-4 text-white font-bold text-sm transition-all active:scale-98">
					Coba Akses Gratis
				</a>
			</div>
		</div>
	</div>
</section>