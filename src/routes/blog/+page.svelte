<script>
	import { page } from '$app/stores';
	import { getAllArticles } from '$lib/data/blog/articles.js';

	const PER_PAGE = 9;
	let allArticles = getAllArticles();
	let totalPages = Math.ceil(allArticles.length / PER_PAGE);

	$: currentPage = Math.min(
		Math.max(Number($page.url.searchParams.get('page')) || 1, 1),
		totalPages
	);
	$: articles = allArticles.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
</script>

<svelte:head>
	<title>Blog — AORTA | Tips SIMRS, Aplikasi Klinik & Jasa Pembuatan Software</title>
	<meta
		name="description"
		content="Blog AORTA: artikel seputar SIMRS rumah sakit, aplikasi klinik, HRIS, POS, dan jasa pembuatan aplikasi custom untuk bisnis di Indonesia."
	/>
	<link rel="canonical" href="https://aorta.my.id/blog" />
</svelte:head>

<div class="min-h-screen bg-slate-50">
	<section class="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
		<div class="mx-auto mb-14 max-w-2xl space-y-3 text-center">
			<span
				class="inline-block rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#0155FF] uppercase"
				>BLOG</span
			>
			<h1 class="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
				Artikel & <span class="text-[#0155FF]">Panduan Digital</span>
			</h1>
			<p class="mx-auto max-w-lg text-sm font-medium text-slate-600">
				Tips, panduan, dan insight seputar SIMRS, aplikasi klinik, HRIS, dan jasa pembuatan software
				custom.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each articles as article, i}
				<a href="/blog/{article.slug}" class="group block">
					<article
						class="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(1,85,255,0.08)]"
					>
						<div class="aspect-[16/10] overflow-hidden bg-slate-100">
							<img
								src={article.image}
								alt={article.title}
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading={i < 2 ? 'eager' : 'lazy'}
							/>
						</div>
						<div class="space-y-3 p-5">
							<div
								class="flex items-center gap-2 text-[10px] font-bold tracking-wider text-slate-600 uppercase"
							>
								<span class="text-[#0155FF]">{article.category}</span>
								<span class="text-slate-300">·</span>
								<span>{article.readTime}</span>
							</div>
							<h2
								class="text-base leading-snug font-black text-slate-900 transition-colors group-hover:text-[#0155FF]"
							>
								{article.title}
							</h2>
							<p class="text-xs leading-relaxed font-medium text-slate-600">{article.excerpt}</p>
							<div class="flex items-center gap-2 pt-1 text-[10px] font-semibold text-slate-500">
								<span>{article.author}</span>
								<span>·</span>
								<time datetime={article.date}>{article.date}</time>
							</div>
						</div>
					</article>
				</a>
			{/each}
		</div>

		{#if totalPages > 1}
			<nav class="mt-12 flex items-center justify-center gap-2" aria-label="Paginasi artikel">
				{#if currentPage > 1}
					<a
						href="/blog?page={currentPage - 1}"
						class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:border-[#0155FF] hover:bg-[#0155FF] hover:text-white"
						>Prev</a
					>
				{:else}
					<span class="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-300"
						>Prev</span
					>
				{/if}

				{#each Array(totalPages) as _, i}
					<a
						href="/blog?page={i + 1}"
						aria-current={currentPage === i + 1 ? 'page' : undefined}
						class="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all {currentPage ===
						i + 1
							? 'bg-[#0155FF] text-white shadow-md'
							: 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}">{i + 1}</a
					>
				{/each}

				{#if currentPage < totalPages}
					<a
						href="/blog?page={currentPage + 1}"
						class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:border-[#0155FF] hover:bg-[#0155FF] hover:text-white"
						>Next</a
					>
				{:else}
					<span class="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-300"
						>Next</span
					>
				{/if}
			</nav>
		{/if}
	</section>
</div>
