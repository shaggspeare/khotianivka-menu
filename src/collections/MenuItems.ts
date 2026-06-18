import type { CollectionConfig } from 'payload'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'variants', 'order'],
    description: 'Всі позиції меню. Кожна позиція може мати кілька варіантів (з/без алкоголю, різні секції).',
    components: {
      beforeList: ['/components/admin/MenuOrderLink#MenuOrderLink'],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Назва',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Склад / опис',
    },
    {
      name: 'volume',
      type: 'text',
      label: 'Обʼєм / вага',
      admin: { description: 'Напр.: 400 мл, 120 г, 6 шт' },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Теги',
      admin: { description: 'Напр.: Новинка, Хіт' },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          label: 'Тег',
        },
      ],
    },
    {
      name: 'note',
      type: 'text',
      label: 'Примітка',
      admin: { description: 'Маленький текст під позицією' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
    },
    {
      name: 'variants',
      type: 'array',
      label: 'Варіанти',
      required: true,
      minRows: 1,
      admin: {
        description: 'Одна позиція може входити до кількох секцій (напр. мохіто — і в безалкогольні, і в алкогольні)',
      },
      fields: [
        {
          name: 'section',
          type: 'select',
          required: true,
          label: 'Секція',
          options: [
            { label: 'Безалкогольні', value: 'non-alco' },
            { label: 'Алкогольні', value: 'alco' },
            { label: 'Снеки', value: 'snacks' },
          ],
        },
        {
          name: 'price',
          type: 'number',
          label: 'Ціна (грн)',
          admin: { description: 'Залиште порожнім — відображатиметься «уточнюється»' },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Мітка',
          admin: { description: 'Напр.: Без алкоголю / З алкоголем' },
        },
        {
          name: 'extra',
          type: 'text',
          label: 'Додатковий текст',
          admin: { description: 'Напр.: + Oakheart або Finlandia' },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок відображення',
      admin: { description: 'Менше число — вище в списку' },
    },
  ],
}
