<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getAllArticles } from '$lib/data/blog/articles.js';
	import { estimateReadTime } from '$lib/utils/readTime.js';
	import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-svelte';

	let allArticles = $state([]);
	let loading = $state(true);
	const PER_PAGE = 9;

	onMount(async () => {
		try {
			const res = await fetch('/api/blog');
			if (res.ok) {
				const dbArticles = await res.json();
				if (dbArticles.length > 0) {
					allArticles = dbArticles;
				} else {
					allArticles = getAllArticles();
				}
			} else {
				allArticles = getAllArticles();
			}
		} catch {
			allArticles = getAllArticles();
		}
		loading = false;
	});

	let totalPages = $derived(Math.ceil(allArticles.length / PER_PAGE));
	let currentPage = $derived(
		Math.min(Math.max(Number($page.url.searchParams.get('page')) || 1, 1), Math.max(totalPages, 1))
	);
	let articles = $derived(allArticles.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE));
</script>

<svelte:head>
	<title>Blog & Wawasan Digital — AORTA</title>
	<meta
		name="description"
		content="Blog AORTA: artikel seputar SIMRS rumah sakit, aplikasi klinik, HRIS, POS, dan jasa pembuatan aplikasi custom untuk bisnis di Indonesia."
	/>
	<meta name="robots" content="index, follow" />
	<link
		rel="canonical"
		href="https://aorta.my.id/blog{currentPage > 1 ? `?page=${currentPage}` : ''}"
	/>
	{#if currentPage > 1}<link
			rel="prev"
			href="https://aorta.my.id/blog{currentPage - 1 > 1 ? `?page=${currentPage - 1}` : ''}"
		/>{/if}
	{#if currentPage < totalPages}<link
			rel="next"
			href="https://aorta.my.id/blog?page={currentPage + 1}"
		/>{/if}
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Blog & Wawasan Digital — AORTA" />
	<meta
		property="og:description"
		content="Artikel seputar SIMRS, aplikasi klinik, HRIS, POS, dan jasa software custom."
	/>
	<meta
		property="og:url"
		content="https://aorta.my.id/blog{currentPage > 1 ? `?page=${currentPage}` : ''}"
	/>
	<meta property="og:image" content="https://aorta.my.id/assets/og-default.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Blog & Wawasan Digital — AORTA" />
	<meta
		name="twitter:description"
		content="Artikel seputar SIMRS, aplikasi klinik, HRIS, POS, dan jasa software custom."
	/>
	<meta name="twitter:image" content="https://aorta.my.id/assets/og-default.jpg" />
</svelte:head>

<!-- Subtle Ambient Glow -->
<div class="pointer-events-none fixed inset-0 -z-10 bg-slate-50/50">
	<div
		class="absolute top-0 left-1/2 h-[350px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(1,85,255,0.05),transparent_70%)]"
	></div>
</div>

<div class="min-h-screen">
	<section class="mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mx-auto mb-16 max-w-2xl space-y-3 text-center">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-[#0155FF]"
			>
				<span class="h-1.5 w-1.5 rounded-full bg-[#0155FF]"></span>
				Wawasan & Artikel
			</div>
			<h1 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
				Panduan & Insight Digital
			</h1>
			<p class="text-sm leading-relaxed text-slate-600">
				Eksplorasi artikel teknis, tips manajemen kesehatan, HRIS, POS, dan transformasi teknologi
				informasi.
			</p>
		</div>

		{#if loading}
			<!-- Skeleton State -->
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each Array(6) as _}
					<div class="animate-pulse rounded-2xl border border-slate-200/80 bg-white p-3">
						<div class="aspect-[16/10] rounded-xl bg-slate-100"></div>
						<div class="space-y-2 p-3">
							<div class="h-3 w-1/4 rounded bg-slate-100"></div>
							<div class="h-5 w-3/4 rounded bg-slate-100"></div>
							<div class="h-3 w-full rounded bg-slate-100"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<!-- Articles Grid -->
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each articles as article, i}
					<a
						href="/blog/{article.slug}"
						class="group block {i === 0 ? 'md:col-span-2 lg:col-span-2' : ''}"
					>
						<article
							class="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100/80"
						>
							<div>
								<div class="relative aspect-[16/9] overflow-hidden bg-slate-100">
									<img
										src={article.image}
										alt={article.title}
										class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
										loading={i < 2 ? 'eager' : 'lazy'}
									/>
									<div class="absolute top-3 left-3">
										<span
											class="rounded-md border border-white/40 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-900 shadow-sm backdrop-blur-md"
										>
											{article.category}
										</span>
									</div>
								</div>

								<div class="space-y-2.5 p-6">
									<div class="flex items-center gap-2 text-xs text-slate-500">
										<time datetime={article.date}>{article.date}</time>
										<span>·</span>
										<span
											>{article.content
												? estimateReadTime(article.content)
												: article.readTime}</span
										>
									</div>

									<h2
										class="{i === 0
											? 'text-xl sm:text-2xl'
											: 'text-base'} font-semibold text-slate-900 transition-colors group-hover:text-[#0155FF]"
									>
										{article.title}
									</h2>

									<p class="line-clamp-2 text-xs leading-relaxed text-slate-600">
										{article.excerpt}
									</p>
								</div>
							</div>

							<div
								class="flex items-center justify-between border-t border-slate-100 px-6 pt-2 pb-6 text-xs font-medium text-slate-500"
							>
								<span>Oleh {article.author}</span>
								<span
									class="inline-flex items-center gap-1 text-[#0155FF] transition-transform group-hover:translate-x-0.5"
								>
									Baca <ArrowRight size={12} />
								</span>
							</div>
						</article>
					</a>
				{/each}
			</div>

			<!-- Pagination -->
			{#if totalPages > 1}
				<nav
					class="mt-16 flex items-center justify-center gap-1.5 text-xs font-medium"
					aria-label="Paginasi artikel"
				>
					{#if currentPage > 1}
						<a
							href="/blog?page={currentPage - 1}"
							class="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-slate-600 transition-all hover:bg-slate-50"
						>
							<ChevronLeft size={14} /> Prev
						</a>
					{:else}
						<span
							class="inline-flex h-9 cursor-not-allowed items-center gap-1 rounded-lg border border-slate-100 bg-slate-50 px-3 text-slate-300"
						>
							<ChevronLeft size={14} /> Prev
						</span>
					{/if}

					<div class="mx-2 flex items-center gap-1">
						{#each Array(totalPages) as _, i}
							<a
								href="/blog?page={i + 1}"
								aria-current={currentPage === i + 1 ? 'page' : undefined}
								class="flex h-9 w-9 items-center justify-center rounded-lg transition-all {currentPage ===
								i + 1
									? 'bg-[#0155FF] font-semibold text-white shadow-sm'
									: 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"
							>
								{i + 1}
							</a>
						{/each}
					</div>

					{#if currentPage < totalPages}
						<a
							href="/blog?page={currentPage + 1}"
							class="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-slate-600 transition-all hover:bg-slate-50"
						>
							Next <ChevronRight size={14} />
						</a>
					{:else}
						<span
							class="inline-flex h-9 cursor-not-allowed items-center gap-1 rounded-lg border border-slate-100 bg-slate-50 px-3 text-slate-300"
						>
							Next <ChevronRight size={14} />
						</span>
					{/if}
				</nav>
			{/if}
		{/if}
	</section>
</div>
