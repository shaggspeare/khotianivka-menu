import { CopyButton } from "./CopyButton";

interface PaymentMethod {
  id: string;
  bankName: string;
  accountHolder?: string | null;
  cardNumber?: string | null;
  paymentLink?: string | null;
  linkLabel?: string | null;
}

interface PaymentSectionProps {
  methods: PaymentMethod[];
}

export function PaymentSection({ methods }: PaymentSectionProps) {
  return (
    <section id="payment" aria-labelledby="payment-heading" className="scroll-mt-20 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-xl">
        <h2 id="payment-heading" className="text-xl font-medium uppercase tracking-wide text-ink">
          Оплата
        </h2>
        <p className="mt-1 text-sm text-muted">Переказ на картку або через застосунок</p>

        <div className="mt-6 divide-y divide-line border-t border-line">
          {methods.map((method) => {
            const cardDisplay = method.cardNumber
              ? method.cardNumber.replace(/(.{4})/g, '$1 ').trim()
              : null;
            const defaultLinkLabel = `Переказати через ${method.bankName} →`;

            return (
              <div key={method.id} className="py-5">
                <p className="font-medium text-ink">{method.bankName}</p>

                {method.accountHolder && (
                  <p className="mt-1 text-sm text-muted">{method.accountHolder}</p>
                )}

                {cardDisplay && method.cardNumber && (
                  <p className="mt-2 flex items-center">
                    <span className="font-mono text-base tracking-widest text-ink">{cardDisplay}</span>
                    <CopyButton text={method.cardNumber} />
                  </p>
                )}

                {method.paymentLink && (
                  <a
                    href={method.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-accent underline underline-offset-2"
                  >
                    {method.linkLabel || defaultLinkLabel}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
