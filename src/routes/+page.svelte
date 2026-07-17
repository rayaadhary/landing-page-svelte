<script>
	import Hero from '$lib/components/Hero.svelte';
	import Products from '$lib/components/Products.svelte';
	import Features from '$lib/components/Features.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { ArrowRight, MessageSquare, ShieldCheck, HeartPulse, Mail, Phone, MapPin } from 'lucide-svelte';

	// Ambil tahun berjalan secara dinamis
	const currentYear = new Date().getFullYear();
</script>

<svelte:head>
	<title>AORTA — Jasa Pembuatan Aplikasi Rumah Sakit, Klinik & Sistem Enterprise Custom</title>
	<link rel="icon" href="/assets/logo.png" />
	<meta name="google-site-verification" content="cmPKTuqioD41LutY6_kGUpIzNLfmf1Sab1LvJw1uymo" />
	<meta name="description" content="AORTA: Jasa pembuatan aplikasi rumah sakit (SIMRS), klinik, HRIS, POS, dan custom software. Solusi digital terintegrasi untuk fasilitas kesehatan & enterprise di Indonesia." />
	<meta name="keywords" content="jasa pembuatan aplikasi, aplikasi rumah sakit, aplikasi klinik, SIMRS, sistem informasi rumah sakit, pembuatan software custom, AORTA" />
	<meta property="og:title" content="AORTA — Jasa Pembuatan Aplikasi Rumah Sakit, Klinik & Sistem Enterprise" />
	<meta property="og:description" content="Solusi SIMRS, SIM Klinik, HRIS, POS, dan custom software untuk fasilitas kesehatan & enterprise di Indonesia." />
	<meta property="og:image" content="/assets/logo.png" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://aorta.my.id" />
</svelte:head>

<Hero />
<Products />
<Features />
<Testimonials />

<section id="get-started" class="relative mx-auto max-w-9xl px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
	<div class="relative rounded-[2.5rem] bg-slate-950 p-8 sm:p-12 md:p-16 overflow-hidden">
		
		<div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#0155FF]/10 blur-[80px] pointer-events-none"></div>
		<div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#00C2CB]/10 blur-[80px] pointer-events-none"></div>

		<div class="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center pb-16">
			
			<div class="space-y-4 max-w-2xl text-left">
				<div class="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-[10px] font-black tracking-widest text-[#00C2CB] uppercase">
					<ShieldCheck size={12} /> SECURE & COMPLIANT
				</div>
				<h3 class="text-2xl font-black tracking-tight text-white sm:text-4xl leading-tight">
					Digitalisasi Tanpa Pusing Dimulai di Sini.
				</h3>
				<p class="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
					Siap bawa operasional institusi dan bisnis Anda jadi lebih rapi serta terukur? Mulai eksplorasi platform modular kami sekarang atau diskusikan kebutuhan blueprint sistem unik Anda bersama tim sales ahli kami.
				</p>
			</div>

			<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
				<a
					href={whatsappLink}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0155FF] to-[#00C2CB] text-white py-3.5 px-6 font-bold text-xs shadow-md shadow-blue-500/10 text-center"
				>
					<MessageSquare size={14} /> Hubungi Sales
				</a>
				
				<a
					href="#signup"
					class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300 py-3.5 px-6 font-bold text-xs text-center"
				>
					Mulai Gratis <ArrowRight size={14} />
				</a>
			</div>
		</div>

		<div class="w-full h-px bg-slate-900 relative z-10 my-4"></div>

		<div class="relative z-10 pt-12">
			<div class="grid grid-cols-1 gap-10 md:grid-cols-12 pb-12 border-b border-slate-900">
				
				<div class="md:col-span-4 space-y-5">
					<div class="flex items-center gap-2 text-[#0155FF]">
					    <picture>
							<source srcset="/assets/logo.webp" type="image/webp" />
							<img src="/assets/logo.png" alt="AORTA" class="h-15 w-15 rounded-md" width="105" height="105" />
						</picture>
						<span class="text-lg font-black tracking-tight text-white">AORTA</span>
					</div>
					<p class="text-xs font-semibold text-slate-400 leading-relaxed">
						Penyedia infrastruktur teknologi modular kelas enterprise. Berfokus pada keandalan sistem kesehatan pintar, efisiensi manajemen SDM medis, dan kustomisasi arsitektur software siap pakai.
					</p>
				</div>

				<div class="hidden md:block md:col-span-1"></div>

				<div class="md:col-span-3 space-y-4">
					<h4 class="text-xs font-black tracking-wider text-white uppercase">Produk Utama</h4>
					<ul class="space-y-2.5 text-xs font-semibold text-slate-400">
						<li><a href="/products/simrs" class="hover:text-[#00C2CB]">SIMRS Core Enterprise</a></li>
						<li><a href="/products/sim-klinik" class="hover:text-[#00C2CB]">SIM Klinik Pratama & Utama</a></li>
						<li><a href="/products/hris" class="hover:text-[#00C2CB]">HRIS</a></li>
						<li><a href="/products/custom" class="hover:text-[#00C2CB]">Custom Architecture System</a></li>
					</ul>
				</div>

				<div class="md:col-span-2 space-y-4">
					<h4 class="text-xs font-black tracking-wider text-white uppercase">Regulasi & Legal</h4>
					<ul class="space-y-2.5 text-xs font-semibold text-slate-400">
						<li class="flex items-center gap-1.5 text-slate-300">
							<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> SatuSehat Ready
						</li>
						<li class="flex items-center gap-1.5 text-slate-300">
							<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Bridging BPJS
						</li>
						<li><a href="/privacy" class="hover:text-[#00C2CB]">Kebijakan Privasi</a></li>
						<li><a href="/terms" class="hover:text-[#00C2CB]">Syarat & Ketentuan</a></li>
					</ul>
				</div>

				<div class="md:col-span-2 space-y-4">
					<h4 class="text-xs font-black tracking-wider text-white uppercase">Kontak Kantor</h4>
					<ul class="space-y-3 text-xs font-semibold text-slate-400">
						<li class="flex items-center gap-2">
							<Mail size={14} class="text-[#0155FF] shrink-0" />
							<span class="truncate">aortadigitalsolusi.business@gmail.com</span>
						</li>
						<li class="flex items-center gap-2">
							<Phone size={14} class="text-[#00C2CB] shrink-0" />
							<span>+62 896-2994-9441</span>
						</li>
						<li class="flex items-start gap-2">
							<MapPin size={14} class="text-slate-500 shrink-0 mt-0.5" />
							<span class="leading-relaxed">Cianjur, Jawa Barat, Indonesia</span>
						</li>
					</ul>
				</div>

			</div>

			<div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
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