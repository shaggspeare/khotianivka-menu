import { MenuItemRow } from "./MenuItemRow";
import { MENU_NOTE, type MenuItem, type Section } from "@/data/menu";

interface MenuSectionProps {
  section: Section;
  items: MenuItem[];
}

export function MenuSection({ section, items }: MenuSectionProps) {
  const sectionItems = items
    .filter((item) => item.variants.some((v) => v.section === section.id))
    .map((item) => ({
      ...item,
      variant: item.variants.find((v) => v.section === section.id)!,
    }));

  const showNote = section.id !== "snacks";

  return (
    <section id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-20 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-xl">
        <h2 id={`${section.id}-heading`} className="text-xl font-medium uppercase tracking-wide text-ink">
          {section.title}
        </h2>
        {section.subtitle && <p className="mt-1 text-sm text-muted">{section.subtitle}</p>}

        <ul className="mt-6 divide-y divide-line border-t border-line">
          {sectionItems.map((item) => (
            <MenuItemRow key={item.id} item={item} />
          ))}
        </ul>

        {showNote && <p className="mt-6 text-xs text-muted">{MENU_NOTE}</p>}
      </div>
    </section>
  );
}
