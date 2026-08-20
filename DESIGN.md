# Design System — AORTA Landing Page

<!-- impeccable:design-system 1 -->

Recorrded from the incumbent SvelteKit + Tailwind v4 implementation in `src/`. This documents what exists so future work extends it instead of drifting.

## Palette

Anchor brand colors (used as literal Tailwind arbitrary values across components):

| Token | Value | Usage |
|---|---|---|
| `blue-500` | `#0155FF` | Primary accent, primary CTA text/fill, links, hover |
| `cyan-500` | `#00C2CB` | Secondary accent, checkmarks, selection bg |
| `slate-950` | `#020617` | Dark CTA section background |
| `slate-900/50+` | `#0f172a` | Dark surfaces, headings |
| `slate-50` | `#f8fafc` | Page background |
| `slate-100/200` | `#f1f5f9/#e2e8f0` | Borders, dividers |
| `slate-500/600` | `#64748b/#475569` | Secondary/body text (AA-compliant) |
| `white` | `#ffffff` | Card surfaces |

Gradients: `from-[#0155FF] to-[#00C2CB]` reserved for icon tiles and decorative glows only. CTA buttons are solid `#0155FF` (no gradient).

## Type

- Display + body: **Inter** (Google Fonts, weights 400/500/600/700/900). Single face — future work should pair a display face. `tracking-tight` on display headings; `tracking-widest` only on small uppercase labels.
- Scale ladder: `text-[10px]` labels → `text-xs/sm` body → `text-2xl/3xl` section h2 → `text-4xl/5xl/6xl` hero h1.
- Display max ~`text-6xl`; body measure capped ~`max-w-3xl`.

## Space & Shape

- Layout container: `max-w-7xl` with `px-4 sm:px-6 lg:px-8`.
- Section rhythm: `py-20`.
- Card radius: `rounded-[2rem]` (large feature/testimonial cards), `rounded-3xl` (product cards), `rounded-2xl` (controls/icons), `rounded-xl` (buttons/inputs).
- Buttons: solid `#0155FF`, pill `rounded-full` (hero), `rounded-xl` (elsewhere), py-3/4, hover opacity-90.
- Motion: `in:fly` entrances, exponential cubic-bezier `cubic-bezier(0.23,1,0.32,1)` for carousels, `duration-300/500/700`. Reduced-motion handled globally in `app.css`.

## Components

- `Hero` — split layout, auto-advancing slide with typewriter; skip typing under reduced-motion.
- `Products` — paginated carousel (3/2/1 per viewport) + detail modal (Escape/focus-managed, `aria-labelledby`).
- `Features` — asymmetric bento grid (`lg:col-span-2`), gradient icon tiles.
- `ProductCard` — editorial card: ghost index number, plain feature dots, text-only "Lihat detail" affordance (no gradient button; whole card opens detail modal).
- Header/footer — sticky translucent header, dark CTA section with footer columns.

## Conventions

- Icons: `lucide-svelte` only, `strokeWidth={2.5}` on tiles.
- Images: `.webp` sources via `<picture>`, `loading="lazy"` off-first-viewport, aspect-ratio wrappers to avoid CLS.
- Contact truth: WhatsApp `wa.me/6289629949441`, email `aortadigitalsolusi.business@gmail.com`, kantor Cianjur, Jawa Barat. Never placeholder social URLs.
- Copy in Bahasa Indonesia; no fabricated metrics/testimonials (see PRODUCT.md).