<script>
	import { Target, Compass, CheckCircle2 } from 'lucide-svelte';

	const missions = [
		'Mengembangkan software kustom yang menjawab kebutuhan & tantangan operasional.',
		'Menerapkan praktik software engineering terbaik untuk keamanan & performa.',
		'Memangkas proses manual lewat integrasi & otomatisasi alur kerja digital.',
		'Menjalin kemitraan jangka panjang melalui dukungan teknis yang responsif.'
	];
</script>

<section class="px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="grid items-start gap-12 lg:grid-cols-2">
			<!-- KIRI: Narasi Tentang Kami -->
			<div class="space-y-5 text-base leading-relaxed text-slate-700">
				<h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
					Tentang <span class="text-[#0155FF]">Aorta Digital Solusi</span>
				</h2>
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
				<!-- <a
					href="/tentang-kami"
					class="inline-flex items-center gap-2 text-sm font-semibold text-[#0155FF] hover:underline"
				>
					Selengkapnya tentang kami →
				</a> -->
			</div>

			<!-- KANAN: Visi & Misi (Simpel & Minimalis) -->
			<div class="space-y-4">
				<!-- Card Visi -->
				<div class="rounded-xl border border-slate-200 bg-white p-6">
					<div class="mb-3 flex items-center gap-3">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0155FF]">
							<Target size={18} />
						</div>
						<h3 class="text-lg font-bold text-slate-900">Visi Kami</h3>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						Menjadi <em>software house</em> terpercaya yang menjadi pusat pergerakan digitalisasi bisnis di Indonesia melalui solusi perangkat lunak kustom yang andal, efisien, dan berdampak nyata.
					</p>
				</div>

				<!-- Card Misi -->
				<div class="rounded-xl border border-slate-200 bg-white p-6">
					<div class="mb-4 flex items-center gap-3">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0155FF]">
							<Compass size={18} />
						</div>
						<h3 class="text-lg font-bold text-slate-900">Misi Kami</h3>
					</div>
					<ul class="space-y-3">
						{#each missions as item}
							<li class="flex items-start gap-2.5 text-sm text-slate-600">
								<CheckCircle2 size={16} class="mt-0.5 shrink-0 text-[#0155FF]" />
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>