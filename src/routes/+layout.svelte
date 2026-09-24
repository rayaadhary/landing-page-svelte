<script>
	import '../app.css';
	import './layout.css';
	import { page } from '$app/state';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import {
		ChevronDown,
		Activity,
		Stethoscope,
		Users2,
		ShoppingBag,
		Package,
		Sparkles
	} from 'lucide-svelte';

	let { data } = $props();

	let open = $state(false);
	let isAdmin = $derived(page.url.pathname.startsWith('/admin'));

	// State untuk kontrol dropdown produk di Desktop
	let productDropdownOpen = $state(false);
	let productDropdownEl = $state(/** @type {HTMLDivElement | null} */ (null));

	const closeMenu = () => {
		open = false;
		productDropdownOpen = false;
	};

	const handleWindowClick = (/** @type {MouseEvent} */ e) => {
		if (
			productDropdownOpen &&
			productDropdownEl &&
			!productDropdownEl.contains(/** @type {Node} */ (e.target))
		) {
			productDropdownOpen = false;
		}
	};

	/** @type {Record<string, { icon: any, color: string }>} */
	const categoryStyle = {
		'HEALTHCARE SYSTEM': { icon: Stethoscope, color: 'text-cyan-600 bg-cyan-50' },
		'BUSINESS ENTERPRISE': { icon: Users2, color: 'text-indigo-600 bg-indigo-50' },
		'RETAIL & COMMERCE': { icon: ShoppingBag, color: 'text-emerald-600 bg-emerald-50' }
	};

	function styleFor(/** @type {any} */ product) {
		const byCat = categoryStyle[product.category];
		if (byCat) return byCat;
		const t = `${product.slug} ${product.title}`.toLowerCase();
		if (t.includes('simrs') || t.includes('klinik') || t.includes('health'))
			return { icon: Activity, color: 'text-blue-600 bg-blue-50' };
		if (t.includes('hris') || t.includes('payroll') || t.includes('erp'))
			return { icon: Users2, color: 'text-indigo-600 bg-indigo-50' };
		if (t.includes('pos') || t.includes('inventory'))
			return { icon: ShoppingBag, color: 'text-emerald-600 bg-emerald-50' };
		if (t.includes('custom')) return { icon: Sparkles, color: 'text-amber-600 bg-amber-50' };
		return { icon: Package, color: 'text-blue-600 bg-blue-50' };
	}

	const productsList = $derived(
		(data.navProducts ?? []).map((/** @type {any} */ p) => {
			const style = styleFor(p);
			return {
				title: p.title,
				desc: p.tagline || p.overview || p.category,
				href: `/products/${p.slug}`,
				icon: style.icon,
				color: style.color
			};
		})
	);

	const socialLinks = [
		{
			href: 'https://wa.me/6289629949441',
			label: 'WhatsApp',
			color: 'hover:text-[#25D366] hover:bg-emerald-50',
			svg: `<svg viewBox="0 0 24 24" class="h-4.5 w-4.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
		},
		{
			href: 'mailto:aortadigitalsolusi@gmail.com',
			label: 'Email',
			color: 'hover:text-[#0155FF] hover:bg-blue-50',
			svg: `<svg viewBox="0 0 24 24" class="h-4.5 w-4.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
		}
	];
</script>

<svelte:window onclick={handleWindowClick} />

<svelte:head>
	<meta name="google-site-verification" content="cmPKTuqioD41LutY6_kGUpIzNLfmf1Sab1LvJw1uymo" />
	<link rel="icon" href="/assets/logo.png" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"@id": "https://aorta.my.id/#organization",
			"name": "AORTA",
			"url": "https://aorta.my.id",
			"logo": { "@type": "ImageObject", "url": "https://aorta.my.id/assets/logo.png" },
			"email": "aortadigitalsolusi@gmail.com",
			"description": "Penyedia SIMRS, SIM Klinik, HRIS, POS, dan jasa pembuatan aplikasi custom untuk rumah sakit, klinik, dan enterprise di Indonesia.",
			"contactPoint": {
				"@type": "ContactPoint",
				"telephone": "+6289629949441",
				"contactType": "sales",
				"availableLanguage": ["id"]
			},
			"address": {
				"@type": "PostalAddress",
				"addressRegion": "Jawa Barat",
				"addressLocality": "Cianjur",
				"addressCountry": "ID"
			},
			"hasOfferCatalog": {
				"@type": "OfferCatalog",
				"name": "Layanan AORTA",
				"itemListElement": [
					{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SIMRS Rumah Sakit" } },
					{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SIM Klinik" } },
					{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HRIS" } },
					{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "POS & Inventory" } },
					{
						"@type": "Offer",
						"itemOffered": { "@type": "Service", "name": "Jasa Pembuatan Aplikasi Custom" }
					}
				]
			}
		}
	</script>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"@id": "https://aorta.my.id/#website",
			"url": "https://aorta.my.id",
			"name": "AORTA",
			"publisher": { "@id": "https://aorta.my.id/#organization" },
			"inLanguage": "id-ID"
		}
	</script>
</svelte:head>

