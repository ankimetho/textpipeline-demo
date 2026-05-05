import Link from 'next/link'
import type { ReactNode } from 'react'

export function DemoNav() {
  return (
    <nav style={{
      borderBottom: '1px solid var(--rule)', padding: '0 32px', height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'var(--surface)', position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 10, height: 10, background: 'var(--navy)', transform: 'rotate(45deg)', flexShrink: 0 }} />
        <Link href="/" style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}>
          TextPipeline.de
        </Link>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--navy)', background: 'var(--navy-soft)',
          border: '1px solid var(--rule)', padding: '2px 7px', borderRadius: 2,
        }}>Demo</span>
      </div>
      <Link href="/" style={{ fontSize: 12, color: 'var(--ink-3)', textDecoration: 'none', fontFamily: 'var(--mono)' }}>
        ← Zurück zur Demo
      </Link>
    </nav>
  )
}

export function DemoFooter() {
  return (
    <footer style={{
      borderTop: '1px solid var(--rule)', padding: '24px 32px',
      background: 'var(--surface)', marginTop: 80,
    }}>
      <div style={{
        maxWidth: 720, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, background: 'var(--navy)', transform: 'rotate(45deg)' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)' }}>
            TextPipeline.de — Demo
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 11, fontFamily: 'var(--mono)' }}>
          <Link href="/impressum" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>Impressum</Link>
          <Link href="/datenschutz" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>Datenschutz</Link>
          <Link href="/agb" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>AGB</Link>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.04em' }}>
          EU-INFRASTRUKTUR · KEIN US-SERVER
        </span>
      </div>
    </footer>
  )
}

function LegalSection({ id, num, title, children }: { id?: string; num: string; title: string; children: ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: 48, paddingTop: 8 }}>
      <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 20, marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 6 }}>
          {num}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: 'var(--ink)' }}>{title}</h2>
      </div>
      <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

export { LegalSection }
