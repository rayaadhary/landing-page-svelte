<script>
	import { getAllArticles } from '$lib/data/blog/articles.js';
	let articles = getAllArticles();
</script>

<svelte:head>
	<title>Blog — AORTA | Tips SIMRS, Aplikasi Klinik & Jasa Pembuatan Software</title>
	<meta name="description" content="Blog AORTA: artikel seputar SIMRS rumah sakit, aplikasi klinik, HRIS, POS, dan jasa pembuatan aplikasi custom untuk bisnis di Indonesia." />
	<link rel="canonical" href="https://aorta.my.id/blog" />
</svelte:head>

<div class="min-h-screen bg-slate-50">
	<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
		<div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
			<span class="inline-block text-[10px] font-black tracking-[0.2em] uppercase text-[#0155FF] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-md">BLOG</span>
			<h1 class="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">Artikel & <span class="bg-gradient-to-r from-[#0155FF] to-[#00C2CB] bg-clip-text text-transparent">Panduan Digital</span></h1>
			<p class="text-slate-500 font-medium text-sm max-w-lg mx-auto">Tips, panduan, dan insight seputar SIMRS, aplikasi klinik, HRIS, dan jasa pembuatan software custom.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each articles as article, i}
				<a href="/blog/{article.slug}" class="group block">
					<article class="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(1,85,255,0.08)] hover:-translate-y-1">
						<div class="aspect-[16/10] bg-slate-100 overflow-hidden">
							<img src={article.image} alt={article.title} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading={i < 2 ? 'eager' : 'lazy'} />
						</div>
						<div class="p-5 space-y-3">
							<div class="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
								<span class="text-[#0155FF]">{article.category}</span>
								<span class="text-slate-300">·</span>
								<span>{article.readTime}</span>
							</div>
							<h2 class="font-black text-slate-900 text-base leading-snug group-hover:text-[#0155FF] transition-colors">{article.title}</h2>
							<p class="text-xs text-slate-500 font-medium leading-relaxed">{article.excerpt}</p>
							<div class="flex items-center gap-2 pt-1 text-[10px] font-semibold text-slate-400">
								<span>{article.author}</span>
								<span>·</span>
								<time datetime={article.date}>{article.date}</time>
							</div>
						</div>
					</article>
				</a>
			{/each}
		</div>
	</section>
</div>
