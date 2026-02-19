<script>
	import Hero from '$lib/components/Hero.svelte';
	import Products from '$lib/components/Products.svelte';
	import Features from '$lib/components/Features.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
	
	// Import transition buat animasi
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<svelte:head>
	<title>SITEMEDIKA — The perfect site you have, the convenience you get.</title>
	<link rel="icon" href="/assets/logo-circle.png" />
	<meta name="google-site-verification" content="cmPKTuqioD41LutY6_kGUpIzNLfmf1Sab1LvJw1uymo" />
	<meta
		name="description"
		content="Platform profesional untuk mengelola produk dan operasi dengan cepat, aman, dan skalabel."
	/>
</svelte:head>

{#if visible}
	<div in:fly={{ y: 20, duration: 800 }}>
		<Hero />
	</div>

	<div in:fly={{ y: 30, duration: 1000, delay: 200 }}>
		<Products />
	</div>

	<div in:fly={{ y: 30, duration: 1000, delay: 400 }}>
		<Features />
	</div>

	<Testimonials />
{/if}

<section id="get-started" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="rounded-2xl bg-neutral-950 px-8 py-12 sm:px-10 sm:py-14 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
		<div class="flex flex-col items-center justify-between gap-6 lg:flex-row">
			<div class="text-white">
				<div class="text-2xl font-semibold tracking-tight sm:text-3xl">
					Digitalisasi Tanpa Pusing Dimulai di Sini.
				</div>
				<div class="mt-2 text-neutral-400">
					Siap bantu operasional Anda jadi lebih rapi? Mulai eksplorasi secara gratis atau ngobrol
					santai dengan tim sales kami.
				</div>
			</div>
			<div class="flex items-center gap-4">
				<a
					href={whatsappLink}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition-transform hover:scale-105 active:scale-95"
					>Hubungi Sales</a
				>
				<a
					href="#signup"
					class="inline-flex items-center rounded-md px-5 py-3 text-sm text-white ring-1 ring-white/20 ring-inset transition-colors hover:bg-white/10"
					>Mulai Gratis</a
				>
			</div>
		</div>
	</div>
</section>