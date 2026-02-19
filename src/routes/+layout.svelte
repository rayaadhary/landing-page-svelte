<script>
	import '../app.css';
	import './layout.css';
	let open = false;
</script>

<header class="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<a href="/" class="flex items-center gap-2">
				<img src="/assets/logo-blue.png" alt="SITEMEDIKA" class="h-10 w-45 rounded-md" />
				<!-- <span class="text-lg font-semibold tracking-tight text-neutral-900">SITEMEDIKA</span> -->
			</a>
			<nav class="hidden items-center gap-8 text-sm text-neutral-600 md:flex">
				<a href="#features" class="hover:text-neutral-900">Fitur</a>
				<a href="#products" class="hover:text-neutral-900">Produk</a>
				<a href="#contact" class="hover:text-neutral-900">Kontak</a>
				<a
					href="#get-started"
					class="inline-flex items-center rounded-md bg-neutral-900 px-3 py-2 text-white">Mulai</a
				>
			</nav>
			<button
				class="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 ring-1 ring-neutral-300 md:hidden"
				on:click={() => (open = !open)}
				aria-label="Toggle menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>
	</div>
	{#if open}
		<div class="border-t border-neutral-200 md:hidden">
			<div class="space-y-3 px-4 py-4 text-sm text-neutral-700">
				<a href="#features" class="block">Fitur</a>
				<a href="#products" class="block">Produk</a>
				<a href="#contact" class="block">Kontak</a>
				<a href="#get-started" class="block rounded-md bg-neutral-900 px-3 py-2 text-white">Mulai</a
				>
			</div>
		</div>
	{/if}
</header>

<slot />
