import Link from 'next/link'

export function MenuOrderLink() {
  return (
    <div
      style={{
        padding: '12px 0 0',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Link
        href="/admin/menu-order"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '7px 16px',
          background: 'var(--theme-elevation-100)',
          border: '1px solid var(--theme-border-color)',
          borderRadius: '4px',
          color: 'var(--theme-text)',
          fontSize: '13px',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        ↕ Змінити порядок
      </Link>
    </div>
  )
}
