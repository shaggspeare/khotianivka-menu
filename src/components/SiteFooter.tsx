import { MENU_NOTE } from "@/data/menu";

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-xl text-sm text-muted">
        <p className="text-base font-medium text-ink">Beach Santa</p>
        <p className="mt-1">Хотянівка, пляж</p>

        <dl className="mt-6 space-y-1">
          <div className="flex gap-2">
            <dt>Графік роботи:</dt>
            <dd>уточнюється</dd>
          </div>
          <div className="flex gap-2">
            <dt>Інстаграм:</dt>
            <dd>уточнюється</dd>
          </div>
          <div className="flex gap-2">
            <dt>Телефон:</dt>
            <dd>уточнюється</dd>
          </div>
        </dl>

        <p className="mt-6 border-t border-line pt-6 text-xs">{MENU_NOTE}</p>
      </div>
    </footer>
  );
}
