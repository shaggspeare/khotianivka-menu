# Beach Santa Khotianivka — Technical & Design Spec

A mobile-first digital menu for the beach bar **Beach Santa** (Хотянівка, near Kyiv).
Read-only menu accessed via QR code at the bar. Borrows the *structure* of choiceQR
menus (e.g. `mimosa.choiceqr.com`) — single scrolling page, sticky section tabs — but
the visual treatment is **very minimalistic**: a clean, type-led black-white-grey list,
no photo cards.

All UI text and content are **Ukrainian**. Docs/code comments are English.

---

## 1. Scope (v1)

- Single-page menu, three sections: **Безалкогольні**, **Алкогольні**, **Снеки**.
- No cart, no ordering, no auth, no backend — content lives in a typed data file.
- Optimised for phones (people scan a QR at a table). Must also look fine on desktop.
- Fast cold load on mobile data; works well in bright sunlight (good contrast).

### Out of scope for v1 (note in code for later)
- Cart / online ordering / payments.
- CMS (data file is structured so it could later move to PayloadCMS — Slava's stack).
- Multi-language (Ukrainian only now; keep strings groupable for future i18n).

---

## 2. Tech stack

- **Next.js** (App Router) + **TypeScript**.
- **Tailwind CSS** for styling.
- `next/font` for a Cyrillic-capable sans (no item photos in v1).
- Static generation (the whole menu is static) — no runtime data fetching.
- Deploy target: **Vercel**.
- Lucide-react (or similar) for the few icons (location, clock, instagram).

Keep dependencies minimal. No state-management lib needed.

---

## 3. Data

Source of truth: `src/data/menu.ts` (provided as `menu-data.ts`).

Model summary:
- `SECTIONS` — the three tabs.
- `MENU` — array of `MenuItem`.
- Each `MenuItem` has one or more `variants`, **one per section** it appears in.
  - Cocktails available in both forms have a `non-alco` variant **and** an `alco`
    variant → they render in *both* tabs with the correct price + spirit note.
  - `price: null` → render as `уточнюється` (for items not yet priced; no current item uses this).
- `itemsForSection(id)` helper returns items for a tab with the right variant resolved.

`MENU_NOTE` ("Усі коктейлі — 400 мл…") is shown once per drinks section (or in footer).

⚠️ One assumption baked into the data: the spirit for the alco **Персиковий лимонад**
wasn't specified in the source doc; house default (Finlandia/Oakheart) was used — confirm.

---

## 4. Routes & structure

```
src/
  app/
    layout.tsx          // <html lang="uk">, fonts, metadata, OG tags
    page.tsx            // the menu page (SSG)
    globals.css         // tailwind + CSS vars / theme tokens
  data/
    menu.ts             // provided menu-data.ts
  components/
    MenuHero.tsx        // cover image + bar name + tagline
    SectionNav.tsx      // sticky tabs, scroll-spy + smooth scroll
    MenuSection.tsx     // heading + list of rows for one section
    MenuItemRow.tsx     // name, price, description, volume, tags, note (no card/photo)
    PriceTag.tsx        // formats a number as "120 ₴" / "уточнюється"
    Tag.tsx             // "Новинка" — small understated label
    SiteFooter.tsx      // address, hours, socials, the 400 мл note
  lib/
    format.ts           // formatPrice(), small helpers
public/
  // no item photos needed for v1 (text menu)
```

Single page (`page.tsx`) renders Hero → SectionNav → three MenuSections → Footer.

---

## 5. Components — behaviour

**MenuHero**
- Minimal: bar name "Beach Santa" in large type + a short Ukrainian tagline
  ("Пляжний бар • Хотянівка"), on the plain background. No photo needed; if a cover
  image is used at all, keep it understated. No heavy overlay/gradient decoration.

**SectionNav** (the key choiceQR pattern)
- Sticky to top after the hero scrolls past (`position: sticky; top: 0`).
- Three pill/tab buttons: Безалкогольні · Алкогольні · Снеки.
- Tapping a tab smooth-scrolls to that section.
- Active tab updates as the user scrolls (scroll-spy via `IntersectionObserver`).
- Horizontally scrollable if it ever overflows on very small screens.
- Account for sticky-nav height when scrolling to a section (scroll-margin-top).

**MenuSection**
- Section heading (`title`) + optional `subtitle`.
- Renders `itemsForSection(section.id)`.
- Drinks sections show `MENU_NOTE` once (small, muted) at the bottom.

**MenuItemRow** (not a "card" — a typographic row)
- One line: item name (medium ink, left) + price (medium, right-aligned).
- Below: description in muted text; `volume`, `note` smaller/muted still.
- `Tag`s ("Новинка") as a small understated label, not a loud pill.
- If `variant.label` exists, show it next to the price (e.g. "З алкоголем · 200 ₴").
- If `variant.extra` exists, append it to the description (muted or faint accent).
- Hairline rule (`--line`) between rows. No box, no shadow, no thumbnail by default.

**PriceTag / format**
- `null` → "уточнюється" (muted). Number → `${n} ₴`. No decimals.

---

## 6. Design direction — **very minimalistic**

Strip everything back. The menu is a clean typographic list, not a photo catalogue.
Borrow choiceQR's *structure* (sticky tabs, single scroll) but none of its visual
busyness. Think a quiet, confident, type-led menu — closer to a black-white-grey
editorial layout than a colourful app.

**Principles:**
- Whitespace does the work. No decoration that isn't information.
- Monochrome base + at most **one** restrained accent, used sparingly.
- Flat: **no cards, no drop shadows, no rounded "bubbles."** Items are separated by
  hairline rules and spacing, not boxes.
- **No item photos by default.** It's a text menu. (Keep the `image` field supported
  but unused for v1; if a hero image is used at all, keep it minimal/optional.)
