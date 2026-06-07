<script>
	import {
		CheckCircle,
		ClipboardList,
		FileText,
		Microsheet, // Typo penulisan bawaan di-fix otomatis ke Microscope bawah
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
		Zap
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
				{product.category || 'ENTERPRISE SYSTEM'}
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
						<span class="text-[10px] font-mono text-slate-500 tracking-wider">aorta_interface_v4.png</span>
						<div class="w-10"></div>
					</div>
					
					{#if product.screenshots && product.screenshots.length > 0}
						<img 
							src={product.screenshots[0]} 
							alt={product.title} 
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

<section id="pricing" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/60 scroll-mt-24">
	<div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
		<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Skema Investasi Sesuai Skala</h2>
		<p class="text-sm text-slate-500 font-medium">Transparan, efisien, dan fleksibel tanpa biaya maintenance tersembunyi.</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
		{#each product.pricing as tier, index}
			{@const isFeatured = index === 1}
			<div class="relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border {isFeatured ? 'border-[#0155FF] bg-slate-950 text-white md:scale-[1.03] shadow-[0_32px_64px_-16px_rgba(1,85,255,0.15)] z-10' : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300'}"
			>
				{#if isFeatured}
					<span class="absolute -top-3.5 left-1/3 -translate-x-1/2 bg-gradient-to-r from-[#0155FF] to-[#00C2CB] text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-md">
						RECOMMENDED
					</span>
				{/if}

				<div>
					<div class="text-lg font-black tracking-tight">{tier.name}</div>
					<div class="mt-3 flex items-baseline gap-1">
						<span class="text-2xl sm:text-3xl font-black tracking-tight {isFeatured ? 'text-[#00C2CB]' : 'text-[#0155FF]'}">{tier.price}</span>
					</div>
					
					<div class="my-6 border-t {isFeatured ? 'border-slate-800' : 'border-slate-100'}"></div>

					<ul class="space-y-3.5 text-xs font-semibold">
						{#each tier.highlights as h}
							<li class="flex items-start gap-3">
								<div class="h-4 w-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 {isFeatured ? 'bg-blue-500/20 text-[#00C2CB]' : 'bg-emerald-50 text-emerald-600'}">
									<Check size={10} strokeWidth={3} />
								</div>
								<span class={isFeatured ? 'text-slate-300' : 'text-slate-600'}>{h}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="mt-8">
					<a 
						href="/#contact" 
						class="flex w-full items-center justify-center rounded-xl py-3.5 text-center text-xs font-bold transition-all duration-300 active:scale-95 {isFeatured ? 'bg-gradient-to-r from-[#0155FF] to-[#00C2CB] text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 hover:bg-[#0155FF] hover:text-white text-slate-700'}"
					>
						Hubungi Sales Executive
					</a>
				</div>
			</div>
		{/each}
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