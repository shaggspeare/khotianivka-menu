import { formatPrice } from "@/lib/format";

interface PriceTagProps {
  price: number | null;
}

export function PriceTag({ price }: PriceTagProps) {
  return (
    <span className={price === null ? "text-muted" : "font-medium text-ink"}>
      {formatPrice(price)}
    </span>
  );
}
