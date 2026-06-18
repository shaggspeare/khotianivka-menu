import type { CollectionConfig } from 'payload'

export const PaymentMethods: CollectionConfig = {
  slug: 'payment-methods',
  admin: {
    useAsTitle: 'bankName',
    defaultColumns: ['bankName', 'accountHolder', 'isActive', 'order'],
    description: 'Способи оплати, що відображаються на сторінці меню.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'bankName',
      type: 'text',
      required: true,
      label: 'Назва банку',
      admin: { description: 'Напр.: Monobank, PrivatBank, ПУМБ, А-Банк' },
    },
    {
      name: 'accountHolder',
      type: 'text',
      label: 'Імʼя власника',
      admin: { description: 'Відображається під назвою банку' },
    },
    {
      name: 'cardNumber',
      type: 'text',
      label: 'Номер картки',
      admin: { description: 'Тільки цифри, без пробілів. Напр.: 4874100039245660' },
    },
    {
      name: 'paymentLink',
      type: 'text',
      label: 'Посилання для переказу',
      admin: { description: 'URL-адреса для переказу (jar, Privat24, тощо)' },
    },
    {
      name: 'linkLabel',
      type: 'text',
      label: 'Текст посилання',
      admin: { description: 'Напр.: Переказати на Моно →. Якщо порожньо — підставляється автоматично.' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок відображення',
      admin: { description: 'Менше число — вище в списку' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Активний',
      defaultValue: true,
      admin: { description: 'Зніміть галочку, щоб приховати спосіб оплати' },
    },
  ],
}
