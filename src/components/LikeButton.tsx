'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'menu-likes'

function getStoredLikes(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return new Set(stored ? JSON.parse(stored) : [])
  } catch {
    return new Set()
  }
}

function saveStoredLikes(likes: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...likes]))
  window.dispatchEvent(new CustomEvent('menu-likes-changed'))
}

interface LikeButtonProps {
  itemId: string
  initialLikes: number
}

export function LikeButton({ itemId, initialLikes }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [count, setCount] = useState(initialLikes)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    setIsLiked(getStoredLikes().has(itemId))
  }, [itemId])

  const handleClick = async () => {
    if (pending) return
    setPending(true)

    const stored = getStoredLikes()
    const willLike = !stored.has(itemId)

    if (willLike) {
      stored.add(itemId)
    } else {
      stored.delete(itemId)
    }

    saveStoredLikes(stored)
    setIsLiked(willLike)
    setCount((c) => (willLike ? c + 1 : Math.max(0, c - 1)))

    try {
      await fetch('/api/likes', {
        method: willLike ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      })
    } catch {
      // Rollback on network error
      if (willLike) {
        stored.delete(itemId)
      } else {
        stored.add(itemId)
      }
      saveStoredLikes(stored)
      setIsLiked(!willLike)
      setCount((c) => (willLike ? Math.max(0, c - 1) : c + 1))
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label={isLiked ? 'Прибрати з обраного' : 'Додати до обраного'}
      className={`flex items-center gap-1 text-xs transition-colors disabled:opacity-50 ${
        isLiked
          ? 'text-rose-500'
          : 'text-muted hover:text-rose-400'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        />
      </svg>
      {count > 0 && <span>{count}</span>}
    </button>
  )
}
