<script>
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Data penjelasan urgensi Aorta
	const slides = [
		{
			title: 'CUSTOM APP & ERP ENGINE',
			subtitle: 'Build Your Own Business App',
			desc: 'Setiap bisnis memiliki alur kerja unik yang tidak bisa dipaksa masuk ke dalam template software kaku. Melalui ekosistem arsitektur modular Aorta, Anda bertindak sebagai arsiteknya. Bebas pilih, rakit, dan aktifkan aplikasi apa pun yang Anda butuhkan—mulai dari absensi staf, kasir multi-outlet, akuntansi, hingga rekam medis—semuanya tersinkronisasi sempurna dalam satu database terpadu skala enterprise.',
			svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
			color: '#0155FF'
		},
		{
			title: 'SISTEM INFORMASI MANAJEMEN RUMAH SAKIT',
			subtitle: 'Centralize Healthcare Flow',
			desc: 'Kekacauan administrasi dan data pasien yang tercecer adalah mimpi buruk operasional Rumah Sakit. SIMRS Aorta hadir menyatukan seluruh departemen—mulai dari IGD, rawat jalan, rawat inap, hingga bagian keuangan—ke dalam satu ekosistem digital terpadu. Dengan Rekam Medis Elektronik (EMR) yang tersinkronisasi secara real-time, Anda dapat mempersingkat waktu pelayanan pasien, memangkas antrean, serta memastikan kepatuhan regulasi lewat sistem yang 100% siap bridging dengan SatuSehat Kemenkes.',
			svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M3 9V5a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M12 12v6"/><path d="M9 15h6"/></svg>',
			color: '#0155FF'
		},
		{
			title: 'SISTEM INFORMASI MANAJEMEN KLINIK',
			subtitle: 'Streamline Patient Journey',
			desc: 'Banyak klinik kehilangan pasien potensial hanya karena proses pendaftaran yang lambat dan birokrasi klaim yang rumit. SIM Klinik Aorta mendesain ulang seluruh perjalanan pasien dari hulu ke hilir lewat otomatisasi booking online, pengelolaan antrean mandiri, hingga bridging klaim BPJS Kesehatan yang bebas hambatan. Solusi ini dirancang khusus untuk meminimalkan human error dalam pencatatan medis, mempercepat perputaran pasien, dan menutup rapat setiap celah kebocoran biaya operasional harian Anda.',
			svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
			color: '#00C2CB'
		},
		{
			title: 'HUMAN RESOURCE INFORMATION SYSTEM',
			subtitle: 'Smart Workforce Management',
			desc: 'Mengelola karyawan dengan cara manual adalah resep instan untuk kekacauan operasional dan konflik internal. HRIS Aorta menyederhanakan manajemen SDM Anda melalui otomatisasi absensi berbasis GPS/biometrik, penjadwalan shift kerja yang fleksibel, hingga pengajuan cuti dan reimbursement tanpa kertas. Dilengkapi kalkulator payroll otomatis yang memproses gaji, lembur, BPJS, dan PPh 21 secara presisi dalam hitungan menit, sistem ini membebaskan tim HR Anda dari beban administratif harian untuk fokus pada retensi talenta terbaik.',
			svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
			color: '#1E293B'
		},
		{
			title: 'POINT OF SALE (POS) & INVENTORY',
			subtitle: 'Seamless Transactions, Absolute Control',
			desc: 'Kebocoran kasir, selisih stok barang, dan lambatnya antrean pembayaran adalah musuh utama pertumbuhan bisnis retail maupun F&B Anda. POS Aorta hadir sebagai solusi kasir pintar yang mempercepat transaksi lewat integrasi e-payment (QRIS & Virtual Account) dan pencatatan instan. Lebih dari sekadar mesin kasir, sistem ini mengotomatisasi manajemen inventori multi-gudang, memberikan peringatan otomatis saat stok menipis, serta menyajikan laporan keuangan real-time langsung ke ponsel Anda.',
			svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M8 10h8"/><path d="M8 14h5"/><path d="M8 6h8v4H8V6z"/><path d="M16 18a2 2 0 100-4 2 2 0 000 4z"/></svg>',
			color: '#EA580C'
		}
	];

	let activeIndex = 0;
	let displayedDesc = '';
	let typingInterval;
	let progress = 0;

	// Fungsi handle efek ngetik per karakter
	const startTyping = (text) => {
		clearInterval(typingInterval);
		displayedDesc = '';
		let i = 0;

		typingInterval = setInterval(() => {
			if (i < text.length) {
				displayedDesc += text.charAt(i);
				i++;
			} else {
				clearInterval(typingInterval);
			}
		}, 20); // Kecepatan ngetik (ms per karakter)
	};

	onMount(() => {
		// Hormati preferensi reduced-motion: tampilkan teks penuh tanpa animasi ketik/slide
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			displayedDesc = slides[0].desc;
			return;
		}

		// Jalankan ketikan pertama pas mount
		startTyping(slides[activeIndex].desc);

		// Loop slide & progress bar
		const coreInterval = setInterval(() => {
			progress += 1;
			if (progress >= 100) {
				progress = 0;
				activeIndex = (activeIndex + 1) % slides.length;
				startTyping(slides[activeIndex].desc);
			}
		}, 150); // Total waktu per slide +- 6 detik

		return () => {
			clearInterval(coreInterval);
			clearInterval(typingInterval);
		};
	});
