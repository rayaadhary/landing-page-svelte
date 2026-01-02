<script>
	export let title;
	export let category;
	export let description;
	export let features = [];
	export let screenshot;
</script>

<div class="rounded-2xl ring-1 ring-neutral-200 bg-white overflow-hidden h-full flex flex-col border-t border-b border-neutral-200">
	<div class="bg-neutral-100 aspect-[16/10]">
		{#if screenshot}
			<img src={screenshot} alt={`${title} screenshot`} class="w-full h-full object-cover" />
		{:else}
			<div class="h-full w-full flex items-center justify-center text-neutral-500 text-sm">
				Screenshot akan ditaruh di sini
			</div>
		{/if}
	</div>
	<div class="p-6 flex-1 flex flex-col">
		<div class="text-xs uppercase tracking-wide text-neutral-500">{category}</div>
		<div class="mt-1 text-lg font-medium text-neutral-900">{title}</div>
		<div class="mt-2 text-sm text-neutral-600">{description}</div>
		<ul class="mt-4 grid grid-cols-1 gap-2 text-sm text-neutral-700">
			{#each features as f}
				<li class="flex items-start gap-2">
					<span class="inline-block h-1.5 w-1.5 rounded-full bg-neutral-400 mt-1"></span>
					<span>{f}</span>
				</li>
			{/each}
		</ul>
		<div class="mt-6 flex items-center gap-3">
			<a href="#contact" class="inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-white text-sm">Request Demo</a>
			<a href="#products" class="inline-flex items-center rounded-md ring-1 ring-inset ring-neutral-300 px-4 py-2 text-neutral-900 text-sm">Lihat Detail</a>
		</div>
	</div>
</div>
