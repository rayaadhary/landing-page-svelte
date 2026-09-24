<script>
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { ArrowRight } from 'lucide-svelte';
	import bgMain from '$lib/assets/bg_main.webp';

	let { content = null } = $props();

	const titlePrefix = $derived(content?.titlePrefix ?? 'Jasa Pembuatan');
	const titleHighlight = $derived(content?.titleHighlight ?? 'Aplikasi & Software Kustom');
	const highlightColor = $derived(content?.highlightColor ?? '#0155FF');
	const description = $derived(
		content?.description ??
			'Dari ERP, SIMRS, HRIS, hingga POS retail. Kami bantu digitalisasi operasional bisnis Anda dengan sistem scalable, aman, dan harga fleksibel.'
	);
	const ctaPrimaryLabel = $derived(content?.ctaPrimaryLabel ?? 'Konsultasi Gratis');
	const ctaPrimaryHref = $derived(content?.ctaPrimaryHref || whatsappLink);
	const ctaSecondaryLabel = $derived(content?.ctaSecondaryLabel ?? 'Lihat Produk');
	const ctaSecondaryHref = $derived(content?.ctaSecondaryHref ?? '#layanan');
	const stats = $derived(
		content?.stats?.length
			? content.stats
			: [
					{ value: '100%', label: 'Custom Solution' },
					{ value: '100%', label: 'On-Time Delivery' },
					{ value: '1 Tahun', label: 'Garansi Maintenance' },
					{ value: '24/7', label: 'Support & Service' }
				]
	);

	const isExternal = $derived(
		ctaPrimaryHref.startsWith('http://') || ctaPrimaryHref.startsWith('https://')
	);
</script>

<svelte:head>
	<link rel="preload" href={bgMain} as="image" type="image/webp" fetchpriority="high" />
</svelte:head>

<section class="relative overflow-hidden bg-white py-20 lg:py-24">
	<!-- Gambar Kanan: Full Height & Full Width di Sisi Kanan Section dengan Clip-Path (<) -->
	<div class="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block">
		<img
			src={bgMain}
			alt="AORTA Digital Solution"
			class="h-full w-full object-cover"
			width="1920"
			height="1280"
			fetchpriority="high"
			loading="eager"
			decoding="async"
			style="clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%);"
		/>
	</div>

	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-8 lg:grid-cols-12">
			<!-- Teks Kiri -->
			<div class="z-10 space-y-6 lg:col-span-6">
				<h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
					{titlePrefix}
					<span style="color: {highlightColor}">{titleHighlight}</span>
				</h1>

				<p
					class="rise max-w-lg text-lg leading-relaxed text-slate-600"
					style="animation-delay: 120ms;"
				>
					{description}
				</p>

				<div class="rise flex flex-wrap gap-4 pt-2" style="animation-delay: 240ms;">
					<a
						href={ctaPrimaryHref}
						target={isExternal ? '_blank' : undefined}
						rel={isExternal ? 'noopener noreferrer' : undefined}
						class="inline-flex items-center gap-2 rounded-lg bg-[#0155FF] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#0145dd] active:scale-[0.98]"
					>
						{ctaPrimaryLabel}
						<ArrowRight size={16} />
					</a>
					<a
						href={ctaSecondaryHref}
						class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:text-slate-900 active:scale-[0.98]"
					>
						{ctaSecondaryLabel}
					</a>
				</div>

				<div
					class="rise grid grid-cols-2 gap-8 border-t border-slate-100 pt-10 sm:grid-cols-4"
					style="animation-delay: 360ms;"
				>
					{#each stats as stat}
						<div>
							<p class="text-xl font-bold text-slate-900">{stat.value}</p>
							<p class="mt-1 text-xs text-slate-500">{stat.label}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Bagian bawah yang bergelombang (z-20 agar menutup bagian bawah gambar) -->
	<div class="absolute bottom-0 left-0 z-20 w-full overflow-hidden leading-[0]">
		<svg
			class="relative block h-[60px] w-full sm:h-[80px]"
			viewBox="0 0 1440 80"
			preserveAspectRatio="none"
		>
			<path
				d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
				class="fill-white"
			/>
		</svg>
	</div>
</section>
