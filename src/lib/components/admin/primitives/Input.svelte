<script>
	let {
		type = 'text',
		value = $bindable(''),
		label = '',
		placeholder = '',
		required = false,
		disabled = false,
		rows = 4,
		options = [],
		error = '',
		oninput = undefined,
		onchange = undefined
	} = $props();
</script>

{#if label}
	<label for={label} class="mb-1.5 block text-[13px] font-medium text-slate-600">
		{label}
		{#if required}<span class="ml-0.5 text-red-400">*</span>{/if}
	</label>
{/if}

{#if type === 'textarea'}
	<textarea
		id={label}
		bind:value
		{placeholder}
		{required}
		{disabled}
		{rows}
		{oninput}
		class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 transition-colors placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none disabled:opacity-50 {error
			? 'border-red-300 focus:border-red-500 focus:ring-red-300/10'
			: ''}"
	></textarea>
{:else if type === 'select'}
	<select
		id={label}
		bind:value
		{required}
		{disabled}
		{onchange}
		class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 transition-colors focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none disabled:opacity-50 {error
			? 'border-red-300'
			: ''}"
	>
		{#each options as opt}
			<option value={opt.value}>{opt.label}</option>
		{/each}
	</select>
{:else}
	<input
		id={label}
		{type}
		bind:value
		{placeholder}
		{required}
		{disabled}
		{oninput}
		class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 transition-colors placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none disabled:opacity-50 {error
			? 'border-red-300'
			: ''}"
	/>
{/if}

{#if error}
	<p class="mt-1 text-xs text-red-500">{error}</p>
{/if}
