'use client'

import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface ItemData {
  id: string
  name: string
  sections: string[]
}

const SECTION_LABEL: Record<string, string> = {
  'non-alco': 'Безалк.',
  alco: 'Алко',
  snacks: 'Снеки',
}

const SECTION_COLOR: Record<string, string> = {
  'non-alco': '#2563eb',
  alco: '#9333ea',
  snacks: '#d97706',
}

function SortableRow({ item }: { item: ItemData }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        background: isDragging ? 'var(--theme-elevation-100)' : 'var(--theme-elevation-0)',
        border: '1px solid var(--theme-border-color)',
        borderRadius: '4px',
        marginBottom: '6px',
        cursor: 'default',
        listStyle: 'none',
        boxShadow: isDragging ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
      }}
    >
      {/* drag handle */}
      <button
        {...attributes}
        {...listeners}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'grab',
          padding: '4px',
          color: 'var(--theme-elevation-500)',
          fontSize: '18px',
          lineHeight: 1,
          flexShrink: 0,
          touchAction: 'none',
        }}
        title="Перетягнути"
        aria-label="Перетягнути для зміни порядку"
      >
        ⠿
      </button>

      {/* name */}
      <span style={{ flex: 1, fontWeight: 500, color: 'var(--theme-text)' }}>{item.name}</span>

      {/* section badges */}
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        {item.sections.map((s) => (
          <span
            key={s}
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '999px',
              background: SECTION_COLOR[s] + '22',
              color: SECTION_COLOR[s],
              border: `1px solid ${SECTION_COLOR[s]}44`,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            {SECTION_LABEL[s] ?? s}
          </span>
        ))}
      </div>
    </li>
  )
}

export function MenuOrderClient({ initialItems }: { initialItems: ItemData[] }) {
  const [items, setItems] = useState(initialItems)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [dirty, setDirty] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setItems((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id)
      const newIndex = prev.findIndex((i) => i.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
    setDirty(true)
    setStatus('idle')
  }

  async function handleSave() {
    setSaving(true)
    setStatus('idle')
    try {
      const results = await Promise.allSettled(
        items.map((item, index) =>
          fetch(`/api/menu-items/${item.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: index + 1 }),
          }),
        ),
      )
      const failed = results.filter((r) => r.status === 'rejected').length
      setStatus(failed === 0 ? 'saved' : 'error')
      if (failed === 0) setDirty(false)
    } catch {
      setStatus('error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ maxWidth: '640px' }}>
      {/* toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          gap: '12px',
        }}
      >
        <p style={{ color: 'var(--theme-elevation-500)', fontSize: '14px', margin: 0 }}>
          Перетягніть рядки, щоб змінити порядок відображення в меню.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {status === 'saved' && (
            <span style={{ color: '#16a34a', fontSize: '14px', fontWeight: 500 }}>✓ Збережено</span>
          )}
          {status === 'error' && (
            <span style={{ color: '#dc2626', fontSize: '14px' }}>Помилка збереження</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !dirty}
            style={{
              padding: '8px 20px',
              background: dirty ? 'var(--theme-success-500, #16a34a)' : 'var(--theme-elevation-200)',
              color: dirty ? '#fff' : 'var(--theme-elevation-500)',
              border: 'none',
              borderRadius: '4px',
              cursor: dirty ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'background 0.15s',
            }}
          >
            {saving ? 'Зберігаємо…' : 'Зберегти порядок'}
          </button>
        </div>
      </div>

      {/* sortable list */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <ul style={{ padding: 0, margin: 0 }}>
            {items.map((item) => (
              <SortableRow key={item.id} item={item} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  )
}
