<script>
	let { icon = null, message = '', actionLabel = '', onaction = undefined } = $props();
</script>

<div class="flex flex-col items-center justify-center py-16 text-center">
	{#if icon}
		<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
			<icon size={22} strokeWidth={1.5}></icon>
		</div>
	{/if}
	<p class="text-sm font-medium text-slate-500">{message}</p>
	{#if actionLabel && onaction}
		<button
			onclick={onaction}
			class="mt-4 rounded-lg bg-[#0155FF] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#0144dd]"
		>
			{actionLabel}
		</button>
	{/if}
</div>
