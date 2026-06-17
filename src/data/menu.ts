/**
 * Beach Santa Khotianivka — menu data
 *
 * Single source of truth for the whole menu. Drop this in `src/data/menu.ts`
 * (or wherever your spec puts it) and import the types + `MENU` constant.
 *
 * Notes from the client:
 *  - Усі коктейлі — 400 мл, якщо не вказано інше.
 *  - Стаканчики стандартні.
 *
 * Pricing model: cocktails that exist in two versions carry TWO variants —
 * one in the `non-alco` section and one in the `alco` section — so the same
 * drink renders in both tabs with the correct price and (for alco) the spirit.
 */

export type SectionId = "non-alco" | "alco" | "snacks";

export interface Section {
  id: SectionId;
  /** Ukrainian label shown in the sticky tab nav + section heading */
  title: string;
  /** optional short subtitle under the heading */
  subtitle?: string;
}

export interface ItemVariant {
  /** which section this variant appears in */
  section: SectionId;
  /** price in UAH; null = "уточнюється" (e.g. popcorn, not finalised yet) */
  price: number | null;
  /** short label shown next to the price, e.g. "Без алкоголю" / "З алкоголем" */
  label?: string;
  /** extra line appended to the description for this variant (e.g. the spirit) */
  extra?: string;
}

export interface MenuItem {
  id: string;
  /** Ukrainian name */
  name: string;
  /** ingredients / composition, Ukrainian */
  description?: string;
  /** e.g. "400 мл", "0.33 л", "120 г", "6 шт" */
  volume?: string;
  /** badges, e.g. ["Новинка"] */
  tags?: string[];
  /** free-form note shown small under the item */
  note?: string;
  /** one entry per section the item appears in */
  variants: ItemVariant[];
  /** optional image path under /public, e.g. "/menu/mojito.jpg" */
  image?: string;
}

export const SECTIONS: Section[] = [
  { id: "non-alco", title: "Безалкогольні", subtitle: "Коктейлі, лимонади, кава" },
  { id: "alco", title: "Алкогольні", subtitle: "Коктейлі, ігристе, пиво" },
  { id: "snacks", title: "Снеки", subtitle: "До напоїв" },
];

export const MENU_NOTE = "Усі коктейлі — 400 мл, якщо не вказано інше. Стаканчики стандартні.";

const SPIRIT_DEFAULT = "+ алкоголь на вибір: Finlandia або Oakheart";

