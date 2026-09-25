<script>
	import { ArrowLeft, ChevronRight, MessageCircle } from 'lucide-svelte';
	import bgMain3 from '$lib/assets/bg_main3.webp';

	let { data } = $props();
	let post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} — Blog AORTA</title>
	<meta name="description" content={post.metaDescription || post.excerpt} />
	<meta property="og:title" content="{post.title} — Blog AORTA" />
	<meta property="og:description" content={post.metaDescription || post.excerpt} />
	<meta property="og:image" content={post.image} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={post.date} />
	<meta property="og:url" content="https://aorta.my.id/blog/{post.slug}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.metaDescription || post.excerpt} />
	<meta name="twitter:image" content={post.image} />
	<link rel="canonical" href="https://aorta.my.id/blog/{post.slug}" />
</svelte:head>

<!-- Ambient Soft Glow -->
<div class="pointer-events-none fixed inset-0 -z-10 bg-slate-50/50">
	<div
		class="absolute top-0 left-1/2 h-[300px] w-full max-w-5xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(1,85,255,0.04),transparent_70%)]"
	></div>
</div>

<div class="min-h-screen">
	<article class="mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
		<!-- Navigation Breadcrumb -->
		<nav class="flex items-center gap-2 text-xs font-medium text-slate-500">
			<a href="/" class="transition-colors hover:text-slate-900">Beranda</a>
			<ChevronRight size={12} class="text-slate-300" />
			<a href="/blog" class="transition-colors hover:text-slate-900">Blog</a>
			<ChevronRight size={12} class="text-slate-300" />
			<span class="max-w-[220px] truncate font-semibold text-slate-900">{post.title}</span>
		</nav>

		<!-- Article Header -->
		<header class="mt-8 space-y-4">
			<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
				<span class="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#0155FF]">
					{post.category}
				</span>
				<span>·</span>
				<time datetime={post.date}>{post.date}</time>
			</div>

			<h1
				class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]"
			>
				{post.title}
			</h1>

			<div class="flex items-center gap-2 pt-1 text-xs font-medium text-slate-500">
				<span>Ditulis oleh <strong class="font-semibold text-slate-800">{post.author}</strong></span
				>
			</div>
		</header>

		<!-- Featured Image -->
		<div
			class="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-sm"
		>
			<img
				src={post.image}
				alt={post.title}
				class="aspect-[16/9] w-full rounded-xl object-cover"
				width="1200"
				height="675"
				loading="eager"
				fetchpriority="high"
				decoding="async"
			/>
		</div>

		<!-- Article Typography / Content -->
		<div
			class="prose mt-10 max-w-none prose-slate
			prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900
			prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl
			prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg
			prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-600
			prose-a:font-semibold prose-a:text-[#0155FF] prose-a:no-underline hover:prose-a:underline
			prose-blockquote:rounded-r-xl prose-blockquote:border-l-2 prose-blockquote:border-l-[#0155FF] prose-blockquote:bg-slate-50 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-sm prose-blockquote:text-slate-600 prose-blockquote:not-italic
			prose-strong:font-semibold prose-strong:text-slate-900
			prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs prose-code:font-semibold prose-code:text-slate-800
			prose-li:text-base prose-li:text-slate-600
			prose-table:text-sm prose-th:bg-slate-50 prose-th:p-3 prose-th:font-semibold prose-th:text-slate-800 prose-td:p-3 prose-td:text-slate-600"
		>
			{@html post.content}
		</div>

		<!-- Footer Action & CTA -->
		<footer class="mt-16 space-y-8 border-t border-slate-200/60 pt-8">
			<!-- CTA Card dengan Dark Style + bgMain3 Overlay -->
			<div class="relative overflow-hidden rounded-2xl border border-slate-800 px-6 py-8 sm:px-10">
				<!-- Background Image dengan Gradient Overlay -->
				<div class="absolute inset-0 -z-10">
					<img src={bgMain3} alt="Background" class="h-full w-full object-cover object-center" />
					<!-- Dark Overlay lembut -->
					<div
						class="absolute inset-0 z-0 bg-gradient-to-t from-slate-950/90 via-slate-900/80 to-slate-900/70"
					></div>
				</div>

				<!-- Content -->
				<div
					class="relative z-10 text-center sm:flex sm:items-center sm:justify-between sm:text-left"
				>
					<div class="space-y-1">
						<h3 class="text-base font-semibold text-white sm:text-lg">
							Tertarik dengan solusi software AORTA?
						</h3>
						<p class="text-xs text-slate-300">
							Konsultasikan kebutuhan SIMRS, HRIS, POS, atau custom app secara langsung.
						</p>
					</div>

					<div class="mt-6 sm:mt-0 sm:shrink-0">
						<a
							href="https://wa.me/6289629949441?text=Halo%20saya%20tertarik%20dengan%20produk%20AORTA"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 transition-all hover:bg-slate-100 active:scale-[0.98]"
						>
							<MessageCircle size={15} />
							<span>Konsultasi WhatsApp</span>
						</a>
					</div>
				</div>
			</div>

			<!-- Back to Blog Link -->
			<div>
				<a
					href="/blog"
					class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-[#0155FF]"
				>
					<ArrowLeft size={14} />
					<span>Kembali ke daftar artikel</span>
				</a>
			</div>
		</footer>
	</article>
</div>