</script>

<div
	class="bg-texture relative min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 selection:bg-[#00C2CB] selection:text-white"
>
	<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<div
			class="absolute top-[-10%] left-[-10%] h-[50vh] w-[80vw] rounded-full bg-gradient-to-tr from-[#0155FF]/10 to-transparent blur-[140px]"
		></div>
		<div
			class="absolute top-[20%] right-[-20%] h-[60vh] w-[60vw] rounded-full bg-gradient-to-br from-[#00C2CB]/10 to-transparent blur-[160px]"
		></div>
	</div>

	<div class="relative z-10">
		<section
			class="relative flex min-h-[80vh] items-center overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24"
		>
			<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
				<div
					class="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#00C2CB]/5 blur-[120px]"
				></div>
				<div
					class="absolute bottom-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-[#0155FF]/5 blur-[150px]"
				></div>
			</div>

			<div
				class="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"
			>
				<div class="space-y-6 text-left">
					<h1
						in:fly={{ y: 30, duration: 800, delay: 200 }}
						class="text-4xl leading-[1.15] font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
					>
						Solusi Digital Terpadu Untuk <span class="text-[#0155FF]"
							>Segala Jenis Kebutuhan Bisnis Anda</span
						>
					</h1>

					<p
						in:fly={{ y: 20, duration: 800, delay: 400 }}
						class="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg"
					>
						Optimalkan operasional bisnis anda dengan sistem informasi terintegrasi yang modern,
						aman, dan efisien
					</p>

					<div in:fly={{ y: 20, duration: 800, delay: 600 }} class="flex flex-wrap gap-4 pt-2">
						<a
							href={whatsappLink}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center rounded-full bg-[#0155FF] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-98"
						>
							Konsultasi Sekarang
						</a>
						<a
							href="#layanan"
							class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:border-[#0155FF] hover:text-[#0155FF] active:scale-98"
						>
							Lihat Demo
						</a>
					</div>
				</div>

				<div
					class="relative flex min-h-[250px] w-full max-w-xl flex-col justify-between border-slate-200/60 lg:border-l-2 lg:pl-6"
				>
					<div
						class="pointer-events-none absolute top-10 -left-10 h-32 w-32 rounded-full bg-[#0155FF]/5 blur-3xl"
					></div>

					{#key activeIndex}
						<div class="space-y-6">
							<div class="flex items-center gap-4" in:fly={{ y: 15, duration: 500 }}>
								<div class="flex h-12 w-12 items-center justify-center text-[#0155FF]">
									{@html slides[activeIndex].svg}
								</div>
								<div class="flex flex-col">
									<span class="text-[16px] font-black tracking-widest text-[#0155FF] uppercase"
										>{slides[activeIndex].title}</span
									>
								</div>
							</div>

							<h3
								class="text-2xl font-black tracking-tight text-slate-900"
								in:fly={{ y: 10, duration: 500, delay: 50 }}
							>
								{slides[activeIndex].subtitle}
							</h3>

							<p
								class="relative min-h-[100px] text-base leading-relaxed font-medium text-slate-600"
							>
								{displayedDesc}<span
									class="animate-blink ml-1 inline-block h-4 w-2 bg-[#00C2CB] align-middle"
								></span>
							</p>
						</div>
					{/key}
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	/* CSS Grid Arsitektur Semitransparan */
	.bg-texture {
		background-image:
			linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
		background-size: 50px 50px;
		background-position: center top;
		mask-image: radial-gradient(circle at 50% 30%, black 60%, transparent 95%);
		-webkit-mask-image: radial-gradient(circle at 50% 30%, black 60%, transparent 95%);
	}

	/* Animasi kursor ngetik kedip-kedip */
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
	:global(.animate-blink) {
		animation: blink 0.8s infinite steps(1);
	}
</style>
