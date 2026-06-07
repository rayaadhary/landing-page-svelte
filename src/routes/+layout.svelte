<script>
	import '../app.css';
	import './layout.css';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let open = false;

	const closeMenu = () => {
		open = false;
	};

	// DATA SVG FIXED & VALID
	const socialLinks = [
		{ 
			href: 'https://wa.me/yournumber', 
			label: 'WhatsApp', 
			color: 'hover:text-[#25D366] hover:bg-emerald-50',
			svg: `<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
		},
		{ 
			href: 'https://instagram.com/yourprofile', 
			label: 'Instagram', 
			color: 'hover:text-[#E4405F] hover:bg-pink-50',
			svg: `<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`
		},
		{ 
			href: 'https://youtube.com/yourchannel', 
			label: 'YouTube', 
			color: 'hover:text-[#FF0000] hover:bg-red-50',
			svg: `<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
		},
		{ 
			href: 'mailto:yourmail@aorta.com', 
			label: 'Email', 
			color: 'hover:text-[#0155FF] hover:bg-blue-50',
			svg: `<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
		}
	];
</script>

<header class="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/70 backdrop-blur-md transition-all duration-300">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-20 items-center justify-between">
			
			<a href="/" class="group flex items-center gap-2 transition-transform duration-300 active:scale-95">
				<img src="/assets/logo.png" alt="AORTA" class="h-15 w-15 rounded-md" />
				<span class="text-2xl font-black tracking-tight bg-gray-800 bg-clip-text text-transparent transition-transform duration-500 group-hover:rotate-1">
					AORTA
				</span>
			</a>

			<nav class="hidden items-center gap-8 text-sm font-semibold text-neutral-600 md:flex">
				<a href="#features" class="relative py-2 transition-colors duration-300 hover:text-[#0155FF] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#0155FF] after:to-[#00C2CB] after:transition-all after:duration-300 hover:after:w-full">Fitur</a>
				<a href="#products" class="relative py-2 transition-colors duration-300 hover:text-[#0155FF] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#0155FF] after:to-[#00C2CB] after:transition-all after:duration-300 hover:after:w-full">Produk</a>
				<a href="#contact" class="relative py-2 transition-colors duration-300 hover:text-[#0155FF] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#0155FF] after:to-[#00C2CB] after:transition-all after:duration-300 hover:after:w-full">Kontak</a>
				
				<span class="h-4 w-px bg-neutral-200"></span>

				<div class="flex items-center gap-2.5">
					{#each socialLinks as item}
						<a 
							href={item.href} 
							target="_blank" 
							rel="noopener noreferrer" 
							class="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 transition-all duration-300 active:scale-90 {item.color}"
							title={item.label}
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
					<span class="h-0.5 w-6 rounded-full bg-neutral-800 transition-all duration-300 {open ? 'rotate-45 translate-y-2' : ''}"></span>
					<span class="h-0.5 w-6 rounded-full bg-neutral-800 transition-all duration-300 {open ? 'opacity-0' : ''}"></span>
					<span class="h-0.5 w-6 rounded-full bg-neutral-800 transition-all duration-300 {open ? '-rotate-45 -translate-y-1' : ''}"></span>
				</div>
			</button>
		</div>
	</div>

	{#if open}
		<div 
			transition:fly={{ y: -20, duration: 300, easing: cubicOut }}
			class="absolute left-0 top-full w-full border-b border-neutral-100 bg-white/95 shadow-xl backdrop-blur-lg md:hidden"
		>
			<div class="space-y-2 px-6 py-6 font-medium text-neutral-700">
				<a href="#features" on:click={closeMenu} class="block rounded-lg px-3 py-2.5 transition-colors hover:bg-neutral-50 hover:text-[#0155FF]">Fitur</a>
				<a href="#products" on:click={closeMenu} class="block rounded-lg px-3 py-2.5 transition-colors hover:bg-neutral-50 hover:text-[#0155FF]">Produk</a>
				<a href="#contact" on:click={closeMenu} class="block rounded-lg px-3 py-2.5 transition-colors hover:bg-neutral-50 hover:text-[#0155FF]">Kontak</a>
				
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
							<div class="text-neutral-400 fill-current">
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
						class="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#0155FF] to-[#00C2CB] py-3 text-center font-bold text-white shadow-md active:scale-98"
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