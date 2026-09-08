<script>
	import Hero from '$lib/components/Hero.svelte';
	import Products from '$lib/components/Products.svelte';
	import Features from '$lib/components/Features.svelte';
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import {
		ArrowRight,
		MessageSquare,
		ShieldCheck,
		HeartPulse,
		Mail,
		Phone,
		MapPin
	} from 'lucide-svelte';

	// Ambil tahun berjalan secara dinamis
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
	<meta name="google-site-verification" content="cmPKTuqioD41LutY6_kGUpIzNLfmf1Sab1LvJw1uymo" />
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

<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="mb-10 text-center">
		<span class="inline-block rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#0155FF] uppercase">TESTIMONI</span>
		<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Apa Kata <span class="text-[#0155FF]">Klien Kami</span></h2>
	</div>

	<div class="mx-auto max-w-2xl">
		<div class="rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(1,85,255,0.1)]">
			<div class="mb-4 flex items-center gap-1 text-amber-400">
				{#each Array(5) as _}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
				{/each}
			</div>
			<blockquote class="mb-6 text-sm leading-relaxed font-medium text-slate-600">
				"Tim AORTA membangun LMS kaigopedia sesuai harapan dan kebutuhan kami,responsif dan tepat waktu. Suka sama hasilnya"
			</blockquote>
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white">K</div>
				<div>
					<p class="text-sm font-bold text-slate-900">Tim Kaigopedia</p>
					<p class="text-xs font-medium text-slate-500">kaigopedia.com</p>
				</div>
			</div>
		</div>
	</div>

</section>

<section class="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="mb-10 text-center">
		<span class="inline-block rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#0155FF] uppercase">FAQ</span>
		<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Pertanyaan <span class="text-[#0155FF]">Umum</span></h2>
	</div>

	<div class="space-y-3">
		{#each faqs as faq, i}
			<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-md">
				<button onclick={() => faqOpen = faqOpen === i ? null : i} class="flex w-full items-center justify-between gap-4 p-5 text-left">
					<span class="text-sm font-bold text-slate-900">{faq.q}</span>
					<span class="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-300 {faqOpen === i ? 'rotate-45' : ''}">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
					</span>
				</button>
				{#if faqOpen === i}
					<div class="px-5 pb-5 text-sm leading-relaxed font-medium text-slate-600">{faq.a}</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<section
	id="get-started"
	class="max-w-9xl relative mx-auto overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
>
	<div class="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 sm:p-12 md:p-16">
		<div
			class="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#0155FF]/10 blur-[80px]"
		></div>
		<div
			class="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#00C2CB]/10 blur-[80px]"
		></div>

		<div
			class="relative z-10 flex flex-col items-start justify-between gap-8 pb-16 lg:flex-row lg:items-center"
		>
			<div class="max-w-2xl space-y-4 text-left">
				<div
					class="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[10px] font-black tracking-widest text-[#00C2CB] uppercase"
				>
					<ShieldCheck size={12} /> SECURE & COMPLIANT
				</div>
				<h3 class="text-2xl leading-tight font-black tracking-tight text-white sm:text-4xl">
					Digitalisasi Tanpa Pusing Dimulai di Sini.
				</h3>
				<p class="text-xs leading-relaxed font-medium text-slate-400 sm:text-sm">
					Siap bawa operasional institusi dan bisnis Anda jadi lebih rapi serta terukur? Mulai
					eksplorasi platform modular kami sekarang atau diskusikan kebutuhan blueprint sistem unik
					Anda bersama tim sales ahli kami.
				</p>
			</div>

			<div
				class="flex w-full shrink-0 flex-col items-stretch gap-3.5 sm:flex-row sm:items-center lg:w-auto"
			>
				<a
					href={whatsappLink}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0155FF] px-6 py-3.5 text-center text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:opacity-90 active:scale-95"
				>
					<MessageSquare size={14} /> Hubungi Sales
				</a>

				<a
					href="#get-started"
					class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/50 px-6 py-3.5 text-center text-xs font-bold text-slate-300 hover:bg-slate-900"
				>
					Mulai Gratis <ArrowRight size={14} />
				</a>
			</div>
		</div>

		<div class="relative z-10 my-4 h-px w-full bg-slate-900"></div>

		<div class="relative z-10 pt-12">
			<div class="grid grid-cols-1 gap-10 border-b border-slate-900 pb-12 md:grid-cols-12">
				<div class="space-y-5 md:col-span-4">
					<div class="flex items-center gap-2 text-[#0155FF]">
						<picture>
							<source srcset="/assets/logo.webp" type="image/webp" />
							<img
								src="/assets/logo.png"
								alt="AORTA"
								class="h-15 w-15 rounded-md"
								width="105"
								height="105"
							/>
						</picture>
						<span class="text-lg font-black tracking-tight text-white">AORTA</span>
					</div>
					<p class="text-xs leading-relaxed font-semibold text-slate-400">
						Penyedia infrastruktur teknologi modular kelas enterprise. Berfokus pada keandalan
						sistem kesehatan pintar, efisiensi manajemen SDM medis, dan kustomisasi arsitektur
						software siap pakai.
					</p>
				</div>

				<div class="hidden md:col-span-1 md:block"></div>

				<div class="space-y-4 md:col-span-3">
					<h4 class="text-xs font-black tracking-wider text-white uppercase">Produk Utama</h4>
					<ul class="space-y-2.5 text-xs font-semibold text-slate-400">
						<li>
							<a href="/products/simrs" class="hover:text-[#00C2CB]">SIMRS Core Enterprise</a>
						</li>
						<li>
							<a href="/products/sim-klinik" class="hover:text-[#00C2CB]"
								>SIM Klinik Pratama & Utama</a
							>
						</li>
						<li>
							<a href="/products/hris" class="hover:text-[#00C2CB]">HRIS</a>
						</li>
						<li>
							<a href="/products/pos-inventory" class="hover:text-[#00C2CB]"
								>POS &amp; Intelligent Inventory</a
							>
						</li>
					</ul>
				</div>

				<div class="space-y-4 md:col-span-2">
					<h4 class="text-xs font-black tracking-wider text-white uppercase">Regulasi & Legal</h4>
					<ul class="space-y-2.5 text-xs font-semibold text-slate-400">
						<li class="flex items-center gap-1.5 text-slate-300">
							<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> SatuSehat Ready
						</li>
						<li class="flex items-center gap-1.5 text-slate-300">
							<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Bridging BPJS
						</li>
					</ul>
				</div>

				<div class="space-y-4 md:col-span-2">
					<h4 class="text-xs font-black tracking-wider text-white uppercase">Kontak Kantor</h4>
					<ul class="space-y-3 text-xs font-semibold text-slate-400">
						<li class="flex items-center gap-2">
							<Mail size={14} class="shrink-0 text-[#0155FF]" />
							<span class="truncate">aortadigitalsolusi.business@gmail.com</span>
						</li>
						<li class="flex items-center gap-2">
							<Phone size={14} class="shrink-0 text-[#00C2CB]" />
							<span>+62 896-2994-9441</span>
						</li>
						<li class="flex items-start gap-2">
							<MapPin size={14} class="mt-0.5 shrink-0 text-slate-500" />
							<span class="leading-relaxed">Cianjur, Jawa Barat, Indonesia</span>
						</li>
					</ul>
				</div>
			</div>

			<div
				class="mt-8 flex flex-col items-center justify-between gap-4 text-[10px] font-bold tracking-wider text-slate-500 uppercase sm:flex-row"
			>
				<div>
					&copy; {currentYear} AORTA. All rights reserved.
				</div>
				<div class="flex items-center gap-1 text-slate-600">
					Engineered with Precision &bull; Built for Excellence
				</div>
			</div>
		</div>
	</div>
</section>
