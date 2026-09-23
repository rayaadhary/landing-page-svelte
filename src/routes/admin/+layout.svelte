<script>
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import {
		LayoutDashboard,
		Target,
		Package,
		Zap,
		MessageSquare,
		HelpCircle,
		FileText,
		Settings,
		LogOut,
		Menu,
		X
	} from 'lucide-svelte';

	let { children } = $props();

	const navItems = [
		{ href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/admin/hero', label: 'Hero Slides', icon: Target },
		{ href: '/admin/products', label: 'Produk', icon: Package },
		{ href: '/admin/features', label: 'Fitur', icon: Zap },
		{ href: '/admin/testimonials', label: 'Testimoni', icon: MessageSquare },
		{ href: '/admin/faqs', label: 'FAQ', icon: HelpCircle },
		{ href: '/admin/blog', label: 'Blog', icon: FileText },
		{ href: '/admin/settings', label: 'Settings', icon: Settings }
	];

	let sidebarOpen = $state(false);

	async function logout() {
		await fetch('/admin/api/auth/logout', { method: 'POST' });
		goto('/admin/login');
	}
</script>

{#if page.url.pathname === '/admin/login'}
	{@render children()}
{:else}
	<div class="flex min-h-screen bg-slate-50">
		<!-- Sidebar -->
		<aside
			class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 {sidebarOpen
				? 'translate-x-0'
				: '-translate-x-full'}"
		>
			<div class="flex h-16 shrink-0 items-center gap-3 border-b border-slate-100 px-5">
				<div class="flex h-8 w-8 items-center justify-center rounded-md bg-[#0155FF]">
					<span class="text-xs font-bold text-white">A</span>
				</div>
				<div>
					<p class="text-sm font-bold tracking-tight text-slate-900">AORTA</p>
					<p class="text-[10px] font-medium text-slate-400">Admin Panel</p>
				</div>
			</div>

			<nav class="flex-1 space-y-0.5 overflow-y-auto p-3">
				{#each navItems as item}
					{@const active = page.url.pathname.startsWith(item.href)}
					<a
						href={item.href}
						class="group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors {active
							? 'bg-[#0155FF]/5 text-[#0155FF]'
							: 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}"
					>
						<svelte:component
							this={item.icon}
							size={18}
							strokeWidth={active ? 2 : 1.5}
							class="shrink-0 {active ? 'text-[#0155FF]' : 'text-slate-400 group-hover:text-slate-500'}"
						/>
						<span>{item.label}</span>
					</a>
				{/each}
			</nav>

			<div class="shrink-0 border-t border-slate-100 p-3">
				<button
					onclick={logout}
					class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
				>
					<LogOut size={18} strokeWidth={1.5} />
					<span>Keluar</span>
				</button>
			</div>
		</aside>

		<!-- Overlay for mobile -->
		{#if sidebarOpen}
			<button
				class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
				onclick={() => (sidebarOpen = false)}
				aria-label="Close sidebar"
			></button>
		{/if}

		<!-- Main content -->
		<div class="flex-1 lg:pl-64">
			<header
				class="sticky top-0 z-30 flex h-14 items-center border-b border-slate-200 bg-white px-6"
			>
				<button
					class="mr-4 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 lg:hidden"
					onclick={() => (sidebarOpen = !sidebarOpen)}
					aria-label="Toggle sidebar"
				>
					<Menu size={20} strokeWidth={1.5} />
				</button>
				<h1 class="text-sm font-semibold text-slate-700">
					{navItems.find((n) => page.url.pathname.startsWith(n.href))?.label || 'Admin'}
				</h1>
			</header>
			<main class="p-6">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
