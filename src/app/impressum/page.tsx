import { DemoNav, DemoFooter, LegalSection } from '@/components/DemoShell'

export const metadata = { title: 'Impressum — TextPipeline.de Demo' }

export default function ImpressumPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <DemoNav />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 32px' }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 12 }}>
            § TMG — Impressum
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 700, margin: '0 0 8px', color: 'var(--ink)' }}>Impressum</h1>
          <p style={{ fontSize: 13, color: 'var(--ink-4)', margin: 0, fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>
            ANGABEN GEMÄSS § 5 TMG
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 40 }}>

          <LegalSection num="§ 01" title="Anbieter">
            <p style={{ margin: 0 }}>
              Thorsten Hoppmann<br />
              Beuditzstraße 91c<br />
              06667 Weißenfels<br />
              Deutschland
            </p>
          </LegalSection>

          <LegalSection num="§ 02" title="Kontakt">
            <p style={{ margin: 0 }}>
              E-Mail:{' '}
              <a href="mailto:thorsten@textpipeline.de" style={{ color: 'var(--navy)' }}>
                thorsten@textpipeline.de
              </a>
            </p>
          </LegalSection>

          <LegalSection num="§ 03" title="Aufsichtsbehörde (Datenschutz)">
            <p style={{ margin: 0 }}>
              Landesbeauftragte für den Datenschutz Sachsen-Anhalt<br />
              Leiterstraße 9<br />
              39104 Magdeburg
            </p>
          </LegalSection>

          <LegalSection num="§ 04" title="Haftungsausschluss">
            <p style={{ margin: 0 }}>
              <strong>Diese Demo-Anwendung und alle enthaltenen Analysen stellen ausdrücklich
              keine Rechtsberatung dar</strong> und ersetzen nicht die Beratung durch einen
              zugelassenen Rechtsanwalt. Wir übernehmen keine Haftung für die Vollständigkeit,
              Richtigkeit oder Aktualität der KI-generierten Analyseergebnisse. Die Nutzung
              der Analyseergebnisse erfolgt auf eigenes Risiko des Nutzers.
            </p>
          </LegalSection>

          <LegalSection num="§ 05" title="Streitschlichtung">
            <p style={{ margin: 0 }}>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
                https://ec.europa.eu/consumers/odr
              </a>.<br />
              Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </LegalSection>

          <LegalSection num="§ 06" title="Hinweis Demo-Status">
            <p style={{ margin: 0 }}>
              Diese Anwendung ist eine <strong>Vorschau-Demo</strong> eines in Entwicklung befindlichen
              Produkts. Die Vollversion von TextPipeline.de folgt zu einem späteren Zeitpunkt.
              Es besteht kein Anspruch auf Verfügbarkeit oder Kontinuität des Demo-Betriebs.
            </p>
          </LegalSection>

        </div>
      </main>
      <DemoFooter />
    </div>
  )
}
