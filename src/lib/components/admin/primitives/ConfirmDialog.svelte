<script>
	import Button from './Button.svelte';

	let { open = $bindable(false), title = '', message = '', onconfirm = undefined } = $props();

	function handleConfirm() {
		open = false;
		onconfirm?.();
	}

	function handleCancel() {
		open = false;
	}

	/** @param {KeyboardEvent} e */
	function handleKeydown(e) {
		if (e.key === 'Escape') handleCancel();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
		<div class="fixed inset-0 bg-black/40 backdrop-blur-sm" role="presentation" onclick={handleCancel}></div>
		<div class="relative w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
			<h3 class="text-base font-bold text-slate-800">{title}</h3>
			<p class="mt-2 text-sm text-slate-500">{message}</p>
			<div class="mt-6 flex justify-end gap-2">
				<Button variant="secondary" onclick={handleCancel}>Batal</Button>
				<Button variant="danger" onclick={handleConfirm}>Hapus</Button>
			</div>
		</div>
	</div>
{/if}
