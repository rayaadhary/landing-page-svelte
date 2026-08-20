<script>
	import { ArrowRight } from 'lucide-svelte';

	export let index = 0;
	export let title;
	export let description;
	export let features = [];
	export let screenshot;
	export let slug;
</script>

<div
	class="relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-[0_16px_40px_-20px_rgba(15,23,42,0.18)]"
>
	<div class="flex flex-1 flex-col">
		<div class="text-4xl leading-none font-black text-slate-200 tabular-nums">
			0{index + 1}
		</div>

		<h3 class="mt-4 text-lg font-black tracking-tight text-slate-900">
			{title}
		</h3>

		<p class="mt-2 line-clamp-3 text-sm leading-relaxed font-medium text-slate-600">
			{description}
		</p>

		<ul class="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
			{#each features.slice(0, 3) as f}
				<li class="flex items-start gap-2.5 text-sm font-medium text-slate-700">
					<span class="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00C2CB]" />
					<span class="line-clamp-1">{f}</span>
				</li>
			{/each}
		</ul>
	</div>

	<div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
		<span class="text-sm font-bold text-[#0155FF]">Lihat detail</span>
		<ArrowRight
			size={16}
			class="shrink-0 text-[#0155FF] transition-transform duration-300 group-hover:translate-x-0.5"
		/>
	</div>
</div>
