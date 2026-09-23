<script>
	import { ArrowRight } from 'lucide-svelte';

	export let index = 0;
	export let title;
	export let description;
	export let features = [];
	export let screenshot;
</script>

<div
	class="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
>
	<div class="flex flex-1 flex-col">
		<span class="text-xs font-semibold tracking-wider text-slate-400 uppercase">
			{String(index + 1).padStart(2, '0')}
		</span>

		<h3 class="mt-3 text-lg font-bold text-slate-900">
			{title}
		</h3>

		<p class="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
			{description}
		</p>

		<ul class="mt-5 space-y-2 border-t border-slate-100 pt-5">
			{#each features.slice(0, 3) as f}
				<li class="flex items-start gap-2 text-sm text-slate-600">
					<span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#00C2CB]"></span>
					<span class="line-clamp-1">{f}</span>
				</li>
			{/each}
		</ul>
	</div>

	<div class="mt-6 flex items-center gap-1 text-sm font-semibold text-[#0155FF]">
		Lihat detail
		<ArrowRight
			size={14}
			class="transition-transform duration-200 group-hover:translate-x-0.5"
		/>
	</div>
</div>
