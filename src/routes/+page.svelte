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
</script>

<svelte:head>
	<title>Jasa Pembuatan Aplikasi Rumah Sakit, Klinik &amp; Software | AORTA</title>
	<meta name="google-site-verification" content="cmPKTuqioD41LutY6_kGUpIzNLfmf1Sab1LvJw1uymo" />
	<meta
		name="description"
		content="AORTA: Jasa pembuatan aplikasi rumah sakit (SIMRS), klinik, HRIS, POS, dan custom software. Solusi digital terintegrasi untuk fasilitas kesehatan & enterprise di Indonesia."
	/>
	<meta
		name="keywords"
		content="jasa pembuatan aplikasi, aplikasi rumah sakit, aplikasi klinik, SIMRS, sistem informasi rumah sakit, pembuatan software custom, AORTA"
	/>
	<meta
		property="og:title"
		content="Jasa Pembuatan Aplikasi Rumah Sakit, Klinik &amp; Software | AORTA"
	/>
	<meta
		property="og:description"
		content="Solusi SIMRS, SIM Klinik, HRIS, POS, dan custom software untuk fasilitas kesehatan & enterprise di Indonesia."
	/>
	<meta property="og:image" content="https://aorta.my.id/assets/logo.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aorta.my.id" />
	<meta name="twitter:card" content="summary" />
	<meta
		name="twitter:title"
		content="AORTA — Jasa Pembuatan Aplikasi Rumah Sakit, Klinik & Software Custom"
	/>
	<meta
		name="twitter:description"
		content="Solusi SIMRS, SIM Klinik, HRIS, POS, dan custom software untuk fasilitas kesehatan & enterprise di Indonesia."
	/>
	<meta name="twitter:image" content="https://aorta.my.id/assets/logo.png" />
	<link rel="canonical" href="https://aorta.my.id" />
</svelte:head>

<Hero />
<Products />
<Features />

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
