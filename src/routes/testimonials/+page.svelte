<script>
	const testimonials = [
		{
			quote:
				'Tim AORTA membangun platform eLearning/LMS untuk daycare di Jepang sesuai kebutuhan. Responsif, tepat waktu, dan sistemnya stabil. Puas dengan hasilnya.',
			name: 'Tim Kaigopedia',
			role: 'kaigopedia.com',
			avatar: 'K',
			color: 'bg-emerald-500',
			project: 'Platform eLearning / LMS untuk Daycare di Jepang'
		}
	];
</script>

<svelte:head>
	<title>Testimoni Klien — AORTA</title>
	<meta
		name="description"
		content="Lihat apa kata klien AORTA tentang pengalaman mereka menggunakan SIMRS, SIM Klinik, HRIS, dan jasa pembuatan software custom."
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://aorta.my.id/testimonials" />
	<meta property="og:title" content="Testimoni Klien — AORTA" />
	<meta
		property="og:description"
		content="Lihat apa kata klien AORTA tentang pengalaman mereka menggunakan SIMRS, SIM Klinik, HRIS, dan jasa pembuatan software custom."
	/>
	<meta property="og:url" content="https://aorta.my.id/testimonials" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="min-h-screen bg-slate-50">
	<section class="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
		<div class="mb-12 space-y-3 text-center">
			<span
				class="inline-block rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#0155FF] uppercase"
				>TESTIMONI</span
			>
			<h1 class="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
				Apa Kata <span class="text-[#0155FF]">Klien Kami</span>
			</h1>
			<p class="mx-auto max-w-lg text-sm font-medium text-slate-600">
				Kepuasan klien adalah prioritas utama kami. Berikut pengalaman mereka setelah menggunakan
				layanan AORTA.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
			{#each testimonials as t}
				<div
					class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(1,85,255,0.1)]"
				>
					<div class="mb-6 flex items-center gap-1 text-amber-400">
						{#each Array(5) as _}
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
								/>
							</svg>
						{/each}
					</div>

					<blockquote class="mb-8 text-sm leading-relaxed font-medium text-slate-600">
						"{t.quote}"
					</blockquote>

					<div class="flex items-center gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full {t.color} text-sm font-black text-white"
						>
							{t.avatar}
						</div>
						<div>
							<p class="text-sm font-bold text-slate-900">{t.name}</p>
							<p class="text-xs font-medium text-slate-500">{t.role}</p>
						</div>
					</div>

					<div class="mt-4 rounded-lg bg-slate-50 px-3 py-2">
						<p class="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Proyek</p>
						<p class="text-xs font-semibold text-slate-700">{t.project}</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-16 border-t border-slate-200 pt-12 text-center">
			<p class="mb-4 text-sm font-semibold text-slate-500">Ingin pengalaman yang sama?</p>
			<a
				href="https://wa.me/6289629949441?text=Halo%20saya%20ingin%20konsultasi%20proyek%20software"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-xl bg-[#0155FF] px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:opacity-90 active:scale-95"
			>
				Konsultasi Gratis via WhatsApp
			</a>
		</div>
	</section>
</div>
