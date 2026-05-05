'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'tp_demo_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Datenschutzhinweis"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
        background: 'var(--navy)', color: '#fff',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24, flexWrap: 'wrap',
        fontSize: 13, lineHeight: 1.55,
      }}
    >
      <p style={{ margin: 0, maxWidth: 700, color: 'rgba(255,255,255,0.85)' }}>
        <strong style={{ color: '#fff', fontWeight: 600 }}>Datenschutzhinweis: </strong>
        Diese Demo setzt <strong style={{ color: '#fff' }}>keine Cookies</strong>. Zur Sitzungsverwaltung
        (Demo-Limit, Zustimmungsnachweis) nutzen wir ausschließlich den Browser-eigenen{' '}
        <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: 2 }}>
          localStorage
        </code>{' '}
        — ohne Bezug zu Ihrer Person.{' '}
        <Link href="/datenschutz" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Datenschutzerklärung
        </Link>
      </p>
      <button
        onClick={accept}
        style={{
          background: '#fff', color: 'var(--navy)',
          border: 'none', padding: '8px 20px',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          borderRadius: 2, flexShrink: 0, fontFamily: 'var(--sans)',
        }}
      >
        Verstanden
      </button>
    </div>
  )
}
