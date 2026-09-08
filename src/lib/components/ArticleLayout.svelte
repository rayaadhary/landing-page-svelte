<script>
	let {
		title,
		description,
		ogDescription = description,
		image,
		slug,
		date,
		category,
		author,
		readTime,
		children
	} = $props();
</script>

<svelte:head>
	<title>{title} | Blog AORTA</title>
	<meta name="description" content={ogDescription} />
	<meta property="og:title" content="{title} | Blog AORTA" />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={date} />
	<meta property="og:url" content="https://aorta.my.id/blog/{slug}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={ogDescription} />
	<meta name="twitter:image" content={image} />
	<link rel="canonical" href="https://aorta.my.id/blog/{slug}" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": {title},
			"description": {description},
			"image": "https://aorta.my.id{image}",
			"datePublished": {date},
			"author": { "@type": "Organization", "name": {author} },
			"publisher": { "@id": "https://aorta.my.id/#organization" },
			"mainEntityOfPage": "https://aorta.my.id/blog/{slug}",
			"inLanguage": "id-ID"
		}
	</script>
</svelte:head>

<div class="min-h-screen bg-slate-50">
	<article class="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
		<div
			class="mb-8 flex w-fit items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-1.5 text-xs font-semibold text-slate-500 shadow-sm"
		>
			<a href="/" class="flex items-center gap-1 transition-colors hover:text-[#0155FF]">Beranda</a>
			<span class="text-slate-300">/</span>
			<a href="/blog" class="transition-colors hover:text-[#0155FF]">Blog</a>
			<span class="text-slate-300">/</span>
			<span class="max-w-[200px] truncate font-bold text-slate-800">{title}</span>
		</div>

		<div class="space-y-6">
			<div
				class="flex flex-wrap items-center gap-3 text-[11px] font-bold tracking-wider text-slate-500 uppercase"
			>
				<span class="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-[#0155FF]"
					>{category}</span
				>
				<span>·</span>
				<time datetime={date}>{date}</time>
				<span>·</span>
				<span>{readTime}</span>
			</div>

			<h1
				class="text-3xl leading-tight font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
			>
				{title}
			</h1>

			<p class="text-sm font-medium text-slate-500">{author}</p>
		</div>

		<div class="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
			<img src={image} alt={title} class="aspect-video w-full object-cover" />
		</div>

		<div
			class="prose mt-10 max-w-none prose-slate
			prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
			prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl
			prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg
			prose-p:text-sm prose-p:leading-relaxed prose-p:font-medium prose-p:text-slate-600
			prose-a:font-bold prose-a:text-[#0155FF] prose-a:no-underline hover:prose-a:underline
			prose-blockquote:rounded-r-xl
			prose-blockquote:border-l-[#0155FF] prose-blockquote:bg-slate-50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:text-sm prose-blockquote:text-slate-600 prose-strong:text-slate-900
			prose-code:rounded prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs prose-code:font-bold prose-code:text-[#0155FF]
			prose-li:text-sm prose-li:text-slate-600 prose-table:text-sm prose-th:bg-slate-50 prose-th:p-3
			prose-th:font-bold prose-th:text-slate-700
			prose-td:p-3 prose-td:text-slate-600
		"
		>
			{@render children()}
		</div>

		<div class="mt-10 flex flex-wrap gap-2 text-xs">
		<a href="/blog/cara-memilih-simrs-rumah-sakit" class="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 hover:border-[#0155FF] hover:text-[#0155FF]">Cara memilih SIMRS →</a>
		<a href="/blog/harga-software-simrs-murah-terintegrasi-bpjs-satu-sehat" class="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 hover:border-[#0155FF] hover:text-[#0155FF]">Harga SIMRS →</a>
		<a href="/blog/apa-itu-sim-klinik-manfaat" class="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 hover:border-[#0155FF] hover:text-[#0155FF]">Apa itu SIM Klinik →</a>
		<a href="/blog/jasa-pembuatan-aplikasi-website" class="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 hover:border-[#0155FF] hover:text-[#0155FF]">Jasa Pembuatan Aplikasi →</a>
	</div>
	<div class="mt-16 border-t border-slate-200 pt-8 text-center">
			<p class="mb-4 text-sm font-semibold text-slate-500">Tertarik dengan solusi AORTA?</p>
			<a
				href="https://wa.me/6289629949441?text=Halo%20saya%20tertarik%20dengan%20produk%20AORTA"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-xl bg-[#0155FF] px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:opacity-90 active:scale-95"
			>
				Konsultasi Gratis via WhatsApp
			</a>
			<div class="mt-4">
				<a href="/blog" class="text-xs font-bold text-[#0155FF] hover:underline"
					>← Kembali ke Blog</a
				>
			</div>
		</div>
	</article>
</div>
