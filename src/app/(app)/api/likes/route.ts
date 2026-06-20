import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const itemId = body?.itemId

  if (!itemId || typeof itemId !== 'string') {
    return NextResponse.json({ error: 'itemId required' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  const item = await payload.findByID({
    collection: 'menu-items',
    id: itemId,
    overrideAccess: true,
  }).catch(() => null)

  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await payload.update({
    collection: 'menu-items',
    id: itemId,
    data: { likes: (item.likes ?? 0) + 1 },
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const itemId = body?.itemId

  if (!itemId || typeof itemId !== 'string') {
    return NextResponse.json({ error: 'itemId required' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  const item = await payload.findByID({
    collection: 'menu-items',
    id: itemId,
    overrideAccess: true,
  }).catch(() => null)

  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await payload.update({
    collection: 'menu-items',
    id: itemId,
    data: { likes: Math.max(0, (item.likes ?? 0) - 1) },
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true })
}
