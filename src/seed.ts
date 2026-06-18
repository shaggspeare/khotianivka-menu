import { getPayload } from 'payload'
import config from './payload.config'
import { MENU } from './data/menu'

const PAYMENT_METHODS = [
  {
    bankName: 'Monobank',
    cardNumber: '4874100039245660',
    paymentLink: 'https://send.monobank.ua/jar/2tGMz5UQ5q',
    linkLabel: 'Переказати на Моно →',
    order: 1,
    isActive: true,
  },
  {
    bankName: 'PrivatBank',
    paymentLink: 'https://www.privat24.ua/send/40g98',
    linkLabel: 'Переказ через Privat24 →',
    order: 2,
    isActive: true,
  },
  {
    bankName: 'ПУМБ',
    accountHolder: 'Павло П.',
    paymentLink: 'https://mobile-app.pumb.ua/1BEH6',
    linkLabel: 'Переказати через ПУМБ →',
    order: 3,
    isActive: true,
  },
  {
    bankName: 'А-Банк',
    accountHolder: 'Павло Прудкий',
    paymentLink: 'https://pay.a-bank.com.ua/card/hF3g5OcEFes64L2H',
    linkLabel: 'Переказати через А-Банк →',
    order: 4,
    isActive: true,
  },
]

const payload = await getPayload({ config })

// ── Menu items ────────────────────────────────────────────────
console.log('Seeding menu items…')

const existing = await payload.find({ collection: 'menu-items', limit: 1 })
if (existing.totalDocs > 0) {
  console.log(`  Skipping — ${existing.totalDocs} item(s) already exist.`)
} else {
  for (let i = 0; i < MENU.length; i++) {
    const item = MENU[i]
    await payload.create({
      collection: 'menu-items',
      data: {
        name: item.name,
        description: item.description ?? undefined,
        volume: item.volume ?? undefined,
        tags: item.tags?.map((tag) => ({ tag })) ?? [],
        note: item.note ?? undefined,
        variants: item.variants.map((v) => ({
          section: v.section,
          price: v.price ?? undefined,
          label: v.label ?? undefined,
          extra: v.extra ?? undefined,
        })),
        order: i + 1,
      },
    })
    console.log(`  ✓ ${item.name}`)
  }
  console.log(`  Done — ${MENU.length} items created.`)
}

// ── Payment methods ───────────────────────────────────────────
console.log('Seeding payment methods…')

const existingPayments = await payload.find({ collection: 'payment-methods', limit: 1 })
if (existingPayments.totalDocs > 0) {
  console.log(`  Skipping — ${existingPayments.totalDocs} method(s) already exist.`)
} else {
  for (const method of PAYMENT_METHODS) {
    await payload.create({ collection: 'payment-methods', data: method })
    console.log(`  ✓ ${method.bankName}`)
  }
  console.log(`  Done — ${PAYMENT_METHODS.length} methods created.`)
}

console.log('Seed complete.')
process.exit(0)
