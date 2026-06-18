import { CopyButton } from "./CopyButton";

const CARD = "4874100039245660";
const CARD_DISPLAY = "4874 1000 3924 5660";

export function PaymentSection() {
  return (
    <section id="payment" aria-labelledby="payment-heading" className="scroll-mt-20 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-xl">
        <h2 id="payment-heading" className="text-xl font-medium uppercase tracking-wide text-ink">
          Оплата
        </h2>
        <p className="mt-1 text-sm text-muted">Переказ на картку або через застосунок</p>

        <div className="mt-6 divide-y divide-line border-t border-line">
          {/* Monobank */}
          <div className="py-5">
            <p className="font-medium text-ink">Monobank</p>
            <p className="mt-2 flex items-center">
              <span className="font-mono text-base tracking-widest text-ink">{CARD_DISPLAY}</span>
              <CopyButton text={CARD} />
            </p>
            <a
              href="https://send.monobank.ua/jar/2tGMz5UQ5q"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-accent underline underline-offset-2"
            >
              Переказати на Моно →
            </a>
          </div>

          {/* PrivatBank */}
          <div className="py-5">
            <p className="font-medium text-ink">PrivatBank</p>
            <a
              href="https://www.privat24.ua/send/40g98"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-accent underline underline-offset-2"
            >
              Переказ через Privat24 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