export const MENU: MenuItem[] = [
  /* ─────────────  КОКТЕЙЛІ (без алко + алко)  ───────────── */
  {
    id: "mojito",
    name: "Мохіто",
    description: "Сироп мохіто, лимон, апельсин, мʼята, спрайт",
    volume: "400 мл",
    variants: [
      { section: "non-alco", price: 100, label: "Без алкоголю" },
      { section: "alco", price: 200, label: "З алкоголем", extra: "+ Finlandia або Oakheart" },
    ],
  },
  {
    id: "pina-colada",
    name: "Піна колада",
    description: "Сироп кокос, ананасовий сік",
    volume: "400 мл",
    variants: [
      { section: "non-alco", price: 100, label: "Без алкоголю" },
      { section: "alco", price: 200, label: "З алкоголем", extra: "+ Oakheart" },
    ],
  },
  {
    id: "sun-beach",
    name: "Sun Beach",
    description: "Сироп полуниця, апельсиновий сік, спрайт",
    volume: "400 мл",
    variants: [
      { section: "non-alco", price: 100, label: "Без алкоголю" },
      { section: "alco", price: 200, label: "З алкоголем", extra: "+ Finlandia або Oakheart" },
    ],
  },
  {
    id: "blue-lagoon",
    name: "Блакитна лагуна",
    description: "Сироп Блю Кюрасао, ананасовий сік, спрайт",
    volume: "400 мл",
    variants: [
      { section: "non-alco", price: 100, label: "Без алкоголю" },
      { section: "alco", price: 200, label: "З алкоголем", extra: "+ Finlandia" },
    ],
  },
  {
    id: "mango-passionfruit",
    name: "Манго-маракуя",
    description: "Пюре манго-маракуя, спрайт або мінеральна вода",
    volume: "400 мл",
    variants: [
      { section: "non-alco", price: 120, label: "Без алкоголю" },
      { section: "alco", price: 220, label: "З алкоголем", extra: "+ Oakheart або Finlandia" },
    ],
  },
  {
    id: "citrus-wave",
    name: "Цитрусова хвиля",
    description:
      "Сироп мандарин, апельсин, лимон, мʼята, апельсиновий сік, газована вода або спрайт",
    volume: "400 мл",
    variants: [
      { section: "non-alco", price: 100, label: "Без алкоголю" },
      { section: "alco", price: 200, label: "З алкоголем", extra: "+ Finlandia або Oakheart" },
    ],
  },
  {
    id: "peach-lemonade",
    name: "Персиковий лимонад",
    description: "Пюре персик, спрайт або мінеральна вода",
    volume: "400 мл",
    // ⚠️ ASSUMPTION: doc didn't name the spirit for the alco version.
    // Used house default (Finlandia / Oakheart). Confirm with client.
    variants: [
      { section: "non-alco", price: 120, label: "Без алкоголю" },
      { section: "alco", price: 220, label: "З алкоголем", extra: SPIRIT_DEFAULT },
    ],
  },

  /* ─────────────  БЕЗАЛКОГОЛЬНІ (тільки без алко)  ───────────── */
  {
    id: "milkshake",
    name: "Мілкшейк",
    description:
      "Ванільна суміш, молоко, сироп на вибір (кокос, мандарин, полуниця, Блю Кюрасао, ваніль)",
    volume: "400 мл",
    variants: [{ section: "non-alco", price: 150 }],
  },
  {
    id: "ice-latte",
    name: "Айс лате",
    description: "Молоко, кава, сироп за бажанням",
    variants: [{ section: "non-alco", price: 100 }],
  },
  {
    id: "capuorange",
    name: "Капуорандж",
    description: "Кава, апельсиновий сік",
    variants: [{ section: "non-alco", price: 100 }],
  },

  /* ─────────────  АЛКОГОЛЬНІ (тільки алко)  ───────────── */
  {
    id: "aperol-spritz",
    name: "Апероль шприц",
    description: "Ігристе, Апероль, спрайт, лід, апельсин",
    tags: ["Новинка"],
    variants: [{ section: "alco", price: 250 }],
  },
  {
    id: "bellini",
    name: "Белліні",
    description: "Ігристе, пюре персика, спрайт або сода, лимонний сік, лимон, лід",
    tags: ["Новинка"],
    variants: [{ section: "alco", price: 250 }],
  },
  {
    id: "zirochka-palay",
    name: "Зірочка палай",
    description: "Горілка Finlandia, Passoã, пюре маракуї, ванільний сироп, лимон, просекко",
    tags: ["Новинка"],
    variants: [{ section: "alco", price: 300 }],
  },
  {
    id: "beer-corona",
    name: "Пиво Corona",
    volume: "0.33 л",
    variants: [{ section: "alco", price: 100 }],
  },
  {
    id: "beer-stella",
    name: "Пиво Stella",
    volume: "0.5 л",
    variants: [{ section: "alco", price: 100 }],
  },

  /* ─────────────  СНЕКИ  ───────────── */
  {
    id: "chips",
    name: "Чипси",
    description: "Сир, сметана та зелень (можливі інші смаки)",
    volume: "120 г",
    variants: [{ section: "snacks", price: 120 }],
  },
  {
    id: "popcorn-cheese",
    name: "Попкорн «Супер сир»",
    volume: "100 г",
    variants: [{ section: "snacks", price: 100 }],
  },
  {
    id: "apple-chips",
    name: "Яблучні чипси",
    volume: "80 г",
    note: "Згодом зʼявиться смак «кокос»",
    variants: [{ section: "snacks", price: 120 }],
  },
  {
    id: "flint-crackers",
    name: "Сухарики «Флінт»",
    description: "Сметана та зелень",
    volume: "125 г",
    variants: [{ section: "snacks", price: 50 }],
  },
  {
    id: "baklava",
    name: "Пахлава",
    volume: "6 шт (коробка)",
    variants: [{ section: "snacks", price: 150 }],
  },
  {
    id: "ice-cream-khreschatyk",
    name: "Морозиво «Хрещатик»",
    description: "Фісташка, шоколад, пломбір, крем-брюле",
    volume: "70 г",
    variants: [{ section: "snacks", price: 50 }],
  },
  {
    id: "chupa-chups",
    name: "Chupa Chups",
    volume: "1 шт",
    variants: [{ section: "snacks", price: 10 }],
  },
];

/** Helper: all items that belong to a given section, with that section's variant resolved. */
export function itemsForSection(section: SectionId) {
  return MENU.filter((item) => item.variants.some((v) => v.section === section)).map((item) => ({
    ...item,
    variant: item.variants.find((v) => v.section === section)!,
  }));
}
