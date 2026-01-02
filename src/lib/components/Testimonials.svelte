<script>
	import Carousel from './Carousel.svelte';
	const items = [
		{
			quote: 'Solusi ini mempercepat proses kami secara signifikan.',
			author: 'Rani Setia',
			role: 'COO, Nusantara Global'
		},
		{
			quote: 'Implementasi cepat dan stabil. Tim kami sangat terbantu.',
			author: 'Dimas Pratama',
			role: 'Head of Operations, DeltaTech'
		},
		{
			quote: 'Skalabilitasnya membuat kami percaya untuk jangka panjang.',
			author: 'Maya Putri',
			role: 'CTO, PrimaLog'
		}
	];
</script>

<section id="testimonials" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
	<div class="text-center">
		<h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">Apa Kata Klien</h2>
		<p class="mt-3 text-neutral-600">Cerita nyata dari perusahaan yang bertumbuh bersama kami.</p>
	</div>
	<div class="mt-10">
		<Carousel {items} />
	</div>
</section>
