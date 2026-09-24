<script>
	import Hero from '$lib/components/Hero.svelte';
	import Products from '$lib/components/Products.svelte';
	import Features from '$lib/components/Features.svelte';
	import About from '$lib/components/About.svelte';
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { reveal } from '$lib/actions/reveal.js';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import bgMain from '$lib/assets/bg_main3.jpg';
	import bgKaigopedia from '$lib/assets/kaigopedia.png';
	import {
		MessageSquare,
		Mail,
		Phone,
		MapPin,
		ChevronDown,
		Instagram,
		MessageCircle,
		ArrowUpRight,
		Star,
		CircleCheck
	} from 'lucide-svelte';

	let { data } = $props();

	const currentYear = new Date().getFullYear();

	let faqOpen = $state(/** @type {number | null} */ (null));

	const faqs = $derived(
		(data.faqs || []).map((/** @type {any} */ f) => ({ q: f.question || f.q, a: f.answer || f.a }))
	);

	const testimonials = $derived(
		(data.testimonials?.length
			? data.testimonials
			: [
					{
						quote:
							'Tim AORTA membangun LMS kaigopedia sesuai harapan dan kebutuhan kami,responsif dan tepat waktu. Suka sama hasilnya',
						clientName: 'Tim Kaigopedia',
						clientRole: 'kaigopedia.com',
						avatarLetter: 'K',
						avatarColor: '#10b981',
						projectName: 'Kaigopedia (LMS Platform)',
						category: 'E-LEARNING & LMS',
						image: '',
						rating: 5
					}
				]
		).map((/** @type {any} */ t) => ({
			...t,
			image: t.image || (t.projectName?.includes('Kaigopedia') ? bgKaigopedia : ''),
			rating: Math.min(5, Math.max(1, Number(t.rating) || 5))
		}))
	);
</script>

<svelte:head>
	<title>Jasa Pembuatan SIMRS &amp; Aplikasi Klinik Terintegrasi BPJS SatuSehat | AORTA</title>
	<meta
		name="description"
		content="AORTA jasa pembuatan SIMRS, aplikasi klinik, HRIS & POS terintegrasi BPJS & SatuSehat. Custom software tanpa langganan untuk RS, klinik & enterprise di Indonesia."
	/>
	<meta name="robots" content="index, follow" />
	<meta
		property="og:title"
		content="Jasa Pembuatan SIMRS & Aplikasi Klinik Terintegrasi BPJS SatuSehat | AORTA"
	/>
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
	<meta
		name="twitter:title"
		content="Jasa Pembuatan SIMRS & Aplikasi Klinik Terintegrasi BPJS SatuSehat | AORTA"
	/>
	<meta
		name="twitter:description"
		content="SIMRS, SIM Klinik, HRIS & POS terintegrasi BPJS & SatuSehat. Demo gratis sekarang."
	/>
	<meta name="twitter:image" content="https://aorta.my.id/assets/og-default.jpg" />
	<link rel="canonical" href="https://aorta.my.id/" />
</svelte:head>

<Hero content={data.hero} />
<About />
<Products items={data.products} />
<Features />

