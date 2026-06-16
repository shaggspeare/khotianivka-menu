# Claude Code prompt — Beach Santa Khotianivka menu site

Build a mobile-first digital **menu website** for a beach bar called **Beach Santa**
(in Хотянівка, near Kyiv). It's a read-only menu that customers open by scanning a
QR code at the bar. Borrow the *structure* of choiceQR menus such as
`https://mimosa.choiceqr.com/section:bar/mocktails` (one scrolling page, a sticky
section tab bar) — but make the design **very minimalistic**: a clean, type-led
black-white-grey list, no photo cards, lots of whitespace.

**All user-facing text and content is in Ukrainian. Code, comments, and commits in English.**

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- `next/font` (must support Cyrillic). No item photos in v1.
- Fully static (SSG) — no backend, no DB, no cart. Deploy target: Vercel.

## Sections (exactly three)
1. **Безалкогольні** — non-alcoholic drinks
2. **Алкогольні** — alcoholic drinks
3. **Снеки** — snacks

## Data
Use the provided `menu-data.ts` as the single source of truth — copy it to
`src/data/menu.ts` and import `SECTIONS`, `MENU`, `MENU_NOTE`, and `itemsForSection`.
Do **not** retype or invent menu content; everything is already structured there.

Key data behaviour:
- Each item has `variants`, one per section it belongs to.
- Cocktails with both versions have a `non-alco` **and** an `alco` variant — they must
  appear in **both** tabs, each showing that variant's `price`, optional `label`
  ("Без алкоголю" / "З алкоголем"), and `extra` (the spirit, e.g. "+ Finlandia або Oakheart").
- `price: null` → render "уточнюється".

## What to build
A single page: **Hero → sticky SectionNav → three MenuSections → Footer.**

- **Hero:** minimal — "Beach Santa" in large type + Ukrainian tagline
  ("Пляжний бар • Хотянівка") on the plain background. No cover photo / overlay needed.
- **SectionNav (most important interaction):** sticky to the top after the hero;
  three plain text tab buttons; tap = smooth-scroll to section; active tab tracks scroll
  position via `IntersectionObserver` (active state = thin underline or weight change,
  no filled pill); account for nav height (scroll-margin-top).
- **MenuSection:** heading + subtitle, then the items via `itemsForSection(id)`.
  Show `MENU_NOTE` once (small, muted) under each drinks section.
- **MenuItemRow (not a card):** name + price on one line (price right-aligned),
  description below in muted text, `volume`/`note` smaller still, hairline rule between
  rows. No box, no shadow, no thumbnail. `tags` ("Новинка") as a small understated label.
  Show the variant `label` next to the price and append `extra` to the description.
- **Footer:** name + Хотянівка, working hours / Instagram / phone as clearly-marked
  placeholders, and the 400 мл note.

## Design — very minimalistic
Type-led black-white-grey list. Whitespace does the work; no decoration that isn't
information. **No cards, no shadows, no rounded bubbles, no item photos, no motifs,
no gradients.** Items are separated by hairline rules and spacing.

Palette (CSS variables): bg `#FFFFFF` (or `#FAFAF8`), ink `#111111`, muted `#8A8A8A`,
line `#E6E6E6`. Accent effectively none — if one is wanted, a single quiet colour
(e.g. muted teal `#2E6E70`) used only for the active-tab underline and "Новинка".

One clean Cyrillic-capable grotesque sans via `next/font` (Inter / Onest / Manrope).
Differentiate by **weight and size, not colour**: name = medium ink, description =
regular muted, price = medium right-aligned. Mobile-first single column, wide margins,
generous line-height (≥15–16px body). Smooth scroll only; respect
`prefers-reduced-motion`. WCAG AA contrast (near-black on white for outdoor reading);
tap targets ≥44px.

See `SPEC.md` §6 for full detail.

## Metadata
Ukrainian `<title>` "Beach Santa — пляжний бар у Хотянівці", description, Open Graph
(use hero image), `lang="uk"`, favicon, `theme-color`.

## Steps
1. Read `SPEC.md` and `menu-data.ts` first.
2. Scaffold the structure from SPEC §4.
3. Copy in the data file, build `lib/format.ts`, then components bottom-up
   (Tag, PriceTag, MenuItemRow, MenuSection, SectionNav, MenuHero, SiteFooter).
4. Assemble `page.tsx` and `layout.tsx` (font + metadata).
5. No images needed — it's a text menu; ensure it builds and reads cleanly without them.
6. Verify against the acceptance checklist in SPEC §9; ensure `next build` passes with no console errors.

## Notes / assumptions to confirm with me
- Treating this as read-only (no ordering) for v1.
- Спирт для алкогольного «Персикового лимонаду» не був вказаний у меню — поставив
  дефолт Finlandia/Oakheart, треба підтвердити.
- Footer contacts and hours are placeholders for now.
