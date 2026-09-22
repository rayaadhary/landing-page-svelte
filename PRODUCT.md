# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pemilik dan pengelola fasilitas kesehatan (klinik pratama/utama, rumah sakit kelas C/B/A), UKM, startup, perusahaan, dan instansi di Indonesia (Jawa Barat: Bandung, Cianjur, Indramayu, Subang) yang mencari jasa pembuatan software — SIMRS, SIM Klinik, HRIS, POS, dan custom software. [inferred from blog copy, region-targeted articles]

## Product Purpose

AORTA menjual jasa pembuatan aplikasi dan software enterprise untuk fasilitas kesehatan dan bisnis di Indonesia: SIMRS (Sistem Informasi Manajemen Rumah Sakit), SIM Klinik, HRIS/SDM, POS & Inventory, serta custom software. Tujuannya: digitalisasi operasional yang rapi, terukur, dan compliance regulasi (SatuSehat, Bridging BPJS, standar Kemenkes). Landing page berfungsi menghasilkan lead (kontak WhatsApp sales).

## Positioning

Penyedia solusi software kesehatan modular kelas enterprise dengan compliance regulasi Indonesia (SatuSehat + VClaim BPJS) yang diklaim termasuk dalam harga langganan, bukan biaya tambahan. [inferred from product copy: "mulai 1,5jt/bln" dan klaim bridging termasuk]

## Operating Context

- Bahasa utama: Bahasa Indonesia. Halaman diakses calon pembeli keputusan (manajer RS, pemilik klinik, HRD).
- Kontak utama: WhatsApp sales (+62 896-2994-9441), email aortadigitalsolusi.business@gmail.com, kantor di Cianjur, Jawa Barat.
- Produk yang diiklankan: SIMRS Core Enterprise, SIM Klinik Pratama & Utama, HRIS Smart Corporate, POS & Intelligent Inventory, Custom Architecture System.
- Blog berisi artikel SEO dengan topik SIMRS, aplikasi klinik, HRIS, jasa pembuatan di kota-kota Jawa Barat, undangan digital.

## Capabilities and Constraints

- Stack: SvelteKit 2 + Svelte 5 + Tailwind CSS 4 + lucide-svelte. Deploy: Vercel (adapter-vercel).
- Konten statis; semua produk dan artikel hardcoded sebagai Svelte components, tanpa backend/CMS.
- Struktur: landing (`/`), blog index + ~20 artikel, halaman produk dinamis `/products/[slug]`, sitemap.
- Halaman yang direferensikan tetapi belum ada di repo: `/privacy`, `/terms` (link di footer), `/signup` (anchor CTA). [verified missing in src/routes]

## Brand Commitments

- Nama: AORTA. Tagline footer: "Engineered with Precision • Built for Excellence".
- Domain canonical: aorta.my.id.
- Warna anchor: biru `#0155FF` dan cyan `#00C2CB`; aksen hijau `#25D366` (WhatsApp). [inferred from current implementation]
- Kontak WhatsApp, email, nomor telepon, dan alamat kantor di atas adalah aset nyata yang harus dipertahankan.

## Evidence on Hand

- Produk dan fitur tercantum di `src/lib/components/` (Hero, Products, Features, Testimonials) dan data menu `src/routes/+layout.svelte`.
- Testimoni dan klaim fitur di halaman utama — belum diverifikasi apakah asli atau placeholder; jangan menambah klaim baru tanpa persetujuan. [needs confirmation]

## Product Principles

1. Lead gen adalah tujuan: setiap permukaan harus mengarahkan calon pelanggan ke WhatsApp sales.
2. Compliance kesehatan (SatuSehat/BPJS) adalah pembeda utama vs kompetitor software generik.
3. Bahasa Indonesia, nada meyakinkan dan profesional — bukan jargon SaaS Inggris.
4. Jangan mengarang angka harga, testimoni, atau regulasi yang tidak tertulis di konten existing.