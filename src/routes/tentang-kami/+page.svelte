<script>
	import { Shield, Cpu, Users } from 'lucide-svelte';

	const values = [
		{
			icon: Cpu,
			title: 'Engine of Transformation',
			desc: 'Kami menjadi pusat aliran teknologi yang menggerakkan seluruh ekosistem operasional perusahaan Anda secara optimal.'
		},
		{
			icon: Shield,
			title: 'Dibangun dari Nol',
			desc: 'Setiap solusi dirancang fleksibel sesuai skala dan kompleksitas bisnis, tanpa batasan template kaku.'
		},
		{
			icon: Users,
			title: 'Berpengalaman',
			desc: 'Berpengalaman merancang, membangun, dan menguji sistem kustom — dari ERP, HRIS, SIMRS, hingga POS.'
		}
	];
</script>

<svelte:head>
	<title>Tentang Kami | AORTA - Aorta Digital Solusi</title>
	<meta
		name="description"
		content="PT Aorta Digital Solusi — pendorong utama transformasi digital bisnis Anda. Spesialis custom software: ERP, HRIS, SIMRS, SIM Klinik, POS & Inventory."
	/>
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="Tentang Kami | AORTA - Aorta Digital Solusi" />
	<meta
		property="og:description"
		content="PT Aorta Digital Solusi — pendorong utama transformasi digital bisnis Anda. Spesialis custom software untuk bisnis Indonesia."
	/>
	<meta property="og:image" content="https://aorta.my.id/assets/og-default.jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aorta.my.id/tentang-kami" />
	<meta property="og:locale" content="id_ID" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Tentang Kami | AORTA - Aorta Digital Solusi" />
	<meta
		name="twitter:description"
		content="PT Aorta Digital Solusi — pendorong utama transformasi digital bisnis Anda."
	/>
	<meta name="twitter:image" content="https://aorta.my.id/assets/og-default.jpg" />
	<link rel="canonical" href="https://aorta.my.id/tentang-kami" />
</svelte:head>

<section class="bg-white px-4 pt-20 pb-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
				Tentang <span class="text-[#0155FF]">Aorta Digital Solusi</span>
			</h1>
			<p class="mt-6 text-lg leading-relaxed text-slate-600">
				Pendorong utama transformasi digital bisnis Anda — mengalirkan teknologi ke seluruh
				ekosistem operasional perusahaan.
			</p>
		</div>
	</div>
</section>

<section class="px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl space-y-8">
		<div class="space-y-5 text-base leading-relaxed text-slate-700">
			<p>
				Di era di mana kecepatan dan efisiensi menjadi kunci, <strong class="text-slate-900">PT Aorta Digital Solusi</strong>
				hadir sebagai pendorong utama (engine) transformasi digital bisnis Anda. Sesuai dengan nama
				"Aorta"—pembuluh darah utama yang mengalirkan kehidupan ke seluruh tubuh—kami berkomitmen
				menjadi pusat aliran teknologi yang menggerakkan seluruh ekosistem operasional perusahaan
				Anda secara optimal.
			</p>
			<p>
				Kami berpengalaman merancang, membangun, dan menguji sistem kustom (custom software) sesuai
				skala dan kompleksitas bisnis. Mulai dari sistem ERP kustom, HRIS &amp; Payroll, SIMRS / SIM
				Klinik, hingga POS &amp; Smart Inventory, setiap solusi dirancang fleksibel dari nol tanpa
				batasan template kaku.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
			{#each values as v}
				<div class="rounded-xl border border-slate-200 bg-white p-6">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#0155FF]">
						<svelte:component this={v.icon} size={20} />
					</div>
					<h3 class="text-base font-bold text-slate-900">{v.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
