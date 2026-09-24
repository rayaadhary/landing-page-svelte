<script>
	import { slide } from 'svelte/transition';
	import { Plus, Minus, MessageCircle } from 'lucide-svelte';
	import bgMain3 from '$lib/assets/bg_main3.jpg'; // Sesuaikan path asset milikmu

	let openIndex = $state(null);

	const faqs = [
		{
			q: 'Apakah sistem & software dari AORTA bisa di-custom?',
			a: 'Sangat bisa. Sebagai penyedia jasa pembuatan software custom, semua produk AORTA — mulai dari SIMRS, SIM Klinik, HRIS, hingga POS & Inventory — bisa disesuaikan dengan alur bisnis Anda. Kami merancang solusi yang fleksibel tanpa memaksakan template rigid.'
		},
		{
			q: 'Apakah AORTA menerima jasa pembuatan aplikasi & sistem informasi kustom dari nol?',
			a: 'Ya, kami adalah developer aplikasi perusahaan yang berpengalaman dalam pengembangan sistem informasi custom, ERP, sistem inventory warehouse, portal e-learning, hingga aplikasi sekolah dan instansi publik dari tahap perancangan hingga rilis.'
		},
		{
			q: 'Berapa lama estimasi proses pembuatan dan implementasi sistem?',
			a: 'Tergantung kompleksitas modul. Untuk aplikasi klinik atau POS kasir standar biasanya memakan waktu 14–21 hari. Sedangkan SIMRS rumah sakit atau sistem ERP perusahaan butuh 2–6 bulan. Untuk aplikasi custom lainnya, estimasi waktu ditentukan setelah analisis kebutuhan awal.'
		},
		{
			q: 'Apakah sistem aplikasi klinik & SIMRS AORTA sudah terintegrasi BPJS dan SatuSehat?',
			a: 'Sudah terintegrasi penuh. Fitur Bridging BPJS (VClaim/e-SEP) dan integrasi Kemenkes SatuSehat sudah termasuk dalam paket layanan utama. Sistem akan otomatis diperbarui mengikuti penyesuaian regulasi terbaru.'
		},
		{
			q: 'Bagaimana layanan dukungan teknis & support setelah sistem beroperasi?',
			a: 'Kami memberikan jaminan Service Level Agreement (SLA) tertulis. Support teknis siap membantu 24/7 melalui WhatsApp, telepon, maupun dedicated ticket. Update fitur dasar dan patch keamanan berkala berjalan otomatis.'
		}
	];

	function toggle(i) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<svelte:head>
	<title>FAQ — Jasa Pembuatan Software Custom & Sistem Informasi | AORTA</title>
	<meta name="description" content="Jawaban atas pertanyaan umum seputar jasa pembuatan aplikasi custom, SIMRS, aplikasi klinik BPJS SatuSehat, HRIS, estimasi waktu, dan support teknis AORTA." />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://aorta.my.id/faq" />
	<meta property="og:title" content="FAQ — Jasa Pembuatan Software Custom & Sistem Informasi | AORTA" />
	<meta property="og:description" content="Jawaban atas pertanyaan umum seputar jasa pembuatan aplikasi custom, SIMRS, aplikasi klinik BPJS SatuSehat, HRIS, dan support AORTA." />
	<meta property="og:url" content="https://aorta.my.id/faq" />
	<meta property="og:type" content="website" />
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "FAQPage",
			"mainEntity": faqs.map(f => ({
				"@type": "Question",
				"name": f.q,
				"acceptedAnswer": { "@type": "Answer", "text": f.a }
			}))
		})}
	</script>
</svelte:head>

<!-- Ambient Background Glow -->
<div class="pointer-events-none fixed inset-0 -z-10 bg-slate-50/50">
	<div class="absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-full max-w-5xl bg-[radial-gradient(ellipse_at_top,rgba(1,85,255,0.05),transparent_70%)]"></div>
</div>

<div class="min-h-screen">
	<section class="mx-auto max-w-3xl px-4 pt-20 pb-24 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-12 space-y-3 text-center">
			<span class="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0155FF]">
				Tanya Jawab
			</span>
			<h1 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
				Pertanyaan <span class="text-[#0155FF]">Umum</span>
			</h1>
			<p class="mx-auto max-w-lg text-xs font-medium text-slate-500 sm:text-sm">
				Informasi ringkas seputar jasa pembuatan software custom, modul sistem informasi, hingga dukungan teknis AORTA.
			</p>
		</div>

		<!-- Accordion List -->
		<div class="space-y-3">
			{#each faqs as faq, i}
				<div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-200 hover:border-slate-300">
					<button 
						onclick={() => toggle(i)} 
						class="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50/50"
						aria-expanded={openIndex === i}
					>
						<span class="text-sm font-semibold text-slate-900 sm:text-base">{faq.q}</span>
						<span class="shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-colors {openIndex === i ? 'bg-blue-50 text-[#0155FF] border-blue-200' : ''}">
							{#if openIndex === i}
								<Minus size={14} />
							{:else}
								<Plus size={14} />
							{/if}
						</span>
					</button>

					{#if openIndex === i}
						<div transition:slide={{ duration: 250 }} class="border-t border-slate-100 px-5 pt-3 pb-5 text-xs sm:text-sm leading-relaxed text-slate-600">
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Bottom CTA Card dengan bgMain3 -->
		<div class="mt-16">
			<div class="relative overflow-hidden rounded-2xl border border-slate-800 px-6 py-8 sm:px-10">
				<!-- Background Image dengan Gradient Overlay -->
				<div class="absolute inset-0 -z-10">
					<img
						src={bgMain3}
						alt="Background"
						class="h-full w-full object-cover object-center"
					/>
					<div class="absolute inset-0 z-0 bg-gradient-to-t from-slate-950/90 via-slate-900/80 to-slate-900/70"></div>
				</div>

				<!-- Content -->
				<div class="relative z-10 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
					<div class="space-y-1">
						<h3 class="text-base font-semibold text-white sm:text-lg">
							Punya pertanyaan spesifik lainnya?
						</h3>
						<p class="text-xs text-slate-300">
							Tim technical consultant kami siap mendiskusikan kebutuhan sistem Anda.
						</p>
					</div>

					<div class="mt-6 sm:mt-0 sm:shrink-0">
						<a
							href="https://wa.me/6289629949441?text=Halo%20saya%20punya%20pertanyaan%20seputar%20layanan%20AORTA"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 transition-all hover:bg-slate-100 active:scale-[0.98]"
						>
							<MessageCircle size={15} />
							<span>Tanya via WhatsApp</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>