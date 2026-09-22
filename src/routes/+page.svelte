<script>
	import Hero from '$lib/components/Hero.svelte';
	import Products from '$lib/components/Products.svelte';
	import Features from '$lib/components/Features.svelte';
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { MessageSquare, Mail, Phone, MapPin, ChevronDown } from 'lucide-svelte';

	const currentYear = new Date().getFullYear();

	let faqOpen = $state(null);
	const faqs = [
		{ q: 'Apakah sistem bisa di-custom?', a: 'Bisa. Semua produk AORTA bisa dikustomisasi sesuai kebutuhan operasional Anda — dari alur kerja, tampilan, hingga integrasi sistem pihak ketiga.' },
		{ q: 'Apakah menerima jasa buat aplikasi lain?', a: 'Ya. Selain produk standar, kami juga menerima jasa pembuatan aplikasi custom — ERP, e-learning, portal layanan publik, dan lainnya.' },
		{ q: 'Berapa lama proses implementasi?', a: 'SIM Klinik: 14–21 hari. SIMRS: 2–6 bulan. Aplikasi custom: disepakati setelah analisis kebutuhan.' },
		{ q: 'Sudah terintegrasi BPJS & SatuSehat?', a: 'Ya. Bridging BPJS (VClaim) dan SatuSehat sudah termasuk dalam paket, bukan biaya tambahan.' },
		{ q: 'Bagaimana support setelah beli?', a: 'SLA tertulis, support 24/7 via WhatsApp & tiket, dedicated engineer, dan update otomatis.' }
	];
</script>

<svelte:head>
	<title>Jasa Pembuatan SIMRS &amp; Aplikasi Klinik Terintegrasi BPJS SatuSehat | AORTA</title>
	<meta
		name="description"
		content="AORTA jasa pembuatan SIMRS, aplikasi klinik, HRIS & POS terintegrasi BPJS & SatuSehat. Custom software tanpa langganan untuk RS, klinik & enterprise di Indonesia."
	/>
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="Jasa Pembuatan SIMRS & Aplikasi Klinik Terintegrasi BPJS SatuSehat | AORTA" />
	<meta
		property="og:description"
		content="SIMRS, SIM Klinik, HRIS & POS terintegrasi BPJS & SatuSehat. Konsultasi & demo gratis — Cianjur, Bandung, seluruh Indonesia."
	/>
	<meta property="og:image" content="https://aorta.my.id/assets/og-default.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aorta.my.id" />
	<meta property="og:locale" content="id_ID" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Jasa Pembuatan SIMRS & Aplikasi Klinik Terintegrasi BPJS SatuSehat | AORTA" />
	<meta
		name="twitter:description"
		content="SIMRS, SIM Klinik, HRIS & POS terintegrasi BPJS & SatuSehat. Demo gratis sekarang."
	/>
	<meta name="twitter:image" content="https://aorta.my.id/assets/og-default.jpg" />
	<link rel="canonical" href="https://aorta.my.id/" />
</svelte:head>

<Hero />
<Products />
<Features />

