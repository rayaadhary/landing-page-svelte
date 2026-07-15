<script>
	let { title, description, ogDescription = description, image, slug, date, category, author, readTime, children } = $props();
</script>

<svelte:head>
	<title>{title} | Blog AORTA</title>
	<meta name="description" content={ogDescription} />
	<meta property="og:title" content="{title} | Blog AORTA" />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={date} />
	<link rel="canonical" href="https://aorta-digital.vercel.app/blog/{slug}" />
</svelte:head>

<div class="min-h-screen bg-slate-50">
	<article class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
		<div class="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-100 rounded-full py-1.5 px-4 w-fit shadow-sm mb-8">
			<a href="/" class="hover:text-[#0155FF] transition-colors flex items-center gap-1">Beranda</a>
			<span class="text-slate-300">/</span>
			<a href="/blog" class="hover:text-[#0155FF] transition-colors">Blog</a>
			<span class="text-slate-300">/</span>
			<span class="text-slate-800 font-bold truncate max-w-[200px]">{title}</span>
		</div>

		<div class="space-y-6">
			<div class="flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
				<span class="text-[#0155FF] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">{category}</span>
				<span>·</span>
				<time datetime={date}>{date}</time>
				<span>·</span>
				<span>{readTime}</span>
			</div>

			<h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">{title}</h1>

			<p class="text-slate-500 font-medium text-sm">{author}</p>
		</div>

		<div class="mt-10 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
			<img src={image} alt={title} class="w-full aspect-video object-cover" />
		</div>

		<div class="mt-10 prose prose-slate max-w-none
			prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
			prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
			prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
			prose-p:text-sm prose-p:leading-relaxed prose-p:text-slate-600 prose-p:font-medium
			prose-a:text-[#0155FF] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
			prose-strong:text-slate-900
			prose-table:text-sm prose-th:bg-slate-50 prose-th:text-slate-700 prose-th:font-bold prose-th:p-3 prose-td:p-3 prose-td:text-slate-600
			prose-code:text-[#0155FF] prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-bold
			prose-blockquote:border-l-[#0155FF] prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl
			prose-blockquote:text-sm prose-blockquote:text-slate-600
			prose-li:text-sm prose-li:text-slate-600
		">
			{@render children()}
		</div>

		<div class="mt-16 border-t border-slate-200 pt-8 text-center">
			<p class="text-sm font-semibold text-slate-500 mb-4">Tertarik dengan solusi AORTA?</p>
			<a href="https://wa.me/6289671328650?text=Halo%20saya%20tertarik%20dengan%20produk%20AORTA" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-gradient-to-r from-[#0155FF] to-[#00C2CB] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-blue-500/10 hover:opacity-95 transition-all active:scale-95">
				Konsultasi Gratis via WhatsApp
			</a>
			<div class="mt-4">
				<a href="/blog" class="text-xs font-bold text-[#0155FF] hover:underline">← Kembali ke Blog</a>
			</div>
		</div>
	</article>
</div>
