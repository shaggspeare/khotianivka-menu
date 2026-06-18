import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { MenuOrderClient } from './MenuOrderClient'

export default async function MenuOrderView() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'menu-items',
    sort: 'order',
    limit: 200,
    depth: 0,
  })

  const items = docs.map((doc) => ({
    id: doc.id as string,
    name: doc.name,
    sections: ((doc.variants ?? []) as Array<{ section: string }>).map((v) => v.section),
  }))

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 700, color: 'var(--theme-text)' }}>
          Порядок позицій меню
        </h1>
        <p style={{ margin: 0, color: 'var(--theme-elevation-500)', fontSize: '14px' }}>
          {items.length} позицій
        </p>
      </div>

      <MenuOrderClient initialItems={items} />
    </div>
  )
}
