<script>
	import { onMount } from 'svelte';

	let settings = $state({});
	let loading = $state(true);
	let saved = $state(false);

	const fields = [
		{ key: 'whatsapp_number', label: 'WhatsApp Number', type: 'text' },
		{ key: 'whatsapp_message', label: 'WhatsApp Message', type: 'text' },
		{ key: 'email', label: 'Email', type: 'email' },
		{ key: 'phone', label: 'Phone', type: 'text' },
		{ key: 'address', label: 'Address', type: 'text' },
		{ key: 'cta_title', label: 'CTA Title', type: 'text' },
		{ key: 'cta_description', label: 'CTA Description', type: 'textarea' },
		{ key: 'footer_description', label: 'Footer Description', type: 'textarea' }
	];

	onMount(async () => {
		const res = await fetch('/api/settings');
		settings = await res.json();
		loading = false;
	});

	async function save() {
		await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
		saved = true;
		setTimeout(() => (saved = false), 2000);
	}
</script>

<div class="space-y-6 max-w-2xl">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-black text-slate-900">Settings</h1>
		<button onclick={save} class="rounded-lg bg-[#0155FF] px-4 py-2 text-sm font-bold text-white hover:opacity-90">
			{saved ? '✓ Tersimpan!' : 'Simpan'}
		</button>
	</div>

	{#if loading}
		<p class="text-sm text-slate-500">Loading...</p>
	{:else}
		<div class="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
			{#each fields as field}
				<div>
					<label class="mb-1 block text-xs font-bold text-slate-700">{field.label}</label>
					{#if field.type === 'textarea'}
						<textarea
							bind:value={settings[field.key]}
							rows="3"
							class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#0155FF] focus:outline-none focus:ring-2 focus:ring-[#0155FF]/20"
						></textarea>
					{:else}
						<input
							type={field.type}
							bind:value={settings[field.key]}
							class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#0155FF] focus:outline-none focus:ring-2 focus:ring-[#0155FF]/20"
						/>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
