<script>
	import { whatsappLink } from '$lib/data/whatsappRedirect.js';
</script>

<section id="hero" class="relative overflow-hidden">
  <div class="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-50 to-white"></div>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
    <div class="text-center">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900">
        Hentikan Kerumitan Operasional, Mulai Kelola Bisnis Secara Profesional.
      </h1>
      <p class="mt-5 text-neutral-600 max-w-2xl mx-auto">
        Mulai dari SIMRS, Klinik, hingga POS, bangun ekosistem digital yang cepat, aman, dan siap berkembang seiring besarnya usaha Anda.
      </p>
      <div class="mt-8 flex items-center justify-center gap-4">
        <a href="#get-started" class="inline-flex items-center rounded-md bg-neutral-900 px-5 py-3 text-white text-sm">Mulai Gratis</a>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" class="inline-flex items-center rounded-md ring-1 ring-inset ring-neutral-300 px-5 py-3 text-neutral-900 text-sm">Hubungi Sales</a>
      </div>
    </div>
    <div class="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
      <div class="rounded-lg ring-1 ring-neutral-200 px-4 py-6">
        <div class="text-3xl font-semibold text-neutral-900">99.99%</div>
        <div class="text-xs text-neutral-600">Uptime</div>
      </div>
      <div class="rounded-lg ring-1 ring-neutral-200 px-4 py-6">
        <div class="text-3xl font-semibold text-neutral-900">500+</div>
        <div class="text-xs text-neutral-600">Klien aktif</div>
      </div>
      <div class="rounded-lg ring-1 ring-neutral-200 px-4 py-6">
        <div class="text-3xl font-semibold text-neutral-900">2x</div>
        <div class="text-xs text-neutral-600">Lebih efisien</div>
      </div>
      <div class="rounded-lg ring-1 ring-neutral-200 px-4 py-6">
        <div class="text-3xl font-semibold text-neutral-900">ISO</div>
        <div class="text-xs text-neutral-600">27001 Compliance</div>
      </div>
    </div>
  </div>
</section>
