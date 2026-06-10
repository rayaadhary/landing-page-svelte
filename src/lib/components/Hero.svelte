<script>
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Data penjelasan urgensi Aorta
	const slides = [
    		{
   			title: 'SISTEM INFORMASI MANAJEMEN RUMAH SAKIT',
   			subtitle: 'Centralize Healthcare Flow',
   			desc: 'Kekacauan administrasi dan data pasien yang tercecer adalah mimpi buruk operasional Rumah Sakit. SIMRS Aorta hadir menyatukan seluruh departemen—mulai dari IGD, rawat jalan, rawat inap, hingga bagian keuangan—ke dalam satu ekosistem digital terpadu. Dengan Rekam Medis Elektronik (EMR) yang tersinkronisasi secara real-time, Anda dapat mempercepat waktu pelayanan pasien hingga 60%, memangkas antrean kaku, serta memastikan kepatuhan regulasi lewat sistem yang 100% siap bridging dengan SatuSehat Kemenkes.',
   			icon: 'local_hospital',
   			color: '#0155FF'
    		},
    		{
   			title: 'SISTEM INFORMASI MANAJEMEN KLINIK',
   			subtitle: 'Streamline Patient Journey',
   			desc: 'Banyak klinik kehilangan pasien potensial hanya karena proses pendaftaran yang lambat dan birokrasi klaim yang rumit. SIM Klinik Aorta mendesain ulang seluruh perjalanan pasien dari hulu ke hilir lewat otomatisasi booking online, pengelolaan antrean mandiri, hingga bridging klaim BPJS Kesehatan yang bebas hambatan. Solusi ini dirancang khusus untuk meminimalkan human error dalam pencatatan medis, mempercepat perputaran pasien, dan menutup rapat setiap celah kebocoran biaya operasional harian Anda.',
   			icon: 'medical_information',
   			color: '#00C2CB'
    		},
    		{
   			title: 'HUMAN RESOURCE INFORMATION SYSTEM',
   			subtitle: 'Smart Workforce Management',
   			desc: 'Mengelola karyawan dengan cara manual adalah resep instan untuk kekacauan operasional dan konflik internal. HRIS Aorta menyederhanakan manajemen SDM Anda melalui otomatisasi absensi berbasis GPS/biometrik, penjadwalan shift kerja yang fleksibel, hingga pengajuan cuti dan reimbursement tanpa kertas. Dilengkapi kalkulator payroll otomatis yang memproses gaji, lembur, BPJS, dan PPh 21 secara presisi dalam hitungan menit, sistem ini membebaskan tim HR Anda dari beban administratif harian untuk fokus pada retensi talenta terbaik.',
   			icon: 'groups',
   			color: '#1E293B'
    		},
    		{
   			title: 'POINT OF SALE (POS) & INVENTORY',
   			subtitle: 'Seamless Transactions, Absolute Control',
   			desc: 'Kebocoran kasir, selisih stok barang, dan lambatnya antrean pembayaran adalah musuh utama pertumbuhan bisnis retail maupun F&B Anda. POS Aorta hadir sebagai solusi kasir pintar yang mempercepat transaksi lewat integrasi e-payment (QRIS & Virtual Account) dan pencatatan instan. Lebih dari sekadar mesin kasir, sistem ini mengotomatisasi manajemen inventori multi-gudang, memberikan peringatan otomatis saat stok menipis, serta menyajikan laporan keuangan real-time langsung ke ponsel Anda.',
   			icon: 'receipt_long',
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

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-slate-50 bg-texture text-slate-900 font-sans selection:bg-[#00C2CB] selection:text-white overflow-x-hidden relative">
	
	<div class="absolute inset-0 pointer-events-none overflow-hidden -z-10">
		<div class="absolute top-[-10%] left-[-10%] w-[80vw] h-[50vh] rounded-full bg-gradient-to-tr from-[#0155FF]/10 to-transparent blur-[140px]"></div>
		<div class="absolute top-[20%] right-[-20%] w-[60vw] h-[60vh] rounded-full bg-gradient-to-br from-[#00C2CB]/10 to-transparent blur-[160px]"></div>
	</div>

	<main class="relative z-10">
		<section class="relative min-h-[80vh] flex items-center pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
			<div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
				<div class="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00C2CB]/5 blur-[120px]"></div>
				<div class="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#0155FF]/5 blur-[150px]"></div>
			</div>

			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				
				<div class="space-y-6 text-left">
					<h1 in:fly={{ y: 30, duration: 800, delay: 200 }} class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
						Solusi Digital Terpadu Untuk <span class="bg-gradient-to-r from-[#0155FF] to-[#00C2CB] bg-clip-text text-transparent">Segala Jenis Kebutuhan Bisnis Anda</span>
					</h1>
					
					<p in:fly={{ y: 20, duration: 800, delay: 400 }} class="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed">
						Optimalkan operasional bisnis anda dengan sistem informasi terintegrasi yang modern, aman, dan efisien
					</p>
					
					<div in:fly={{ y: 20, duration: 800, delay: 600 }} class="flex flex-wrap gap-4 pt-2">
						<a href={whatsappLink} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-gradient-to-r from-[#0155FF] to-[#00C2CB] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-500/25 transition-all duration-300 hover:opacity-95 hover:scale-[1.02] active:scale-98 text-sm">
							Konsultasi Sekarang
						</a>
						<a href="#layanan" class="inline-flex items-center justify-center border border-slate-200 bg-white/80 backdrop-blur-sm hover:border-[#0155FF] text-slate-700 hover:text-[#0155FF] px-8 py-4 rounded-full font-semibold transition-all shadow-sm active:scale-98 text-sm">
							Lihat Demo
						</a>
					</div>
				</div>

				<div class="flex flex-col justify-between min-h-[250px] relative w-full max-w-xl lg:pl-6 lg:border-l-2 border-slate-200/60">
					
					<div class="absolute -left-10 top-10 w-32 h-32 bg-[#0155FF]/5 rounded-full blur-3xl pointer-events-none"></div>

					{#key activeIndex}
					<div class="space-y-6">
						<div class="flex items-center gap-4" in:fly={{ y: 15, duration: 500 }}>
							<div class="h-12 w-12 flex items-center justify-center text-[#0155FF]">
								<span class="material-symbols-outlined text-2xl">{slides[activeIndex].icon}</span>
							</div>
							<div class="flex flex-col">
								<span class="text-[16px] font-black tracking-widest text-[#0155FF] uppercase">{slides[activeIndex].title}</span>
							</div>
						</div>

						<h3 class="text-2xl font-black text-slate-900 tracking-tight" in:fly={{ y: 10, duration: 500, delay: 50 }}>
							{slides[activeIndex].subtitle}
						</h3>

						<p class="text-base text-slate-600 leading-relaxed font-medium min-h-[100px] relative">
							{displayedDesc}<span class="inline-block w-2 h-4 ml-1 bg-[#00C2CB] animate-blink align-middle"></span>
						</p>
					</div>
					{/key}
				</div>

			</div>
		</section>
	</main>
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
		50% { opacity: 0; }
	}
	:global(.animate-blink) {
		animation: blink 0.8s infinite steps(1);
	}
</style>