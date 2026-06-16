import { PriceTag } from "./PriceTag";
import { Tag } from "./Tag";
import type { ItemVariant, MenuItem } from "@/data/menu";

interface MenuItemRowProps {
  item: MenuItem & { variant: ItemVariant };
}

export function MenuItemRow({ item }: MenuItemRowProps) {
  const { name, description, volume, note, tags, variant } = item;
  const meta = [volume, note].filter(Boolean).join(" · ");
  const descriptionLine = [description, variant.extra].filter(Boolean).join(" ");

  return (
    <li className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-medium text-ink">
          {name}
          {tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </span>
        <span className="shrink-0 whitespace-nowrap pl-4 text-right">
          {variant.label && <span className="mr-1 text-muted">{variant.label} ·</span>}
          <PriceTag price={variant.price} />
        </span>
      </div>

      {descriptionLine && <p className="mt-1 text-sm text-muted">{descriptionLine}</p>}
      {meta && <p className="mt-0.5 text-xs text-muted/80">{meta}</p>}
    </li>
  );
}
