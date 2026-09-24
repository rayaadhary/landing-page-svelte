<script>
	import { X, Send, CheckCircle } from 'lucide-svelte';

	let { open = $bindable(false), productSlug = '', productTitle = '' } = $props();

	let form = $state({ name: '', companyName: '', email: '', phone: '', message: '' });
	let submitting = $state(false);
	let error = $state('');
	let success = $state(false);

	function close() {
		open = false;
	}

	/** @param {KeyboardEvent} e */
	function handleKeydown(e) {
		if (e.key === 'Escape' && open) close();
	}

	function handleOpen() {
		if (open) {
			form = { name: '', companyName: '', email: '', phone: '', message: '' };
			error = '';
			success = false;
			submitting = false;
		}
	}

	$effect(() => {
		handleOpen();
	});

	/**
	 * @param {SubmitEvent} e
	 */
	async function submit(e) {
		e.preventDefault();
		error = '';
		if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
			error = 'Nama, email, dan telepon wajib diisi.';
			return;
		}
		submitting = true;
		try {
			const res = await fetch('/api/demo-requests', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...form, productSlug, productTitle })
			});
			const data = await res.json();
			if (!res.ok) {
				error = data.error || 'Gagal mengirim. Coba lagi.';
				return;
			}
			success = true;
		} catch {
			error = 'Gagal mengirim. Periksa koneksi Anda.';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
		<div
			class="fixed inset-0 bg-black/40 backdrop-blur-sm"
			role="presentation"
			onclick={close}
		></div>
		<div
			class="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
			role="dialog"
			aria-modal="true"
			aria-labelledby="demo-modal-title"
		>
			<button
				type="button"
				onclick={close}
				class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
				aria-label="Tutup"
			>
				<X size={16} strokeWidth={1.5} />
			</button>

			{#if success}
				<div class="flex flex-col items-center py-6 text-center">
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600"
					>
						<CheckCircle size={24} strokeWidth={1.5} />
					</div>
					<h3 class="text-base font-bold text-slate-800">Terima Kasih!</h3>
					<p class="mt-2 text-sm text-slate-500">
						Permintaan demo Anda untuk <strong>{productTitle}</strong> telah kami terima. Tim kami akan
						menghubungi Anda segera.
					</p>
					<button
						type="button"
						onclick={close}
						class="mt-6 rounded-lg bg-[#0155FF] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
					>
						Tutup
					</button>
				</div>
			{:else}
				<h3 id="demo-modal-title" class="text-base font-bold text-slate-800">
					Request Uji Coba Demo
				</h3>
				{#if productTitle}
					<p class="mt-1 text-xs text-slate-400">Produk: {productTitle}</p>
				{/if}

				<form class="mt-5 space-y-3" onsubmit={submit}>
					<div>
						<label for="demo-name" class="mb-1.5 block text-[13px] font-medium text-slate-600">
							Nama <span class="ml-0.5 text-red-400">*</span>
						</label>
						<input
							id="demo-name"
							type="text"
							bind:value={form.name}
							placeholder="Nama lengkap"
							required
							class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 transition-colors placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
						/>
					</div>
					<div>
						<label for="demo-company" class="mb-1.5 block text-[13px] font-medium text-slate-600">
							Nama Perusahaan
						</label>
						<input
							id="demo-company"
							type="text"
							bind:value={form.companyName}
							placeholder="Nama perusahaan / instansi"
							class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 transition-colors placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
						/>
					</div>
					<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
						<div>
							<label for="demo-email" class="mb-1.5 block text-[13px] font-medium text-slate-600">
								Email <span class="ml-0.5 text-red-400">*</span>
							</label>
							<input
								id="demo-email"
								type="email"
								bind:value={form.email}
								placeholder="email@perusahaan.com"
								required
								class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 transition-colors placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
							/>
						</div>
						<div>
							<label for="demo-phone" class="mb-1.5 block text-[13px] font-medium text-slate-600">
								No. Telepon <span class="ml-0.5 text-red-400">*</span>
							</label>
							<input
								id="demo-phone"
								type="tel"
								bind:value={form.phone}
								placeholder="08xxxxxxxxxx"
								required
								class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 transition-colors placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
							/>
						</div>
					</div>
					<div>
						<label for="demo-message" class="mb-1.5 block text-[13px] font-medium text-slate-600">
							Pesan
						</label>
						<textarea
							id="demo-message"
							bind:value={form.message}
							placeholder="Kebutuhan / pertanyaan Anda (opsional)"
							rows="3"
							class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 transition-colors placeholder:text-slate-400 focus:border-[#0155FF] focus:ring-2 focus:ring-[#0155FF]/10 focus:outline-none"
						></textarea>
					</div>

					{#if error}
						<p class="text-xs text-red-500">{error}</p>
					{/if}

					<button
						type="submit"
						disabled={submitting}
						class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0155FF] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-50"
					>
						{#if submitting}
							<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								/>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
								/>
							</svg>
							Mengirim...
						{:else}
							<Send size={14} strokeWidth={2} />
							Kirim Request
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
{/if}
