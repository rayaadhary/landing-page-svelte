<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/admin/primitives/Button.svelte';
	import Input from '$lib/components/admin/primitives/Input.svelte';

	let email = $state('aorta@email.com');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleLogin() {
		loading = true;
		error = '';
		try {
			const res = await fetch('/admin/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			const data = await res.json();
			if (data.success) {
				goto('/admin/dashboard');
			} else {
				error = data.error || 'Login failed';
			}
		} catch {
			error = 'Terjadi kesalahan';
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-slate-50 px-4">
	<div class="w-full max-w-sm space-y-6 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
		<div class="text-center">
			<div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0155FF]">
				<span class="text-sm font-bold text-white">A</span>
			</div>
			<h1 class="text-lg font-bold tracking-tight text-slate-800">AORTA Admin</h1>
			<p class="mt-1 text-[13px] text-slate-400">Masuk ke panel administrasi</p>
		</div>

		{#if error}
			<div class="rounded-lg bg-red-50 p-3 text-[13px] font-medium text-red-600">{error}</div>
		{/if}

		<form onsubmit={(e) => { e.preventDefault(); handleLogin(); }} class="space-y-3">
			<Input bind:value={email} type="email" label="Email" required />
			<Input bind:value={password} type="password" label="Password" required />
			<Button btnType="submit" disabled={loading} variant="primary">
				{loading ? 'Masuk...' : 'Masuk'}
			</Button>
		</form>
	</div>
</div>
