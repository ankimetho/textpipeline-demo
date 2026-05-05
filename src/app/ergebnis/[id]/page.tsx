import { notFound } from 'next/navigation'
import { createSupabaseAdminClient } from '@/lib/supabase'
import type { AnalyseErgebnis, Risiko } from '@/types'
import Link from 'next/link'

const DEMO_VISIBLE_CLAUSES = 2
const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_APP_URL ?? 'https://textpipeline.de'

function RisikoAmpel({ risiko }: { risiko: Risiko }) {
  const map = {
    gruen: { label: 'Kein Risiko', color: 'var(--gruen)', bg: 'var(--gruen-bg)' },
    gelb:  { label: 'Hinweise',   color: 'var(--gelb)',  bg: 'var(--gelb-bg)' },
    rot:   { label: 'Kritisch',   color: 'var(--rot)',   bg: 'var(--rot-bg)' },
  }
  const r = map[risiko]
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px', background: r.bg,
      border: `1px solid ${r.color}30`, borderRadius: 2,
    }}>
      <span className={`risk-dot ${risiko}`} />
      <span className={`risk-label ${risiko}`}>{r.label}</span>
    </div>
  )
}

function KlauselCard({ klausel, locked }: { klausel: AnalyseErgebnis['wichtige_klauseln'][0]; locked: boolean }) {
  const risikoColor = { gruen: 'var(--gruen)', gelb: 'var(--gelb)', rot: 'var(--rot)' }[klausel.risiko]

  if (locked) {
    return (
      <div style={{ position: 'relative', borderRadius: 2, overflow: 'hidden', marginBottom: -1 }}>
        {/* Blurred content */}
        <div style={{
          filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none',
          padding: '16px 20px', background: 'var(--surface)',
          border: '1px solid var(--rule)',
          borderLeft: `3px solid ${risikoColor}`,
        }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{klausel.titel}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{klausel.inhalt}</div>
        </div>
        {/* Lock overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(237,243,250,0.55)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--navy)',
              background: 'var(--surface)', border: '1px solid var(--rule)',
              padding: '4px 10px', borderRadius: 2, marginBottom: 8,
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              🔒 In der Vollversion verfügbar
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      padding: '16px 20px', background: 'var(--surface)',
      border: '1px solid var(--rule)', borderRadius: 2, marginBottom: -1,
      borderLeft: `3px solid ${risikoColor}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{klausel.titel}</div>
        <RisikoAmpel risiko={klausel.risiko} />
      </div>
      <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 10 }}>{klausel.inhalt}</div>
      {klausel.quelltext && (
        <div style={{
          padding: '8px 12px', background: 'var(--paper-2)',
          borderLeft: '2px solid var(--rule)',
          fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.5,
        }}>
          „{klausel.quelltext}"
          {klausel.referenz && <span style={{ color: 'var(--ink-4)', marginLeft: 8 }}>— {klausel.referenz}</span>}
        </div>
      )}
      <div style={{ marginTop: 8, fontSize: 12, color: 'var(--ink-4)' }}>{klausel.risiko_begruendung}</div>
    </div>
  )
}

export default async function ErgebnisPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseAdminClient()
  const { data } = await supabase
    .from('demo_analyses')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!data) notFound()

  const result = data.result_json as AnalyseErgebnis | null
  const duration = data.processing_ms ? `${(data.processing_ms / 1000).toFixed(1)} s` : '—'

  const visibleClauses = result?.wichtige_klauseln.slice(0, DEMO_VISIBLE_CLAUSES) ?? []
  const lockedClauses = result?.wichtige_klauseln.slice(DEMO_VISIBLE_CLAUSES) ?? []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Nav */}
      <nav style={{
        borderBottom: '1px solid var(--rule)', padding: '0 32px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface)', position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 10, height: 10, background: 'var(--navy)', transform: 'rotate(45deg)' }} />
          <Link href="/" style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}>
            TextPipeline.de
          </Link>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--navy)', background: 'var(--navy-soft)',
            border: '1px solid var(--rule)', padding: '2px 7px', borderRadius: 2, marginLeft: 4,
          }}>Demo</span>
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
        background: 'var(--navy)', color: '#fff', padding: '10px 32px', fontSize: 12,
        fontFamily: 'var(--mono)', letterSpacing: '0.04em',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <span>▶ DEMO — {DEMO_VISIBLE_CLAUSES} von {result?.wichtige_klauseln.length ?? '?'} Klauseln sichtbar</span>
        <span style={{ opacity: 0.6 }}>·</span>
        <span style={{ opacity: 0.8 }}>Vollständige Analyse — Vollversion folgt bald</span>
      </div>

      <main style={{ maxWidth: 820, margin: '0 auto', padding: '40px 32px' }}>
        {/* Error state */}
        {data.status === 'fehler' && (
          <div style={{
            padding: 32, textAlign: 'center',
            background: 'var(--rot-bg)', border: '1px solid rgba(179,32,32,0.2)', borderRadius: 2,
          }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--rot)', marginBottom: 8 }}>
              Analyse fehlgeschlagen
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 20 }}>
              {data.error_message ?? 'Ein unerwarteter Fehler ist aufgetreten.'}
            </p>
            <Link href="/" className="btn btn-secondary">← Erneut versuchen</Link>
          </div>
        )}

        {/* Processing state */}
        {data.status === 'verarbeitung' && (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <div style={{
              width: 40, height: 40, border: '2px solid var(--rule)',
              borderTop: '2px solid var(--navy)', borderRadius: '50%',
              margin: '0 auto 20px', animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ fontSize: 14, color: 'var(--ink-3)' }}>Analyse läuft…</div>
          </div>
        )}

        {/* Result */}
        {data.status === 'abgeschlossen' && result && (
          <>
            {/* Disclaimer — oben, unübersehbar */}
            <div style={{
              marginBottom: 28,
              padding: '16px 20px',
              background: 'var(--gelb-bg)',
              border: '1px solid rgba(139,94,10,0.25)',
              borderLeft: '4px solid var(--gelb)',
              borderRadius: 2,
            }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--gelb)', marginBottom: 5, fontWeight: 600,
              }}>
                ⚠ Kein Rechtsrat — Wichtiger Hinweis
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.65, margin: 0 }}>
                <strong>Diese Analyse stellt keine Rechtsberatung dar.</strong> Die Ausgabe der KI
                dient ausschließlich der verständlichen Aufbereitung des Vertragsinhalts und ersetzt
                nicht die Prüfung durch einen zugelassenen Rechtsanwalt. Treffen Sie keine
                rechtsverbindlichen Entscheidungen allein auf Basis dieses Berichts.
              </p>
            </div>

            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                <span style={{ color: 'var(--ink-4)', marginRight: 10 }}>§ 01</span>
                Analyse-Ergebnis · Demo
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <h1 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>
                    {data.filename}
                  </h1>
                  <div style={{ fontSize: 12, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>
                    {result.vertragsart} · {duration} · {new Date(data.created_at).toLocaleDateString('de-DE')}
                  </div>
                </div>
                <RisikoAmpel risiko={result.gesamtrisiko} />
              </div>
            </div>

            {/* Zusammenfassung */}
            <section style={{
              padding: 24, background: 'var(--surface)',
              border: '1px solid var(--rule)', borderRadius: 2, marginBottom: 24,
            }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Zusammenfassung</div>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>
                {result.zusammenfassung}
              </p>
            </section>

            {/* Meta grid */}
            <section style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 12, marginBottom: 24,
            }}>
              {/* Parteien */}
              <div style={{
                padding: 20, background: 'var(--surface)',
                border: '1px solid var(--rule)', borderRadius: 2,
              }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>Vertragsparteien</div>
                <div style={{ fontSize: 13 }}>
                  <div style={{ marginBottom: 6 }}>
                    <span style={{ color: 'var(--ink-4)', fontSize: 11, fontFamily: 'var(--mono)' }}>PARTEI A</span><br />
                    <strong>{result.parteien.partei_a}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--ink-4)', fontSize: 11, fontFamily: 'var(--mono)' }}>PARTEI B</span><br />
                    <strong>{result.parteien.partei_b}</strong>
                  </div>
                </div>
              </div>
              {/* Laufzeit */}
              <div style={{
                padding: 20, background: 'var(--surface)',
                border: '1px solid var(--rule)', borderRadius: 2,
              }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>Laufzeit</div>
                <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {result.laufzeit.beginn && <div><span style={{ color: 'var(--ink-4)', fontSize: 11 }}>BEGINN </span>{result.laufzeit.beginn}</div>}
                  {result.laufzeit.ende && <div><span style={{ color: 'var(--ink-4)', fontSize: 11 }}>ENDE </span>{result.laufzeit.ende}</div>}
                  {result.laufzeit.kuendigung && <div><span style={{ color: 'var(--ink-4)', fontSize: 11 }}>KÜNDIGUNG </span>{result.laufzeit.kuendigung}</div>}
                  {!result.laufzeit.beginn && !result.laufzeit.ende && !result.laufzeit.kuendigung && (
                    <span style={{ color: 'var(--ink-4)' }}>Keine Angaben</span>
                  )}
                </div>
              </div>
            </section>

            {/* Klauseln */}
            <section style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div className="eyebrow">Wichtige Klauseln</div>
                <span style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>
                  {DEMO_VISIBLE_CLAUSES} VON {result.wichtige_klauseln.length} SICHTBAR
                </span>
              </div>

              <div style={{ borderRadius: 2, overflow: 'hidden', border: '1px solid var(--rule)' }}>
                {visibleClauses.map((k, i) => (
                  <KlauselCard key={i} klausel={k} locked={false} />
                ))}
                {lockedClauses.map((k, i) => (
                  <KlauselCard key={i} klausel={k} locked={true} />
                ))}
              </div>

              {/* Info after locked clauses */}
              {lockedClauses.length > 0 && (
                <div style={{
                  marginTop: 16, padding: '16px 20px',
                  background: 'var(--navy-soft)', border: '1px solid var(--rule)',
                  borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: 12,
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 2 }}>
                      {lockedClauses.length} weitere Klausel{lockedClauses.length !== 1 ? 'n' : ''} — in der Vollversion verfügbar
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                      Inkl. vollständiger Empfehlung, Download und Analyseverlauf
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em',
                    textTransform: 'uppercase', color: 'var(--gruen)',
                    background: 'var(--gruen-bg)', border: '1px solid rgba(12,107,58,0.2)',
                    padding: '4px 10px', borderRadius: 2, whiteSpace: 'nowrap',
                  }}>
                    Folgt bald
                  </span>
                </div>
              )}
            </section>

            {/* Empfehlung — teased */}
            <section style={{ marginBottom: 24, position: 'relative' }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Empfehlung</div>
              <div style={{
                padding: 20, background: 'var(--surface)',
                border: '1px solid var(--rule)', borderRadius: 2,
                position: 'relative', overflow: 'hidden',
              }}>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0, filter: 'blur(4px)', userSelect: 'none' }}>
                  {result.empfehlung}
                </p>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(237,243,250,0.7)',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--navy)',
                      background: 'var(--surface)', border: '1px solid var(--rule)',
                      padding: '4px 12px', borderRadius: 2,
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>🔒 In der Vollversion verfügbar · Folgt bald</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Anwalt-Hinweis */}
            {result.anwalt_empfohlen && (
              <div style={{
                padding: '12px 16px', marginBottom: 24,
                background: 'var(--rot-bg)', border: '1px solid rgba(179,32,32,0.2)',
                borderRadius: 2, fontSize: 13, color: 'var(--rot)',
              }}>
                ⚠️ Für diesen Vertrag wird die Prüfung durch einen Rechtsanwalt empfohlen.
              </div>
            )}

            {/* Disclaimer — unten, ausführlich */}
            <div style={{
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
                ⚠ Haftungsausschluss
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7, margin: '0 0 8px' }}>
                <strong>{result.haftungsausschluss}</strong> Die Ergebnisse dieser KI-Analyse
                dienen ausschließlich der verständlichen Aufbereitung von Vertragsinhalten.
                Sie ersetzen unter keinen Umständen die Beratung durch einen zugelassenen Rechtsanwalt.
              </p>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>
                Bei rechtlich bedeutsamen Verträgen — insbesondere Arbeits-, Miet-, Kredit-,
                Lizenz- oder Gesellschaftsverträgen — empfehlen wir stets die Hinzuziehung
                rechtlicher Fachberatung. TextPipeline.de übernimmt keine Haftung für Entscheidungen,
                die auf Basis dieser Analyse getroffen werden.
              </p>
            </div>

            <p style={{ marginTop: 16, textAlign: 'center', fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>
              <a href="/impressum" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>Impressum</a>
              {' '}·{' '}
              <a href="/datenschutz" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>Datenschutz</a>
              {' '}·{' '}
              <a href="/agb" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>AGB</a>
            </p>

            {/* Bottom info block */}
            <div style={{
              marginTop: 40, padding: 32, textAlign: 'center',
              background: 'var(--navy)', borderRadius: 2, color: '#fff',
            }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                Gefällt Ihnen die Demo?
              </div>
              <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 24, lineHeight: 1.6 }}>
                Die Vollversion mit vollständiger Analyse, Download-Funktion<br />
                und unbegrenzten Verträgen folgt in Kürze.
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: 'var(--gruen)',
                  background: 'var(--gruen-bg)', border: '1px solid rgba(12,107,58,0.3)',
                  padding: '6px 14px', borderRadius: 2,
                }}>
                  Vollversion — Folgt bald
                </span>
                <Link
                  href="/"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 18px', background: 'transparent', color: '#fff',
                    fontWeight: 500, fontSize: 13, borderRadius: 2, textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.35)',
                  }}
                >
                  Weiteren Vertrag testen
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
