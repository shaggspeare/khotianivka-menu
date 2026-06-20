import { LikeButton } from "./LikeButton";
import { PriceTag } from "./PriceTag";
import { Tag } from "./Tag";
import type { ItemVariant, MenuItem } from "@/data/menu";

interface MenuItemRowProps {
  item: MenuItem & { variant: ItemVariant };
}

export function MenuItemRow({ item }: MenuItemRowProps) {
  const { name, description, volume, note, tags, variant, id, likes } = item;
  const meta = [volume, note].filter(Boolean).join(" · ");
  const descriptionLine = [description, variant.extra].filter(Boolean).join(" ");

  return (
    <li className="py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-medium text-ink">{name}</span>
          {tags && tags.length > 0 && (
            <div className="mt-0.5 flex gap-2">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1 pl-4 text-right">
          <span className="whitespace-nowrap">
            {variant.label && <span className="mr-1 text-muted">{variant.label} ·</span>}
            <PriceTag price={variant.price} />
          </span>
          <LikeButton itemId={id} initialLikes={likes ?? 0} />
        </div>
      </div>

      {descriptionLine && <p className="mt-1 text-sm text-muted">{descriptionLine}</p>}
      {meta && <p className="mt-0.5 text-xs text-muted/80">{meta}</p>}
    </li>
  );
}
