<script>
	import '../app.css';
	import './layout.css';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { ChevronDown, Activity, Stethoscope, Users2, ShoppingBag } from 'lucide-svelte';

	let open = false;

	// State untuk kontrol dropdown produk di Desktop
	let productDropdownOpen = false;

	const closeMenu = () => {
		open = false;
		productDropdownOpen = false;
	};

	// Data produk lengkap untuk ditampilkan di dalam dropdown mega-menu
	const productsList = [
		{
			title: 'SIMRS Enterprise',
			desc: 'Sistem manajemen Rumah Sakit terintegrasi & siap bridging SatuSehat.',
			href: '/products/simrs',
			icon: Activity,
			color: 'text-blue-600 bg-blue-50'
		},
		{
			title: 'SIM Klinik',
			desc: 'Solusi operasional Klinik Pratama & Utama modern berbasis cloud.',
			href: '/products/sim-klinik',
			icon: Stethoscope,
			color: 'text-cyan-600 bg-cyan-50'
		},
		{
			title: 'HRIS Smart Corporate',
			desc: 'Otomatisasi payroll PPh 21, absensi biometrik, dan manajemen shift.',
			href: '/products/hris',
			icon: Users2,
			color: 'text-indigo-600 bg-indigo-50'
		},
		{
			title: 'POS & Intelligent Inventory',
			desc: 'Aplikasi kasir multi-gudang penunjang bisnis retail dan grosir.',
			href: '/products/pos-inventory',
			icon: ShoppingBag,
			color: 'text-emerald-600 bg-emerald-50'
		}
	];

	// Kontak nyata saja; placeholder social dihapus
	const socialLinks = [
		{
			href: 'https://wa.me/6289629949441',
			label: 'WhatsApp',
			color: 'hover:text-[#25D366] hover:bg-emerald-50',
			svg: `<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
		},
		{
			href: 'mailto:aortadigitalsolusi.business@gmail.com',
			label: 'Email',
			color: 'hover:text-[#0155FF] hover:bg-blue-50',
			svg: `<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
		}
	];
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/70 backdrop-blur-md transition-all duration-300"
	on:mouseleave={() => (productDropdownOpen = false)}
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-20 items-center justify-between">
			<a
				href="/"
				class="group flex items-center gap-2 transition-transform duration-300 active:scale-95"
			>
				<picture>
					<source srcset="/assets/logo.webp" type="image/webp" />
					<img
						src="/assets/logo.png"
						alt="AORTA"
						class="h-15 w-15 rounded-md"
						width="105"
						height="105"
					/>
				</picture>
				<span
					class="bg-gray-800 bg-clip-text text-2xl font-black tracking-tight text-transparent transition-transform duration-500 group-hover:rotate-1"
				>
					AORTA
				</span>
			</a>

			<nav class="hidden items-center gap-8 text-sm font-semibold text-neutral-600 md:flex">
				<a
					href="/blog"
					class="relative py-2 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#0155FF] after:transition-all after:duration-300 hover:text-[#0155FF] hover:after:w-full"
					>Blog</a
				>
				<a
					href="#features"
					class="relative py-2 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#0155FF] after:transition-all after:duration-300 hover:text-[#0155FF] hover:after:w-full"
					>Fitur</a
				>

				<div class="relative inline-block">
					<button
						class="flex items-center gap-1 py-2 transition-colors duration-300 hover:text-[#0155FF]"
						on:mouseenter={() => (productDropdownOpen = true)}
						on:click={() => (productDropdownOpen = !productDropdownOpen)}
					>
						<span>Produk</span>
						<ChevronDown
							size={14}
							class="transition-transform duration-300 {productDropdownOpen ? 'rotate-180' : ''}"
						/>
					</button>

					{#if productDropdownOpen}
						<div
							transition:fly={{ y: 10, duration: 200, easing: cubicOut }}
							class="absolute top-full left-1/2 mt-2 grid w-[480px] -translate-x-1/2 grid-cols-1 gap-2 rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-xl"
						>
							{#each productsList as prod}
								<a
									href={prod.href}
									on:click={closeMenu}
									class="group flex items-start gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-neutral-50"
								>
									<div
										class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 {prod.color}"
									>
										<svelte:component this={prod.icon} size={20} strokeWidth={2.5} />
									</div>
									<div class="space-y-0.5 text-left">
										<p
											class="font-bold text-neutral-800 transition-colors group-hover:text-[#0155FF]"
										>
											{prod.title}
										</p>
										<p class="text-xs leading-normal font-medium text-neutral-400">{prod.desc}</p>
									</div>
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<a
					href="#get-started"
					class="relative py-2 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#0155FF] after:transition-all after:duration-300 hover:text-[#0155FF] hover:after:w-full"
					>Kontak</a
				>

				<span class="h-4 w-px bg-neutral-200"></span>

				<div class="flex items-center gap-2.5">
					{#each socialLinks as item}
						<a
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							class="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-400 transition-all duration-300 active:scale-90 {item.color}"
							aria-label={item.label}
						>
							{@html item.svg}
						</a>
					{/each}
				</div>
			</nav>

			<button
				class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 transition-all duration-300 hover:bg-neutral-100 active:scale-95 md:hidden"
				on:click={() => (open = !open)}
				aria-label="Toggle menu"
			>
				<div class="flex flex-col gap-1.5 transition-all duration-300 {open ? 'rotate-180' : ''}">
					<span
						class="h-0.5 w-6 rounded-full bg-neutral-800 transition-all duration-300 {open
							? 'translate-y-2 rotate-45'
							: ''}"
					></span>
					<span
						class="h-0.5 w-6 rounded-full bg-neutral-800 transition-all duration-300 {open
							? 'opacity-0'
							: ''}"
					></span>
					<span
						class="h-0.5 w-6 rounded-full bg-neutral-800 transition-all duration-300 {open
							? '-translate-y-1 -rotate-45'
							: ''}"
					></span>
				</div>
			</button>
		</div>
	</div>

	{#if open}
		<div
			transition:fly={{ y: -20, duration: 300, easing: cubicOut }}
			class="absolute top-full left-0 w-full border-b border-neutral-100 bg-white/95 shadow-xl backdrop-blur-lg md:hidden"
		>
			<div class="max-h-[80vh] space-y-2 overflow-y-auto px-6 py-6 font-medium text-neutral-700">
				<a
					href="/blog"
					on:click={closeMenu}
					class="block rounded-lg px-3 py-2.5 transition-colors hover:bg-neutral-50 hover:text-[#0155FF]"
					>Blog</a
				>
				<a
					href="#features"
					on:click={closeMenu}
					class="block rounded-lg px-3 py-2.5 transition-colors hover:bg-neutral-50 hover:text-[#0155FF]"
					>Fitur</a
				>

				<div class="ml-3 space-y-1 border-l-2 border-neutral-100 pl-3">
					<p class="mb-2 px-3 text-[11px] font-black tracking-wider text-neutral-400 uppercase">
						Daftar Produk
					</p>
					{#each productsList as prod}
						<a
							href={prod.href}
							on:click={closeMenu}
							class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-[#0155FF]"
						>
							<div class="rounded-md p-1 {prod.color}">
								<svelte:component this={prod.icon} size={15} />
							</div>
							<span>{prod.title}</span>
						</a>
					{/each}
				</div>

				<a
					href="#get-started"
					on:click={closeMenu}
					class="block rounded-lg px-3 py-2.5 transition-colors hover:bg-neutral-50 hover:text-[#0155FF]"
					>Kontak</a
				>

				<div class="my-4 border-t border-neutral-100"></div>

				<div class="grid grid-cols-2 gap-2 pb-2">
					{#each socialLinks as item}
						<a
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							on:click={closeMenu}
							class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-500 transition-all {item.color}"
						>
							<div class="fill-current text-neutral-400">
								{@html item.svg}
							</div>
							<span>{item.label}</span>
						</a>
					{/each}
				</div>

				<div class="pt-2">
					<a
						href="#get-started"
						on:click={closeMenu}
						class="flex w-full items-center justify-center rounded-xl bg-[#0155FF] py-3 text-center font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:opacity-90 active:scale-95"
					>
						Mulai Sekarang
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>

<main class="relative min-h-screen selection:bg-[#00C2CB] selection:text-white">
	<slot />
</main>
