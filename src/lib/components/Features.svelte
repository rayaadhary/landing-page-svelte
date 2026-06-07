<script>
	import {
		ChartNoAxesCombined,
		Settings,
		Shield,
		Plug,
		Sparkles
	} from 'lucide-svelte';

	const features = [
		{
			title: 'Pantau Bisnis Detik Ini',
			desc: 'Data akurat yang tersaji instan, tanpa perlu tunggu laporan akhir bulan. Analisis tren pendapatan, performa staf, hingga grafik logistik secara real-time dari satu dashboard utama.',
			icon: ChartNoAxesCombined,
			sizeClass: 'lg:col-span-2'
		},
		{
			title: 'Kerja Otomatis, Tim Efisien',
			desc: 'Biarkan sistem urus tugas rutin. Tim Anda bisa fokus ke hal yang lebih krusial tanpa hambatan birokrasi.',
			icon: Settings,
			sizeClass: 'lg:col-span-2'
		},
		{
			title: 'Keamanan Lapis Baja',
			desc: 'Privasi data klien terlindungi dengan enkripsi standar internasional, audit logging ketat, serta pembagian hak akses (role permission) yang granular.',
			icon: Shield,
			sizeClass: 'lg:col-span-2'
		},
		{
			title: 'Ekosistem Tanpa Batas',
			desc: 'Satu ekosistem modular yang terintegrasi penuh ke semua aplikasi eksternal, bridging SatuSehat, klaim BPJS, hingga printer kasir tanpa setup rumit.',
			icon: Plug,
			sizeClass: 'lg:col-span-2'
		}
	];
</script>

<section id="features" class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
	<div class="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#0155FF]/[0.03] blur-[100px] pointer-events-none"></div>
	<div class="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#00C2CB]/[0.03] blur-[100px] pointer-events-none"></div>

	<div class="max-w-3xl text-left space-y-3 mb-16 relative z-10">
		<div class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[10px] font-black tracking-widest text-[#0155FF] uppercase">
			<Sparkles size={12} /> Core Capabilities
		</div>
		<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
			Arsitektur Fitur Utama Enterprise
		</h2>
		<p class="text-sm text-slate-500 font-medium leading-relaxed">
			Infrastruktur sistem yang dirancang kokoh untuk mengakomodasi kebutuhan skalabilitas dan efisiensi perusahaan modern.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
		{#each features as f}
			<div class="relative rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.02)] flex flex-col justify-between {f.sizeClass}">
				
				<div class="space-y-4">
					<div class="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0155FF] to-[#00C2CB] text-white shadow-md shadow-blue-500/10">
						<svelte:component this={f.icon} size={22} strokeWidth={2.5} />
					</div>
					
					<h3 class="text-lg font-black text-slate-900 tracking-tight">
						{f.title}
					</h3>
				</div>

				<div class="mt-4">
					<p class="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
						{f.desc}
					</p>
				</div>

				<div class="absolute top-4 right-4 h-2 w-2 border-t-2 border-r-2 border-slate-200 rounded-tr-sm"></div>
			</div>
		{/each}
	</div>
</section>