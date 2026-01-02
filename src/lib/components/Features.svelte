<script>
	const features = [
		{
			title: 'Pantau Bisnis Detik Ini',
			desc: 'Data akurat yang tersaji instan, tanpa perlu tunggu laporan akhir bulan.',
			icon: '📊'
		},
		{
			title: 'Kerja Otomatis, Tim Efisien',
			desc: 'Biarkan sistem urus tugas rutin. Tim Anda bisa fokus ke hal yang lebih krusial.',
			icon: '⚙️'
		},
		{
			title: 'Keamanan Lapis Baja',
			desc: 'Privasi data klien terlindungi dengan enkripsi standar internasional.',
			icon: '🛡️'
		},
		{
			title: 'Ekosistem Tanpa Batas',
			desc: 'Satu sistem yang nyambung ke semua aplikasi yang sudah Anda gunakan.',
			icon: '🔌'
		}
	];
</script>

<section id="features" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="text-center">
		<h2 class="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Fitur Utama</h2>
		<p class="mt-3 text-neutral-600">Dirancang untuk kebutuhan perusahaan modern.</p>
	</div>
	<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each features as f}
			<div class="rounded-xl bg-white p-6 ring-1 ring-neutral-200">
				<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-lg">
					{f.icon}
				</div>
				<div class="mt-4 font-medium text-neutral-900">{f.title}</div>
				<div class="mt-2 text-sm text-neutral-600">{f.desc}</div>
			</div>
		{/each}
	</div>
</section>
