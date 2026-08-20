<script>
	import { ChartNoAxesCombined, Settings, Shield, Plug } from 'lucide-svelte';

	const features = [
		{
			title: 'Laporan Otomatis',
			desc: 'Pendapatan harian, stok, dan beban kerja staf tersaji otomatis. Tidak perlu rekap manual menunggu akhir bulan.',
			icon: ChartNoAxesCombined,
			layoutClass: 'lg:col-span-2'
		},
		{
			title: 'Alur Kerja Berjalan Sendiri',
			desc: 'Payroll dengan PPh 21, resep obat, dan pesanan ke supplier diproses otomatis mengikuti aturan yang Anda tentukan.',
			icon: Settings,
			layoutClass: 'lg:col-span-2'
		},
		{
			title: 'Data Terkunci Aman',
			desc: 'Data pasien dan karyawan dienkripsi. Hak akses diatur per peran, dan setiap aktivitas pengguna tercatat.',
			icon: Shield,
			layoutClass: 'lg:col-span-2'
		},
		{
			title: 'Terhubung ke Sistem Resmi',
			desc: 'Bridging SatuSehat Kemenkes, klaim BPJS (VClaim), dan pembayaran QRIS/e-wallet terintegrasi langsung di sistem.',
			icon: Plug,
			layoutClass: 'lg:col-span-2'
		}
	];
</script>

<section id="features" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
	<div class="mb-12 max-w-3xl space-y-3 text-left">
		<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
			Empat Kemampuan Inti AORTA
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
