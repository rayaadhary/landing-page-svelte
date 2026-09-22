<script>
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let { children } = $props();

	const navItems = [
		{ href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
		{ href: '/admin/hero', label: 'Hero Slides', icon: '🎯' },
		{ href: '/admin/products', label: 'Produk', icon: '📦' },
		{ href: '/admin/features', label: 'Fitur', icon: '⚡' },
		{ href: '/admin/testimonials', label: 'Testimoni', icon: '💬' },
		{ href: '/admin/faqs', label: 'FAQ', icon: '❓' },
		{ href: '/admin/blog', label: 'Blog', icon: '📝' },
		{ href: '/admin/settings', label: 'Settings', icon: '⚙️' }
	];

	let sidebarOpen = $state(false);

	async function logout() {
		await fetch('/api/auth/logout', { method: 'POST' });
		goto('/admin/login');
	}
</script>

{#if page.url.pathname === '/admin/login'}
	{@render children()}
{:else}
	<div class="flex min-h-screen bg-slate-100">
		<!-- Sidebar -->
		<aside
			class="fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white transition-transform duration-300 {sidebarOpen
				? 'translate-x-0'
				: '-translate-x-full'} lg:translate-x-0"
		>
			<div class="flex h-16 items-center border-b border-slate-200 px-6">
				<a href="/admin/dashboard" class="text-lg font-black text-slate-900">AORTA Admin</a>
			</div>
			<nav class="space-y-1 p-4">
				{#each navItems as item}
					<a
						href={item.href}
						class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors {page.url.pathname.startsWith(
							item.href
						)
							? 'bg-[#0155FF] text-white'
							: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
					>
						<span>{item.icon}</span>
						<span>{item.label}</span>
					</a>
				{/each}
			</nav>
			<div class="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4">
				<button
					onclick={logout}
					class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
				>
					<span>🚪</span>
					<span>Logout</span>
				</button>
			</div>
		</aside>

		<!-- Overlay for mobile -->
		{#if sidebarOpen}
			<button
				class="fixed inset-0 z-40 bg-black/50 lg:hidden"
				onclick={() => (sidebarOpen = false)}
				aria-label="Close sidebar"
			></button>
		{/if}

		<!-- Main content -->
		<div class="flex-1 lg:pl-64">
			<header
				class="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md"
			>
				<button
					class="mr-4 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
					onclick={() => (sidebarOpen = !sidebarOpen)}
					aria-label="Toggle sidebar"
				>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					</svg>
				</button>
				<h1 class="text-sm font-bold text-slate-800">
					{navItems.find((n) => page.url.pathname.startsWith(n.href))?.label || 'Admin'}
				</h1>
			</header>
			<main class="p-6">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
