<script>
	import { Layers, Unlink2, ShieldCheck, BarChart3, Plus, ArrowRight } from 'lucide-svelte';
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { reveal } from '$lib/actions/reveal.js';
	import bgMain from '$lib/assets/bg_main2.webp';
	import bgAnalytics from '$lib/assets/bg_analytics.webp';

	const features = [
		{
			title: '100% Tailor-Made & Modular',
			desc: 'Pengembangan software kustom yang dirancang dari nol sesuai dengan alur kerja, skala, dan kompleksitas bisnis Anda tanpa batasan template kaku.',
			icon: Layers,
			bgImage: bgMain, // Menggunakan gambar impor
			badgeColor: 'bg-white/20 text-white backdrop-blur-md',
			iconColor: 'text-white',
			plusColor: 'text-white/80',
			gridSpan: 'lg:col-span-2 lg:row-span-2',
			isFeatured: true
		},
		{
			title: 'Integrasi & Bridging API',
			desc: 'Mudah dihubungkan dengan berbagai sistem third-party, payment gateway, hardware, hingga platform pemerintah secara seamless.',
			icon: Unlink2,
			bg: 'bg-slate-100 text-slate-900 border border-slate-200/80',
			badgeColor: 'bg-slate-100 text-[#0155FF]',
			iconColor: 'text-[#0155FF]',
			plusColor: 'text-slate-400',
			gridSpan: 'lg:col-span-1',
			isFeatured: false
		},
		{
			title: 'Keamanan Data Enterprise',
			desc: 'Enkripsi data berlapis, kontrol hak akses berbasis peran (RBAC), serta audit trail lengkap untuk keamanan aset digital Anda.',
			icon: ShieldCheck,
			bg: 'bg-slate-100 text-slate-900 border border-slate-200/80',
			badgeColor: 'bg-slate-100 text-[#0155FF]',
			iconColor: 'text-[#0155FF]',
			plusColor: 'text-slate-400',
			gridSpan: 'lg:col-span-1',
			isFeatured: false
		},
		{
			title: 'Otomatisasi & Analytics Real-time',
			desc: 'Otomatiskan proses manual bisnis Anda dan dapatkan insight laporan operasional maupun keuangan secara real-time.',
			icon: BarChart3,
			bgImage: bgAnalytics,
			badgeColor: 'bg-white/20 text-white backdrop-blur-md',
			iconColor: 'text-white',
			plusColor: 'text-white/80',
			gridSpan: 'lg:col-span-2',
			isFeatured: false
		}
	];
</script>

<section id="features" class="bg-white px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Header Section -->
		<div class="mb-12 max-w-2xl" use:reveal>
			<h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
				Keunggulan <span class="text-[#0155FF]">Aorta Digital Solusi</span>
			</h2>
			<p class="mt-3 text-base text-slate-600">
				Solusi teknologi terpadu yang dirancang khusus untuk mempercepat efisiensi dan transformasi
				digital perusahaan Anda.
			</p>
		</div>

		<!-- Bento Grid Container -->
		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each features as f, i}
				<div
					class="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 {f.bg ||
						'text-white'} {f.gridSpan}"
					style={f.bgImage
						? `background-image: url('${f.bgImage}'); background-size: cover; background-position: center;`
						: ''}
					use:reveal={{ delay: 60 + i * 80 }}
				>
					<!-- Dark Overlay khusus untuk card dengan background image agar teks tidak samar -->
					{#if f.bgImage}
						<div
							class="absolute inset-0 z-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-900/40"
						></div>
					{/if}

					<!-- Header Card (Icon & Plus Indicator) -->
					<div class="relative z-10 flex items-center justify-between">
						<div class="flex h-12 w-12 items-center justify-center rounded-2xl {f.badgeColor}">
							<f.icon size={22} class={f.iconColor} />
						</div>
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 backdrop-blur-sm dark:bg-white/10"
						>
							<Plus size={18} class={f.plusColor} />
						</div>
					</div>

					<!-- Body Content -->
					<div class="relative z-10 mt-8 space-y-3">
						<h3 class="text-xl font-bold tracking-tight sm:text-2xl">
							{f.title}
						</h3>
						<p class="text-sm leading-relaxed opacity-90 sm:text-base">
							{f.desc}
						</p>

						{#if f.isFeatured}
							<div class="pt-4">
								<a
									href={whatsappLink}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-all hover:bg-slate-100 active:scale-95"
								>
									Konsultasi Kebutuhan <ArrowRight size={16} />
								</a>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
