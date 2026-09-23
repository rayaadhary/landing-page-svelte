<script>
	import { onMount } from 'svelte';
	import PageHeader from '$lib/components/admin/primitives/PageHeader.svelte';
	import Card from '$lib/components/admin/primitives/Card.svelte';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import Input from '$lib/components/admin/primitives/Input.svelte';

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
		const res = await fetch('/admin/api/settings');
		settings = await res.json();
		loading = false;
	});

	async function save() {
		await fetch('/admin/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
		saved = true;
		setTimeout(() => (saved = false), 2000);
	}
</script>

<div class="space-y-6 max-w-2xl">
	<PageHeader title="Settings">
		<Button onclick={save}>{saved ? 'Tersimpan!' : 'Simpan'}</Button>
	</PageHeader>

	{#if loading}
		<div class="space-y-3">
			{#each [1, 2, 3, 4] as _}
				<div class="h-14 animate-pulse rounded-xl bg-slate-100"></div>
			{/each}
		</div>
	{:else}
		<Card class="p-6">
			<div class="space-y-3">
				{#each fields as field}
					<Input
						type={field.type}
						label={field.label}
						bind:value={settings[field.key]}
					/>
				{/each}
			</div>
		</Card>
	{/if}
</div>
