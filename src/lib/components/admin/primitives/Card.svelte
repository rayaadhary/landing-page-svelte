<script>
	let { variant = 'default', class: className = '', children } = $props();

	/** @type {Record<string, string>} */
	const variants = {
		default: 'rounded-xl border border-slate-200 bg-white',
		stat: 'rounded-2xl border border-slate-100 bg-white'
	};
</script>

<div class="{variants[variant]} {className}">
	{@render children?.()}
</div>