<section class="px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mb-12 max-w-2xl">
			<h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Testimoni</h2>
			<p class="mt-3 text-base text-slate-600">Apa kata klien kami.</p>
		</div>

		<div class="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8">
			<div class="mb-4 flex items-center gap-1 text-amber-400">
				{#each Array(5) as _}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
				{/each}
			</div>
			<blockquote class="mb-6 text-sm leading-relaxed text-slate-600">
				"Tim AORTA membangun LMS kaigopedia sesuai harapan dan kebutuhan kami, responsif dan tepat waktu. Suka sama hasilnya."
			</blockquote>
			<div class="flex items-center gap-3">
				<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0155FF] text-xs font-bold text-white">K</div>
				<div>
					<p class="text-sm font-semibold text-slate-900">Tim Kaigopedia</p>
					<p class="text-xs text-slate-500">kaigopedia.com</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<div class="mb-12 text-center">
			<h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Pertanyaan Umum</h2>
		</div>

		<div class="space-y-2">
			{#each faqs as faq, i}
				<div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
					<button
						onclick={() => faqOpen = faqOpen === i ? null : i}
						class="flex w-full items-center justify-between gap-4 p-5 text-left"
					>
						<span class="text-sm font-semibold text-slate-900">{faq.q}</span>
						<ChevronDown
							size={16}
							class="shrink-0 text-slate-400 transition-transform duration-200 {faqOpen === i ? 'rotate-180' : ''}"
						/>
					</button>
					{#if faqOpen === i}
						<div class="px-5 pb-5 text-sm leading-relaxed text-slate-600">{faq.a}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="get-started" class="px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl rounded-2xl bg-slate-50 px-8 py-16 sm:px-12 md:px-16">
		<div class="mx-auto max-w-2xl text-center">
			<h3 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
				Siap Digitalisasi Operasional Anda?
			</h3>
			<p class="mt-4 text-base text-slate-600">
				Mulai eksplorasi platform kami atau diskusikan kebutuhan sistem Anda bersama tim sales ahli kami.
			</p>
			<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
				<a
					href={whatsappLink}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-lg bg-[#0155FF] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#0145dd] active:scale-[0.98]"
				>
					<MessageSquare size={16} /> Hubungi Sales
				</a>
				<a
					href="#layanan"
					class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 active:scale-[0.98]"
				>
					Mulai Gratis
				</a>
			</div>
		</div>
	</div>
</section>

<footer class="border-t border-slate-100 px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<picture>
						<source srcset="/assets/logo.webp" type="image/webp" />
						<img src="/assets/logo.png" alt="AORTA" class="h-8 w-8 rounded" width="32" height="32" />
					</picture>
					<span class="text-lg font-bold text-slate-900">AORTA</span>
				</div>
				<p class="text-sm leading-relaxed text-slate-500">
					Penyedia software enterprise modular untuk kesehatan dan bisnis di Indonesia.
				</p>
			</div>

			<div class="space-y-4">
				<h4 class="text-xs font-semibold tracking-wider text-slate-400 uppercase">Produk</h4>
				<ul class="space-y-2 text-sm text-slate-600">
					<li><a href="/products/simrs" class="hover:text-[#0155FF]">SIMRS Core Enterprise</a></li>
					<li><a href="/products/sim-klinik" class="hover:text-[#0155FF]">SIM Klinik Pratama & Utama</a></li>
					<li><a href="/products/hris" class="hover:text-[#0155FF]">HRIS Smart Corporate</a></li>
					<li><a href="/products/pos-inventory" class="hover:text-[#0155FF]">POS & Inventory</a></li>
				</ul>
			</div>

			<div class="space-y-4">
				<h4 class="text-xs font-semibold tracking-wider text-slate-400 uppercase">Regulasi</h4>
				<ul class="space-y-2 text-sm text-slate-600">
					<li class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> SatuSehat Ready
					</li>
					<li class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Bridging BPJS
					</li>
				</ul>
			</div>

			<div class="space-y-4">
				<h4 class="text-xs font-semibold tracking-wider text-slate-400 uppercase">Kontak</h4>
				<ul class="space-y-3 text-sm text-slate-600">
					<li class="flex items-center gap-2">
						<Mail size={14} class="shrink-0 text-slate-400" />
						<span class="truncate">aortadigitalsolusi@gmail.com</span>
					</li>
					<li class="flex items-center gap-2">
						<Phone size={14} class="shrink-0 text-slate-400" />
						<span>+62 896-2994-9441</span>
					</li>
					<li class="flex items-start gap-2">
						<MapPin size={14} class="mt-0.5 shrink-0 text-slate-400" />
						<span>Cianjur, Jawa Barat, Indonesia</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
			<p class="text-xs text-slate-400">
				&copy; {currentYear} PT AORTA DIGITAL SOLUSI. All rights reserved.
			</p>
			<div class="flex items-center gap-4 text-xs text-slate-400">
				<a href="/privacy" class="hover:text-[#0155FF]">Kebijakan Privasi</a>
				<span>Engineered with Precision &bull; Built for Excellence</span>
			</div>
		</div>
	</div>
</footer>
