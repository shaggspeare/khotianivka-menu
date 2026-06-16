/** Formats a UAH price for display; null means the price isn't finalised yet. */
export function formatPrice(price: number | null): string {
  if (price === null) return "уточнюється";
  return `${price} ₴`;
}
