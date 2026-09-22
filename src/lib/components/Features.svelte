<script>
	import { ChartNoAxesCombined, Settings, Shield, Plug } from 'lucide-svelte';

	const features = [
		{
			title: 'Rekap Keuangan Otomatis',
			desc: 'Laba/rugi, stok & beban staf keluar sendiri tiap hari. Tutup buku tanpa lembur.',
			icon: ChartNoAxesCombined
		},
		{
			title: 'Payroll & Resep Jalan',
			desc: 'Gaji + PPh 21, resep obat & order supplier diproses otomatis tanpa salah hitung.',
			icon: Settings
		},
		{
			title: 'Data Terkunci Aman',
			desc: 'Enkripsi berlapis, hak akses per peran, audit trail lengkap — siap audit Kemenkes.',
			icon: Shield
		},
		{
			title: 'Bridging Resmi Sekali Jadi',
			desc: 'SatuSehat, VClaim BPJS & QRIS terhubung langsung — klaim tidak ditolak lagi.',
			icon: Plug
		}
	];
</script>

<section id="features" class="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mb-12 max-w-2xl">
			<h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
				Keunggulan AORTA
			</h2>
			<p class="mt-3 text-base text-slate-600">
				Semua modul berjalan dalam satu database. Data masuk sekali, laporan keluar otomatis.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each features as f}
				<div class="rounded-xl border border-slate-200 bg-white p-6">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#0155FF]">
						<f.icon size={20} />
					</div>
					<h3 class="text-base font-bold text-slate-900">{f.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
