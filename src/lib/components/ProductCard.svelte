<script>
	import { ArrowRight, CheckCircle2, Monitor, Sparkles } from 'lucide-svelte';

	export let title;
	export let category;
	export let description;
	export let features = [];
	export let screenshot;
	export let slug;
</script>

<div class="relative rounded-3xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] overflow-hidden h-full flex flex-col">
	
	<!-- <div class="bg-slate-50 aspect-[16/10] overflow-hidden relative border-b border-slate-100 flex items-center justify-center">
		{#if screenshot}
			<img 
				src={screenshot} 
				alt={`${title} mockup`} 
				class="w-full h-full object-cover" 
				loading="lazy"
			/>
		{:else}
			<div class="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
				<div class="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#00C2CB] mb-2">
					<Monitor size={20} />
				</div>
				<span class="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1">
					<Sparkles size={10} /> Sandbox Mode
				</span>
			</div>
		{/if}

		<div class="absolute bottom-3 left-4 z-10">
			<span class="inline-block text-[9px] font-black tracking-widest text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-100 shadow-sm uppercase">
				{category}
			</span>
		</div>
	</div> -->

	<div class="p-6 flex-1 flex flex-col justify-between relative z-10">
		<div class="space-y-3">
			<h3 class="text-xl font-black text-slate-900 tracking-tight">
				{title}
			</h3>
			
			<p class="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
				{description}
			</p>

			<ul class="pt-2 space-y-2 text-xs font-semibold text-slate-700">
				{#each features.slice(0, 4) as f} 
					<li class="flex items-start gap-2.5">
						<CheckCircle2 size={14} class="text-[#00C2CB] shrink-0 mt-0.5" />
						<span class="line-clamp-1 text-slate-600">{f}</span>
					</li>
				{/each}
			</ul>
		</div>

		<div class="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3">
			<!-- <a 
				href="#contact" 
				class="inline-flex items-center justify-center text-xs font-bold text-slate-500 hover:text-slate-900 px-2 py-2"
			>
				Hubungi Kami
			</a> -->

			<a 
				href={`/products/${slug}`} 
				class="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#0155FF] to-[#00C2CB] text-white py-2.5 px-4 font-bold text-xs shadow-sm text-center"
			>
				<span>Hubungi Kami</span> 
				<ArrowRight size={12} />
			</a>
		</div>
	</div>
</div>