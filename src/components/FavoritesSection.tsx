'use client'

import { useEffect, useState } from 'react'
import { MenuItemRow } from './MenuItemRow'
import type { MenuItem } from '@/data/menu'

const STORAGE_KEY = 'menu-likes'

function getStoredLikes(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return new Set(stored ? JSON.parse(stored) : [])
  } catch {
    return new Set()
  }
}

interface FavoritesSectionProps {
  menuItems: MenuItem[]
}

export function FavoritesSection({ menuItems }: FavoritesSectionProps) {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const load = () => setLikedIds(getStoredLikes())
    load()
    window.addEventListener('menu-likes-changed', load)
    return () => window.removeEventListener('menu-likes-changed', load)
  }, [])

  // Avoid hydration mismatch — render nothing until client has loaded localStorage
  if (!mounted) {
    return (
      <section id="favorites" className="scroll-mt-20 px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-xl" />
      </section>
    )
  }

  const likedItems = menuItems.filter((item) => likedIds.has(item.id))

  return (
    <section
      id="favorites"
      aria-labelledby="favorites-heading"
      className="scroll-mt-20 px-5 py-10 sm:px-8"
    >
      <div className="mx-auto max-w-xl">
        <h2
          id="favorites-heading"
          className="text-xl font-medium uppercase tracking-wide text-ink"
        >
          Обране
        </h2>
        <p className="mt-1 text-sm text-muted">Позиції, які вам сподобались</p>

        {likedItems.length === 0 ? (
          <p className="mt-6 text-sm text-muted">
            Натисніть ♡ біля будь-якої позиції, щоб зберегти її тут.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-line border-t border-line">
            {likedItems.flatMap((item) =>
              item.variants.map((variant) => (
                <MenuItemRow
                  key={`${item.id}-${variant.section}`}
                  item={{ ...item, variant }}
                />
              ))
            )}
          </ul>
        )}
      </div>
    </section>
  )
}
