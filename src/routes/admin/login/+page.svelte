<script>
	import { goto } from '$app/navigation';

	let email = $state('aorta@email.com');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleLogin() {
		loading = true;
		error = '';
		try {
			const res = await fetch('/api/auth/login', {
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

<div class="flex min-h-screen items-center justify-center bg-slate-100 px-4">
	<div class="w-full max-w-sm space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
		<div class="text-center">
			<h1 class="text-2xl font-black text-slate-900">AORTA Admin</h1>
			<p class="mt-1 text-sm text-slate-500">Masuk ke panel administrasi</p>
		</div>

		{#if error}
			<div class="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">{error}</div>
		{/if}

		<form onsubmit={(e) => { e.preventDefault(); handleLogin(); }} class="space-y-4">
			<div>
				<label for="email" class="mb-1 block text-xs font-bold text-slate-700">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					required
					class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition-colors focus:border-[#0155FF] focus:outline-none focus:ring-2 focus:ring-[#0155FF]/20"
				/>
			</div>
			<div>
				<label for="password" class="mb-1 block text-xs font-bold text-slate-700">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					required
					class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition-colors focus:border-[#0155FF] focus:outline-none focus:ring-2 focus:ring-[#0155FF]/20"
				/>
			</div>
			<button
				type="submit"
				disabled={loading}
				class="w-full rounded-lg bg-[#0155FF] py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
			>
				{loading ? 'Masuk...' : 'Masuk'}
			</button>
		</form>
	</div>
</div>