{#if !isAdmin}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<header class="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<a
					href="/"
					class="flex items-center gap-2.5 transition-transform duration-200 active:scale-95"
				>
					<picture>
						<source srcset="/assets/logo.webp" type="image/webp" />
						<img
							src="/assets/logo.png"
							alt="AORTA"
							class="h-9 w-9 rounded object-contain"
							width="36"
							height="36"
						/>
					</picture>

					<div class="flex flex-col leading-tight">
						<span class="text-base font-extrabold tracking-tight text-slate-900">
							<span class="text-[#0155FF]">AORTA</span> DIGITAL SOLUSI
						</span>
						<span class="text-[9.5px] font-semibold tracking-wider text-slate-500 uppercase">
							Empowering Digital Transformation
						</span>
					</div>
				</a>

				<nav class="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
					<!-- <a href="/tentang-kami" class="transition-colors hover:text-[#0155FF]">Tentang Kami</a>wa -->
					<a href="/blog" class="transition-colors hover:text-[#0155FF]">Blog</a>
					<a href="#features" class="transition-colors hover:text-[#0155FF]">Fitur</a>
					{#if productsList.length > 0}
						<div class="relative" bind:this={productDropdownEl}>
							<button
								class="flex items-center gap-1 transition-colors hover:text-[#0155FF]"
								onclick={() => (productDropdownOpen = !productDropdownOpen)}
							>
								<span>Produk</span>
								<ChevronDown
									size={14}
									class="transition-transform duration-200 {productDropdownOpen
										? 'rotate-180'
										: ''}"
								/>
							</button>

							{#if productDropdownOpen}
								<div
									role="menu"
									tabindex="-1"
									transition:fly={{ y: 8, duration: 150, easing: cubicOut }}
									class="absolute top-full left-0 mt-2 w-72 rounded-xl border border-slate-100 bg-white p-2 shadow-lg"
								>
									{#each productsList as prod}
										<a
											href={prod.href}
											onclick={closeMenu}
											class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50"
										>
											<div
												class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg {prod.color}"
											>
												<svelte:component this={prod.icon} size={16} />
											</div>
											<div class="min-w-0">
												<p class="truncate text-sm font-medium text-slate-900">{prod.title}</p>
												<p class="truncate text-xs text-slate-500">{prod.desc}</p>
											</div>
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{/if}
					<a href="#get-started" class="transition-colors hover:text-[#0155FF]">Kontak</a>
					<a href="/faq" class="transition-colors hover:text-[#0155FF]">FAQ</a>

					<span class="h-4 w-px bg-slate-200"></span>

					<div class="flex items-center gap-1.5">
						{#each socialLinks as item}
							<a
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 active:scale-90 {item.color}"
								aria-label={item.label}
							>
								{@html item.svg}
							</a>
						{/each}
					</div>
				</nav>

				<button
					class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
					onclick={() => (open = !open)}
					aria-label="Toggle menu"
				>
					<div class="flex flex-col gap-1 transition-all duration-200 {open ? 'rotate-90' : ''}">
						<span
							class="h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-200 {open
								? 'translate-y-1.5 rotate-45'
								: ''}"
						></span>
						<span
							class="h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-200 {open
								? 'opacity-0'
								: ''}"
						></span>
						<span
							class="h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-200 {open
								? '-translate-y-1.5 -rotate-45'
								: ''}"
						></span>
					</div>
				</button>
			</div>
		</div>

		{#if open}
			<div
				transition:fly={{ y: -10, duration: 200, easing: cubicOut }}
				class="absolute top-full left-0 w-full border-b border-slate-100 bg-white shadow-lg md:hidden"
			>
				<div class="space-y-1 px-4 py-4">
					<a
						href="/tentang-kami"
						onclick={closeMenu}
						class="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0155FF]"
						>Tentang Kami</a
					>
					<a
						href="/blog"
						onclick={closeMenu}
						class="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0155FF]"
						>Blog</a
					>
					<a
						href="#features"
						onclick={closeMenu}
						class="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0155FF]"
						>Fitur</a
					>

					{#if productsList.length > 0}
						<div class="py-1.5">
							<p class="px-3 py-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
								Produk
							</p>
							{#each productsList as prod}
								<a
									href={prod.href}
									onclick={closeMenu}
									class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0155FF]"
								>
									<div class="rounded-md p-1 {prod.color}">
										<svelte:component this={prod.icon} size={14} />
									</div>
									<span>{prod.title}</span>
								</a>
							{/each}
						</div>
					{/if}

					<a
						href="#get-started"
						onclick={closeMenu}
						class="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0155FF]"
						>Kontak</a
					>
					<a
						href="/faq"
						onclick={closeMenu}
						class="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0155FF]"
						>FAQ</a
					>

					<div class="border-t border-slate-100 pt-3">
						<div class="flex gap-2">
							{#each socialLinks as item}
								<a
									href={item.href}
									target="_blank"
									rel="noopener noreferrer"
									onclick={closeMenu}
									class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-all {item.color}"
								>
									<div class="fill-current text-slate-400">{@html item.svg}</div>
									<span>{item.label}</span>
								</a>
							{/each}
						</div>
					</div>

					<div class="pt-2">
						<a
							href="#get-started"
							onclick={closeMenu}
							class="flex w-full items-center justify-center rounded-lg bg-[#0155FF] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0145dd] active:scale-[0.98]"
						>
							Mulai Sekarang
						</a>
					</div>
				</div>
			</div>
		{/if}
	</header>
{/if}

<main class="min-h-screen">
	<slot />
</main>
