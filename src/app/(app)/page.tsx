import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MenuHero } from "@/components/MenuHero";
import { MenuSection } from "@/components/MenuSection";
import { PaymentSection } from "@/components/PaymentSection";
import { SectionNav } from "@/components/SectionNav";
import { SECTIONS, type MenuItem, type SectionId } from "@/data/menu";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const payload = await getPayload({ config: configPromise })

  const [menuResult, paymentResult] = await Promise.all([
    payload.find({ collection: 'menu-items', sort: 'order', limit: 200, depth: 0 }),
    payload.find({
      collection: 'payment-methods',
      where: { isActive: { equals: true } },
      sort: 'order',
      limit: 50,
      depth: 0,
    }),
  ])

  // Map Payload docs to the MenuItem shape the components already expect
  const menuItems: MenuItem[] = menuResult.docs.map((doc) => ({
    id: doc.id,
    name: doc.name,
    description: doc.description ?? undefined,
    volume: doc.volume ?? undefined,
    tags: doc.tags?.map((t: { tag: string }) => t.tag) ?? undefined,
    note: doc.note ?? undefined,
    variants: (doc.variants ?? []).map((v: {
      section: string
      price?: number | null
      label?: string | null
      extra?: string | null
    }) => ({
      section: v.section as SectionId,
      price: v.price ?? null,
      label: v.label ?? undefined,
      extra: v.extra ?? undefined,
    })),
  }))

  return (
    <>
      <MenuHero />
      <SectionNav />
      <main>
        {SECTIONS.map((section) => (
          <MenuSection key={section.id} section={section} items={menuItems} />
        ))}
        <PaymentSection methods={paymentResult.docs} />
      </main>
    </>
  );
}
