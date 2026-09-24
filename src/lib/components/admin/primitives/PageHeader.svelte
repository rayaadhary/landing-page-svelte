<script>
	let { title = '', children } = $props();
</script>

<div class="flex items-center justify-between">
	<h1 class="text-lg font-bold tracking-tight text-slate-800">{title}</h1>
	{#if children}
		<div class="flex items-center gap-2">
			{@render children?.()}
		</div>
	{/if}
</div>