<section class="bg-white px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Section Header -->
		<div class="mb-12 max-w-2xl">
			<h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Testimoni</h2>
			<p class="mt-3 text-base text-slate-600">
				Apa kata mitra yang telah mempercayakan pengembangan sistem kustomnya kepada
			</p>
			<span class="font-bold text-[#0155FF]">Aorta Digital Solusi</span>
		</div>

		<!-- Showcase Cards from DB — horizontal scroll -->
		<div
			class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
		>
			{#each testimonials as t, i}
				<article
					class="group w-72 shrink-0 snap-start overflow-hidden rounded-xl border border-slate-200/80 bg-white p-4 sm:w-80"
					use:reveal={{ delay: 120 + i * 60 }}
				>
					{#if t.image}
						<div class="overflow-hidden rounded-lg">
							<img
								src={t.image}
								alt={t.projectName || t.clientName}
								class="h-36 w-full object-cover object-top"
							/>
						</div>
					{/if}

					{#if t.category}
						<div class="mt-4 mb-3 flex justify-center">
							<span
								class="inline-flex items-center rounded-full bg-[#1E293B] px-4 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-md"
							>
								{t.category}
							</span>
						</div>
					{/if}

					<div class="text-center">
						{#if t.projectName}
							<h3 class="text-base font-bold tracking-tight text-slate-900">{t.projectName}</h3>
						{/if}

						<blockquote class="mt-2.5 line-clamp-4 text-xs leading-relaxed text-slate-600">
							“{t.quote}”
						</blockquote>

						<div
							class="mt-4 flex flex-col items-center justify-center gap-2 border-t border-slate-100 pt-4"
						>
							<div class="flex items-center gap-0.5 text-amber-400">
								{#each Array(5) as _, starIdx}
									{#if starIdx < t.rating}
										<Star size={14} class="fill-amber-400" />
									{:else}
										<Star size={14} class="fill-slate-200 text-slate-200" />
									{/if}
								{/each}
								<span class="ml-1 text-[11px] font-bold text-slate-700">{t.rating}.0</span>
							</div>
							<div class="flex items-center gap-2">
								<span
									class="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
									style="background-color: {t.avatarColor}">{t.avatarLetter}</span
								>
								<div class="text-left">
									<p class="text-xs font-bold text-slate-800">{t.clientName}</p>
									<p class="text-[10px] text-slate-400">{t.clientRole}</p>
								</div>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<div class="mb-12 text-center" use:reveal>
			<h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Pertanyaan Umum</h2>
		</div>

		<div class="space-y-2">
			{#each faqs as faq, i}
				<div
					class="overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-sm"
					use:reveal={{ delay: 60 + i * 60 }}
				>
					<button
						onclick={() => (faqOpen = faqOpen === i ? null : i)}
						class="flex w-full items-center justify-between gap-4 p-5 text-left"
					>
						<span class="text-sm font-semibold text-slate-900">{faq.q}</span>
						<ChevronDown
							size={16}
							class="shrink-0 text-slate-400 transition-transform duration-200 {faqOpen === i
								? 'rotate-180'
								: ''}"
						/>
					</button>
					{#if faqOpen === i}
						<div
							transition:slide={{ duration: 250, easing: cubicOut }}
							class="px-5 pb-5 text-sm leading-relaxed text-slate-600"
						>
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="get-started" class="px-4 py-20 sm:px-6 lg:px-8">
	<div
		class="relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-8 py-16 shadow-xl sm:px-12 md:px-16"
		style="background-image: url('{bgMain}'); background-size: cover; background-position: center;"
		use:reveal
	>
		<!-- Dark Gradient Overlay agar teks putih terbaca tajam -->
		<div
			class="absolute inset-0 z-0 bg-gradient-to-t from-slate-950/90 via-slate-900/75 to-slate-900/60"
		></div>

		<!-- Main Content Container -->
		<div class="relative z-10 mx-auto max-w-2xl text-center">
			<h3 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
				Siap Digitalisasi Operasional Anda?
			</h3>
			<p class="mt-4 text-base text-slate-200">
				Mulai eksplorasi platform kami atau diskusikan kebutuhan sistem Anda bersama tim sales ahli
				kami.
			</p>

			<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
				<a
					href={whatsappLink}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-xl bg-[#0155FF] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-[#0145dd] active:scale-[0.98]"
				>
					<MessageSquare size={16} /> Hubungi Sales
				</a>
				<a
					href="#layanan"
					class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-[0.98]"
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
						<img
							src="/assets/logo.png"
							alt="AORTA"
							class="h-8 w-8 rounded"
							width="32"
							height="32"
						/>
					</picture>
					<span class="text-lg font-bold text-slate-900">PT AORTA DIGITAL SOLUSI</span>
				</div>
				<p class="text-sm leading-relaxed text-slate-500">
					Mitra transformasi digital dan pengembang software kustom untuk efisiensi operasional
					bisnis di Indonesia.
				</p>
				<!-- <a
					href="/tentang-kami"
					class="text-sm font-semibold text-[#0155FF] hover:underline"
				>
					Tentang Kami
				</a> -->
			</div>

			<!-- <div class="space-y-4">
				<h4 class="text-xs font-semibold tracking-wider text-slate-400 uppercase">Produk</h4>
				<ul class="space-y-2 text-sm text-slate-600">
					<li><a href="/products/simrs" class="hover:text-[#0155FF]">SIMRS Core Enterprise</a></li>
					<li><a href="/products/sim-klinik" class="hover:text-[#0155FF]">SIM Klinik Pratama & Utama</a></li>
					<li><a href="/products/hris" class="hover:text-[#0155FF]">HRIS Smart Corporate</a></li>
					<li><a href="/products/pos-inventory" class="hover:text-[#0155FF]">POS & Inventory</a></li>
				</ul>
			</div> -->

			<div class="space-y-4">
				<h4 class="text-xs font-semibold tracking-wider text-slate-400 uppercase">
					Solusi & Layanan
				</h4>
				<ul class="space-y-2 text-sm text-slate-600">
					<li>
						<a href="/layanan/custom-development" class="hover:text-[#0155FF]"
							>Pengembangan Software Kustom</a
						>
					</li>
					<li>
						<a href="/layanan/enterprise-erp" class="hover:text-[#0155FF]"
							>Sistem ERP &amp; Integrasi Bisnis</a
						>
					</li>
					<li>
						<a href="/layanan/hris-payroll" class="hover:text-[#0155FF]"
							>HRIS &amp; Otomatisasi Payroll</a
						>
					</li>
					<li>
						<a href="/layanan/simrs-simklinik" class="hover:text-[#0155FF]"
							>SIMRS &amp; SIM Klinik</a
						>
					</li>
					<li>
						<a href="/layanan/pos-inventory" class="hover:text-[#0155FF]"
							>POS &amp; Manajemen Inventaris</a
						>
					</li>
				</ul>
			</div>

			<!-- <div class="space-y-4">
				<h4 class="text-xs font-semibold tracking-wider text-slate-400 uppercase">Regulasi</h4>
				<ul class="space-y-2 text-sm text-slate-600">
					<li class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> SatuSehat Ready
					</li>
					<li class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Bridging BPJS
					</li>
				</ul>
			</div> -->

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

			<div class="pt-2">
				<p class="mb-2.5 text-xs font-medium text-slate-400">Ikuti Kami:</p>
				<div class="flex items-center gap-2">
					<!-- WhatsApp -->
					<a
						href={whatsappLink}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="WhatsApp"
						class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95"
					>
						<svg
							viewBox="0 0 24 24"
							class="h-4.5 w-4.5 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
							/></svg
						>
					</a>

					<!-- Instagram -->
					<a
						href="https://instagram.com/aortadigitalsolusi"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-pink-500 hover:bg-pink-50 hover:text-pink-600 active:scale-95"
					>
						<Instagram size={16} />
					</a>

					<!-- Email -->
					<a
						href="mailto:aortadigitalsolusi@gmail.com"
						aria-label="Email"
						class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-[#0155FF] hover:bg-blue-50 hover:text-[#0155FF] active:scale-95"
					>
						<Mail size={16} />
					</a>
				</div>
			</div>
		</div>

		<div
			class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row"
		>
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
