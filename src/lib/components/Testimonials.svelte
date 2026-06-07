<script>
	import { Quote, MessageSquare } from 'lucide-svelte';

	const items = [
		{
			quote: 'Solusi SIMRS dan arsitektur modular dari platform ini mempercepat proses administrasi klinis kami secara signifikan. Integrasinya instan tanpa kendala.',
			author: 'Rani Setia',
			role: 'COO, Nusantara Global'
		},
		{
			quote: 'Implementasi sistemnya sangat cepat dan terbukti stabil di masa traffic puncak. Tim operasional dan lapangan kami di seluruh cabang sangat terbantu.',
			author: 'Dimas Pratama',
			role: 'Head of Operations, DeltaTech'
		},
		{
			quote: 'Skalabilitas infrastruktur kustom sistemnya membuat kami percaya diri untuk bermitra dalam jangka panjang. Pengamanan datanya benar-old teruji.',
			author: 'Maya Putri',
			role: 'CTO, PrimaLog'
		}
	];
</script>

<section id="testimonials" class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
	<div class="absolute top-1/2 left-1/3 w-[250px] h-[250px] rounded-full bg-[#0155FF]/[0.02] blur-[120px] pointer-events-none"></div>

	<div class="max-w-3xl text-left space-y-3 mb-16 relative z-10">
		<div class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[10px] font-black tracking-widest text-[#0155FF] uppercase">
			<MessageSquare size={12} /> Client Stories
		</div>
		<h2 class="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
			Apa Kata Mitra Klien Kami
		</h2>
		<p class="text-sm text-slate-500 font-medium leading-relaxed">
			Cerita nyata dari berbagai perusahaan dan institusi yang bertumbuh serta mendigitalisasi operasionalnya bersama kami.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-3 relative z-10">
		{#each items as item}
			<div class="relative rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.02)] flex flex-col justify-between">
				
				<div class="space-y-4 relative">
					<div class="text-slate-200">
						<Quote size={32} fill="currentColor" class="opacity-40 stroke-[1.5]" />
					</div>
					
					<p class="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed italic relative z-10">
						"{item.quote}"
					</p>
				</div>

				<div class="mt-8 pt-4 border-t border-slate-100 flex flex-col">
					<span class="text-sm font-black text-slate-900 tracking-tight">
						{item.author}
					</span>
					<span class="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">
						{item.role}
					</span>
				</div>
			</div>
		{/each}
	</div>
</section>