<script>
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { ArrowRight } from 'lucide-svelte';
	import bgMain from '$lib/assets/bg_main.jpg';
</script>

<section class="relative overflow-hidden bg-white py-20 lg:py-24">
	<!-- Gambar Kanan: Full Height & Full Width di Sisi Kanan Section dengan Clip-Path (<) -->
	<div class="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block fade-in">
		<img
			src={bgMain}
			alt="AORTA Digital Solution"
			class="h-full w-full object-cover"
			style="clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%);"
		/>
	</div>

	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-8 lg:grid-cols-12">
			<!-- Teks Kiri -->
			<div class="space-y-6 lg:col-span-6 z-10">
				<h1 class="rise text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
					Jasa Pembuatan <span class="text-[#0155FF]">Aplikasi & Software Kustom</span>
				</h1>

				<p class="rise max-w-lg text-lg leading-relaxed text-slate-600" style="animation-delay: 120ms;">
				Dari ERP, SIMRS, HRIS, hingga POS retail. Kami bantu digitalisasi operasional bisnis Anda dengan sistem scalable, aman, dan harga fleksibel.
				</p>

				<div class="rise flex flex-wrap gap-4 pt-2" style="animation-delay: 240ms;">
					<a
						href={whatsappLink}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-[#0155FF] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#0145dd] active:scale-[0.98]"
					>
						Konsultasi Gratis <ArrowRight size={16} />
					</a>
					<a
						href="#layanan"
						class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:text-slate-900 active:scale-[0.98]"
					>
						Lihat Produk
					</a>
				</div>

				<div class="rise grid grid-cols-2 gap-8 border-t border-slate-100 pt-10 sm:grid-cols-4" style="animation-delay: 360ms;">
					<div>
						<p class="text-xl font-bold text-slate-900">100%</p>
						<p class="mt-1 text-xs text-slate-500">Custom Solution</p>
					</div>
					<div>
						<p class="text-xl font-bold text-slate-900">100%</p>
						<p class="mt-1 text-xs text-slate-500">On-Time Delivery</p>
					</div>
					<div>
						<p class="text-xl font-bold text-slate-900">1 Tahun</p>
						<p class="mt-1 text-xs text-slate-500">Garansi Maintenance</p>
					</div>
					<div>
						<p class="text-xl font-bold text-slate-900">24/7</p>
						<p class="mt-1 text-xs text-slate-500">Support & Service</p>
					</div>
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