<script>
	let openIndex = $state(null);

	const faqs = [
		{
			q: 'Apakah sistem AORTA bisa di-custom?',
			a: 'Bisa. Semua produk AORTA — SIMRS, SIM Klinik, HRIS, dan POS — bisa dikustomisasi sesuai kebutuhan operasional Anda. Mulai dari alur kerja, tampilan, laporan, hingga integrasi dengan sistem pihak ketiga. Tim kami akan mendengar kebutuhan Anda lalu merancang solusi yang tepat, bukan memaksakan template yang kaku.'
		},
		{
			q: 'Apakah AORTA menerima jasa pembuatan aplikasi selain produk yang sudah ada?',
			a: 'Ya. Selain produk standar, kami juga menerima jasa pembuatan aplikasi custom — ERP, sistem inventori, portal e-learning, aplikasi pelayanan publik, dan lainnya. Ceritakan kebutuhan Anda, kami bantu rancang dan bangun dari nol hingga launching.'
		},
		{
			q: 'Berapa lama proses implementasi sistem?',
			a: 'Tergantung kompleksitas. SIM Klinik biasanya selesai dalam 14–21 hari, termasuk setup, migrasi data, dan training staf. SIMRS untuk rumah sakit butuh 2–6 bulan tergantung modul yang diaktifkan. Untuk aplikasi custom, durasi disepakati setelah analisis kebutuhan.'
		},
		{
			q: 'Apakah sudah terintegrasi BPJS dan SatuSehat?',
			a: 'Ya. Bridging BPJS (VClaim) dan integrasi SatuSehat sudah termasuk dalam paket — bukan biaya tambahan. Sistem kami mengikuti regulasi Kemenkes terbaru dan di-update otomatis jika ada perubahan aturan.'
		},
		{
			q: 'Bagaimana support setelah sistem berjalan?',
			a: 'Kami memberikan SLA tertulis dengan jaminan waktu respons. Support tersedia 24/7 via WhatsApp, telepon, dan tiket. Setiap masalah akan ditangani oleh dedicated engineer yang memahami sistem Anda. Update fitur dan patch keamanan juga berjalan otomatis tanpa biaya tambahan.'
		}
	];

	function toggle(i) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<svelte:head>
	<title>FAQ — Pertanyaan Umum Seputar AORTA</title>
	<meta name="description" content="Jawaban atas pertanyaan umum seputar produk AORTA: SIMRS, SIM Klinik, HRIS, custom software, harga, support, dan migrasi." />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://aorta.my.id/faq" />
	<meta property="og:title" content="FAQ — Pertanyaan Umum Seputar AORTA" />
	<meta property="og:description" content="Jawaban atas pertanyaan umum seputar produk AORTA: SIMRS, SIM Klinik, HRIS, custom software, harga, support, dan migrasi." />
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

<div class="min-h-screen bg-slate-50">
	<section class="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
		<div class="mb-12 space-y-3 text-center">
			<span class="inline-block rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#0155FF] uppercase">FAQ</span>
			<h1 class="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Pertanyaan <span class="text-[#0155FF]">Umum</span></h1>
			<p class="mx-auto max-w-lg text-sm font-medium text-slate-600">Jawaban atas pertanyaan yang paling sering ditanyakan seputar produk dan layanan AORTA.</p>
		</div>

		<div class="space-y-3">
			{#each faqs as faq, i}
				<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-md">
					<button onclick={() => toggle(i)} class="flex w-full items-center justify-between gap-4 p-5 text-left">
						<span class="text-sm font-bold text-slate-900">{faq.q}</span>
						<span class="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-300 {openIndex === i ? 'rotate-45' : ''}">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
							</svg>
						</span>
					</button>
					{#if openIndex === i}
						<div class="px-5 pb-5 text-sm leading-relaxed font-medium text-slate-600">
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="mt-16 text-center">
			<p class="mb-4 text-sm font-semibold text-slate-500">Pertanyaan lain?</p>
			<a href="https://wa.me/6289629949441?text=Halo%20saya%20punya%20pertanyaan" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-[#0155FF] px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:opacity-90 active:scale-95">
				Hubungi Kami via WhatsApp
			</a>
		</div>
	</section>
</div>
