import { DemoUpload } from '@/components/DemoUpload'

export default function DemoPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Top bar */}
      <nav style={{
        borderBottom: '1px solid var(--rule)',
        padding: '0 32px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface)', position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'inline-block', width: 10, height: 10,
            background: 'var(--navy)', transform: 'rotate(45deg)',
          }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>
            TextPipeline.de
          </span>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--navy)',
            background: 'var(--navy-soft)', border: '1px solid var(--rule)',
            padding: '2px 7px', borderRadius: 2, marginLeft: 4,
          }}>
            Demo
          </span>
        </div>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--gruen)',
          background: 'var(--gruen-bg)', border: '1px solid rgba(12,107,58,0.2)',
          padding: '4px 10px', borderRadius: 2,
        }}>
          Vollversion folgt bald
        </span>
      </nav>

      {/* Demo banner */}
      <div style={{
        background: 'var(--navy)', color: '#fff',
        padding: '10px 32px', fontSize: 12,
        fontFamily: 'var(--mono)', letterSpacing: '0.04em',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <span>▶ DEMO-VERSION — Kostenlos testen, kein Konto erforderlich</span>
        <span style={{ opacity: 0.6 }}>·</span>
        <span style={{ opacity: 0.8 }}>Vollständige Analyse — Vollversion folgt bald</span>
      </div>

      {/* Main content */}
      <main style={{ maxWidth: 780, margin: '0 auto', padding: '60px 32px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12, justifyContent: 'center', display: 'flex' }}>
            KI-Vertragsanalyse · Demo
          </div>
          <h1 style={{
            fontSize: 36, fontWeight: 700, color: 'var(--ink)',
            margin: '0 0 16px', lineHeight: 1.15,
          }}>
            Verstehen Sie jeden Vertrag<br />
            <span style={{ color: 'var(--navy)' }}>in Sekunden</span>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-3)', maxWidth: 520, margin: '0 auto 24px', lineHeight: 1.6 }}>
            Laden Sie einen Vertrag hoch — unsere KI analysiert Klauseln, bewertet Risiken
            und erklärt alles auf verständlichem Deutsch. Hier in der Demo: die ersten 2 Klauseln vollständig.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Kein Konto erforderlich', 'EU-Infrastruktur', 'Keine Kreditkarte'].map(t => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>

        <DemoUpload />

        {/* What's in the full version */}
        <div style={{
          marginTop: 60, padding: 32,
          background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 2,
        }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Vollversion — das erhalten Sie</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Alle Klauseln vollständig', 'Keine künstliche Kürzung'],
              ['Download als PDF/TXT/JSON', 'Für Ihre Unterlagen'],
              ['Unbegrenzte Analysen', '50 Verträge pro Monat (Premium)'],
              ['Vollständige Empfehlung', 'Inkl. konkreter Handlungsschritte'],
              ['AVV nach DSGVO Art. 28', 'Für Ihr Unternehmen'],
              ['Analyseverlauf', 'Alle Verträge auf einen Blick'],
            ].map(([title, sub]) => (
              <div key={title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--gruen)', fontSize: 14, marginTop: 1 }}>✓</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{title}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 1 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: 'var(--gruen)',
              background: 'var(--gruen-bg)', border: '1px solid rgba(12,107,58,0.2)',
              padding: '6px 16px', borderRadius: 2,
            }}>
              Vollversion folgt bald
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--ink-4)' }}>
              Freemium · Einzeldokument ab €4 · Premium ab €49/Monat
            </div>
          </div>
        </div>

        {/* Legal disclaimer — prominent */}
        <div style={{
          marginTop: 40,
          padding: '20px 24px',
          background: 'var(--gelb-bg)',
          border: '1px solid rgba(139,94,10,0.25)',
          borderLeft: '4px solid var(--gelb)',
          borderRadius: 2,
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--gelb)', marginBottom: 6, fontWeight: 600,
          }}>
            ⚠ Kein Rechtsrat — Wichtiger Hinweis
          </div>
          <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7, margin: '0 0 8px' }}>
            <strong>Die Ergebnisse dieser Demo stellen keine Rechtsberatung dar.</strong> Die KI-Analyse
            dient ausschließlich der verständlichen Aufbereitung von Vertragsinhalten und ersetzt
            unter keinen Umständen die Prüfung durch einen zugelassenen Rechtsanwalt.
          </p>
          <p style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>
            Bei rechtlich bedeutsamen Verträgen — insbesondere bei Arbeits-, Miet-, Kredit- oder
            Gesellschaftsverträgen — empfehlen wir stets die Hinzuziehung rechtlicher Fachberatung.
            TextPipeline.de übernimmt keine Haftung für Entscheidungen, die auf Basis dieser Analyse
            getroffen werden.
          </p>
        </div>

        <p style={{ marginTop: 16, textAlign: 'center', fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>
          <a href="/impressum" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>Impressum</a>
          {' '}·{' '}
          <a href="/datenschutz" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>Datenschutz</a>
          {' '}·{' '}
          <a href="/agb" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>AGB</a>
        </p>
      </main>
    </div>
  )
}
