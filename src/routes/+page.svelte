<script>
	import Hero from '$lib/components/Hero.svelte';
	import Products from '$lib/components/Products.svelte';
	import Features from '$lib/components/Features.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
</script>

<svelte:head>
	<title>SITEMEDIKA — The perfect site you have, the convenience you get.</title>
  <meta name="google-site-verification" content="cmPKTuqioD41LutY6_kGUpIzNLfmf1Sab1LvJw1uymo" />
	<meta
		name="description"
		content="Platform profesional untuk mengelola produk dan operasi dengan cepat, aman, dan skalabel."
	/>
</svelte:head>

<Hero />
<Products />
<Features />
<Testimonials />
<section id="get-started" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="rounded-2xl bg-neutral-950 px-8 py-12 sm:px-10 sm:py-14">
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
					href="#contact"
					class="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm text-neutral-900"
					>Hubungi Sales</a
				>
				<a
					href="#signup"
					class="inline-flex items-center rounded-md px-5 py-3 text-sm text-white ring-1 ring-white/20 ring-inset"
					>Mulai Gratis</a
				>
			</div>
		</div>
	</div>
</section>
