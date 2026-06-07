<script>
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Data penjelasan urgensi Aorta
	const slides = [
		{
			title: 'SISTEM INFORMASI MANAJEMEN RUMAH SAKIT',
			subtitle: 'Centralize Healthcare Flow',
			desc: 'Tanpa SIMRS, data pasien tercecer. Integrasi Aorta memastikan rekam medis (EMR) sinkron real-time, mempercepat layanan hingga 60% dan siap bridging Satu Sehat.',
			icon: 'local_hospital',
			color: '#0155FF'
		},
		{
			title: 'SISTEM INFORMASI MANAJEMEN KLINIK',
			subtitle: 'Streamline Patient Journey',
			desc: 'Klinik sering stuck di antrean kaku. Sistem kami mengotomatisasi pendaftaran & klaim BPJS, meminimalisir human error dan kebocoran biaya operasional.',
			icon: 'medical_information',
			color: '#00C2CB'
		},
		{
			title: 'HUMAN RESOURCE INFORMATION SYSTEM',
			subtitle: 'Optimize Medical Shifts',
			desc: 'Manajemen shift dokter & perawat itu rumit. HRIS Aorta mengatur jadwal otomatis, payroll akurat, hingga tracking kredensial tenaga medis dalam satu klik.',
			icon: 'groups',
			color: '#1E293B'
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
		}, 60); // Total waktu per slide +- 6 detik

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
					<!-- <div in:fly={{ y: -10, duration: 600, delay: 100 }} class="inline-flex items-center gap-2 rounded-full border border-[#0155FF]/20 bg-white px-4 py-1.5 text-xs font-bold text-[#0155FF] shadow-sm">
						<span class="material-symbols-outlined text-sm animate-pulse" style="font-variation-settings: 'FILL' 1;">verified</span>
						TERPERCAYA DI 50+ RUMAH SAKIT
					</div> -->
					
					<h1 in:fly={{ y: 30, duration: 800, delay: 200 }} class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
						Solusi Digital Terpadu untuk <span class="bg-gradient-to-r from-[#0155FF] to-[#00C2CB] bg-clip-text text-transparent">Kesehatan & HR</span>
					</h1>
					
					<p in:fly={{ y: 20, duration: 800, delay: 400 }} class="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed">
						Optimalkan operasional medis dan manajemen sumber daya manusia dengan sistem informasi terintegrasi yang modern, aman, dan efisien.
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

				<div class="hidden lg:flex flex-col justify-between min-h-[250px] relative w-full max-w-xl pl-6 border-l-2 border-slate-200/60">
					
					<div class="absolute -left-10 top-10 w-32 h-32 bg-[#0155FF]/5 rounded-full blur-3xl pointer-events-none"></div>

					{#key activeIndex}
					<div class="space-y-6">
						<div class="flex items-center gap-4" in:fly={{ y: 15, duration: 500 }}>
							<div 
								class="h-12 w-12 flex items-center justify-center text-[#0155FF] transition-all duration-500"
							>
								<span class="material-symbols-outlined text-2xl">{slides[activeIndex].icon}</span>
							</div>
							<div class="flex flex-col">
								<span class="text-[16px] font-black tracking-widest text-[#0155FF] uppercase">{slides[activeIndex].title}</span>
								<!-- <span class="text-xs text-slate-400 font-medium font-mono">system_analysis.log</span> -->
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

					<!-- <div class="mt-8 space-y-4">
						<div class="flex gap-3">
							{#each slides as _, i}
								<div class="h-[3px] flex-1 bg-slate-200 rounded-full overflow-hidden">
									{#if i === activeIndex}
										<div class="h-full bg-gradient-to-r from-[#0155FF] to-[#00C2CB]" style="width: {progress}%"></div>
									{:else if i < activeIndex}
										<div class="h-full bg-slate-400" style="width: 100%"></div>
									{/if}
								</div>
							{/each}
						</div>
						
						<div class="flex items-center justify-between text-[10px] font-bold text-slate-400 font-mono tracking-wider">
							<span class="flex items-center gap-1.5">
								<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span> 
								AORTA CORE LIVE ENGINE
							</span>
							<span class="text-[#0155FF]">STEP 0{activeIndex + 1} / 03</span>
						</div>
					</div> -->

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