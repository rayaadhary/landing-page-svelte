<script>
	import { ChartNoAxesCombined, Settings, Shield, Plug } from 'lucide-svelte';

	const features = [
		{
			title: 'Rekap Keuangan Selesai Otomatis',
			desc: 'Tutup buku tanpa lembur jam 11 malam. Laba/rugi, stok & beban staf keluar sendiri tiap hari.',
			icon: ChartNoAxesCombined,
			layoutClass: 'lg:col-span-2'
		},
		{
			title: 'Payroll & Resep Jalan Sendiri',
			desc: 'Gaji + PPh 21, resep obat & order supplier diproses otomatis — tanpa salah hitung.',
			icon: Settings,
			layoutClass: 'lg:col-span-2'
		},
		{
			title: 'Data Pasien Terkunci Aman',
			desc: 'Enkripsi berlapis, hak akses per peran, audit trail lengkap — siap audit Kemenkes.',
			icon: Shield,
			layoutClass: 'lg:col-span-2'
		},
		{
			title: 'Lolos Bridging Resmi Sekali Jadi',
			desc: 'SatuSehat, VClaim BPJS & QRIS terhubung langsung — klaim tidak ditolak lagi.',
			icon: Plug,
			layoutClass: 'lg:col-span-2'
		}
	];
</script>

<section id="features" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
	<div class="mb-12 max-w-3xl space-y-3 text-left">
		<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
			Keunggulan AORTA
		</h2>
		<p class="text-sm leading-relaxed font-medium text-slate-500">
			Semua modul berjalan dalam satu database. Data masuk sekali, laporan, klaim, dan pembayaran
			keluar otomatis.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each features as f}
			<div
				class="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_4px_20px_rgba(15,23,42,0.03)] {f.layoutClass}"
			>
				<div class="space-y-4">
					<div
						class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0155FF] text-white shadow-md shadow-blue-500/20"
					>
						<svelte:component this={f.icon} size={20} strokeWidth={2.5} />
					</div>

					<h3 class="text-lg font-black tracking-tight text-slate-900">
						{f.title}
					</h3>
				</div>

				<p class="mt-4 text-sm leading-relaxed font-medium text-slate-600">
					{f.desc}
				</p>
			</div>
		{/each}
	</div>
</section>
