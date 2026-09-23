<script>
	let {
		variant = 'primary',
		disabled = false,
		loading = false,
		btnType = 'button',
		onclick = undefined,
		children
	} = $props();

	/** @type {Record<string, string>} */
	const variants = {
		primary: 'bg-[#0155FF] text-white hover:bg-[#0144dd] focus-visible:ring-[#0155FF]/30',
		secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-300',
		danger: 'bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-red-300',
		ghost: 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 focus-visible:ring-slate-300'
	};
</script>

<button
	type={btnType}
	{disabled}
	{onclick}
	class="inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none {variants[variant]}"
>
	{#if loading}
		<svg class="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
		</svg>
	{/if}
	{@render children?.()}
</button>