- No motifs, no gradients-as-decoration, no entrance animations beyond a near-instant
  fade. Respect `prefers-reduced-motion`.

**Palette (CSS variables / Tailwind theme):**
- `--bg` `#FFFFFF` (or a near-white `#FAFAF8`)
- `--ink` `#111111` — primary text
- `--muted` `#8A8A8A` — volumes, notes, secondary text
- `--line` `#E6E6E6` — hairline dividers
- `--accent` `#111111` by default (i.e. effectively none). If one accent is wanted,
  a single quiet colour (e.g. a muted teal `#2E6E70`) used only for the active tab
  underline and "Новинка" — never for whole surfaces.

**Typography (this carries the whole design):**
- One clean grotesque/neo-grotesque sans with Cyrillic via `next/font`
  (e.g. **Inter**, **Onest**, or **Manrope**). One family is enough.
- Differentiate with **weight and size**, not colour or decoration:
  item name = medium weight ink; description = regular muted; price = medium, aligned right.
- Section headings: larger, can be a touch of letter-spacing or uppercase; keep restrained.
- Comfortable mobile body (≥15–16px), generous line-height.

**Layout & feel:**
- Mobile-first single column, wide margins, lots of vertical breathing room.
- Item row: name + price on one line (price right-aligned), description on the line
  below in muted text; `volume`/`note` smaller still. A hairline rule between items.
- "Новинка" as a tiny understated label (small caps / thin outline), not a loud pill.
- Sticky tab nav is plain text tabs; active state = a thin underline or weight change,
  no filled pill.
- Smooth scroll only.

**Accessibility:**
- WCAG AA contrast (important: outdoors — keep text near-black on white). Tap targets ≥ 44px.
- Tabs are real buttons; section headings are proper `<h2>`; `lang="uk"`.

---

## 7. SEO / metadata

- `<title>`: `Beach Santa — пляжний бар у Хотянівці`
- meta description (Ukrainian), Open Graph title/description/image (hero image).
- `lang="uk"`. Favicon. `theme-color` = `--sea`.
- Single canonical URL.

---

## 8. Footer content (placeholders — confirm with client)

- Назва: **Beach Santa**, Хотянівка (пляж).
- Графік роботи: _уточнити_.
- Інстаграм / контактний телефон: _уточнити_.
- Note: "Усі коктейлі — 400 мл, якщо не вказано інше. Стаканчики стандартні."
- Optional Google Maps link / embed to the beach location.

---

## 9. Acceptance checklist

- [ ] Three sections render with all items from `menu.ts`, correct prices.
- [ ] Dual cocktails appear in **both** non-alco and alco tabs with the right price + spirit.
- [ ] Sticky tab nav with working smooth-scroll + scroll-spy active state.
- [ ] "Новинка" badges on Апероль шприц, Белліні, Зірочка палай.
- [ ] Items with `price: null` render "уточнюється" instead of a number (no current item triggers this).
- [ ] Looks good on a 360–390px phone; readable in bright light; AA contrast.
- [ ] Static build, no console errors, deploys to Vercel.
- [ ] All visible text is Ukrainian.
