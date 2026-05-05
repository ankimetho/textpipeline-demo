import { DemoNav, DemoFooter, LegalSection } from '@/components/DemoShell'

export const metadata = { title: 'Nutzungsbedingungen — TextPipeline.de Demo' }

export default function AgbPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <DemoNav />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 32px' }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 12 }}>
            § Nutzungsbedingungen — Demo
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 700, margin: '0 0 8px', color: 'var(--ink)' }}>
            Nutzungsbedingungen
          </h1>
          <p style={{ fontSize: 13, color: 'var(--ink-4)', margin: 0, fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>
            STAND: 01.05.2026 · TEXTPIPELINE GMBH · BERLIN · NUR FÜR DIE DEMO-VERSION
          </p>
        </div>

        {/* Prominent disclaimer at top */}
        <div style={{
          padding: '20px 24px', marginBottom: 40,
          background: 'var(--gelb-bg)', border: '1px solid rgba(139,94,10,0.25)',
          borderLeft: '4px solid var(--gelb)', borderRadius: 2,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gelb)', marginBottom: 6, fontWeight: 600 }}>
            ⚠ Kein Rechtsrat — Wichtiger Hinweis
          </div>
          <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>
            <strong>Die Analyseergebnisse dieser Demo stellen keine Rechtsberatung dar.</strong> Sie
            dienen ausschließlich der verständlichen Aufbereitung von Vertragsinhalten und ersetzen
            unter keinen Umständen die Prüfung durch einen zugelassenen Rechtsanwalt (§ 3 RDG).
            Treffen Sie keine rechtsverbindlichen Entscheidungen allein auf Basis dieser Analysen.
          </p>
        </div>

        <LegalSection num="§ 01" title="Geltungsbereich">
          <p>
            Diese Nutzungsbedingungen gelten für die <strong>Demo-Version</strong> von TextPipeline.de
            (nachfolgend „Demo"), betrieben von der TextPipeline GmbH, Musterstraße 1, 10115 Berlin
            (nachfolgend „Anbieter"). Die Demo ist ein kostenloser Vorschau-Dienst ohne
            Registrierungspflicht.
          </p>
          <p>
            Die Demo ist keine vollständige Dienstleistung. Es besteht kein Anspruch auf
            dauerhaften Betrieb, Verfügbarkeit oder Weiterentwicklung der Demo.
          </p>
        </LegalSection>

        <LegalSection num="§ 02" title="Leistungsumfang der Demo">
          <p>
            Die Demo ermöglicht das Hochladen eines PDF-Dokuments und die KI-gestützte Analyse
            durch Mistral AI (Paris, Frankreich) auf europäischer Infrastruktur. Das Ergebnis
            zeigt einen <strong>gekürzten Auszug</strong> der Analyse:
          </p>
          <ul style={{ paddingLeft: 20 }}>
            <li>Zusammenfassung des Vertrags</li>
            <li>Vertragsart, Parteien, Laufzeit</li>
            <li>Die ersten zwei identifizierten Klauseln mit Risikobewertung</li>
            <li>Gesamtrisiko-Einschätzung</li>
          </ul>
          <p>
            Weitere Funktionen (alle Klauseln, vollständige Empfehlung, Download, Analyseverlauf)
            sind ausschließlich in der zukünftigen Vollversion verfügbar.
          </p>
          <p>
            <strong>Hinweis:</strong> Die Analysen stellen keine Rechtsberatung im Sinne des
            Rechtsdienstleistungsgesetzes (RDG) dar.
          </p>
        </LegalSection>

        <LegalSection num="§ 03" title="Nutzungslimit">
          <p>
            Pro Browser-Sitzung sind maximal <strong>3 Demo-Analysen</strong> möglich. Dieses Limit
            wird clientseitig über den Browser-Speicher (<code style={{ fontFamily: 'var(--mono)', fontSize: 13, background: 'var(--paper-2)', padding: '1px 5px' }}>localStorage</code>)
            und serverseitig über eine anonyme Sitzungs-ID durchgesetzt.
          </p>
        </LegalSection>

        <LegalSection num="§ 04" title="Pflichten des Nutzers">
          <p>Wer die Demo nutzt, verpflichtet sich:</p>
          <ul style={{ paddingLeft: 20 }}>
            <li>ausschließlich Dokumente hochzuladen, zu denen er befugt ist;</li>
            <li>die Demo nicht für rechtswidrige Zwecke zu nutzen;</li>
            <li>die Analyseergebnisse nicht als Rechtsberatung an Dritte weiterzugeben;</li>
            <li>keine automatisierten Massenabfragen durchzuführen;</li>
            <li>keine Dokumente hochzuladen, die Geheimhaltungsverpflichtungen Dritter verletzen.</li>
          </ul>
        </LegalSection>

        <LegalSection num="§ 05" title="Haftungsbeschränkung">
          <p>
            Der Anbieter haftet nicht für die inhaltliche Richtigkeit, Vollständigkeit oder
            Aktualität der KI-generierten Analyseergebnisse. Die Nutzung erfolgt auf eigenes Risiko.
          </p>
          <p>
            Die Haftung des Anbieters ist auf Vorsatz und grobe Fahrlässigkeit beschränkt.
            Die Haftung für mittelbare Schäden und entgangenen Gewinn ist ausgeschlossen,
            soweit gesetzlich zulässig.
          </p>
          <p>
            Insbesondere übernimmt der Anbieter keine Haftung für Schäden, die dadurch entstehen,
            dass der Nutzer rechtsverbindliche Entscheidungen auf Grundlage der Analyseergebnisse
            trifft, ohne rechtliche Fachberatung in Anspruch zu nehmen.
          </p>
        </LegalSection>

        <LegalSection num="§ 06" title="Datenschutz">
          <p>
            Die Verarbeitung von Daten in der Demo erfolgt gemäß unserer{' '}
            <a href="/datenschutz" style={{ color: 'var(--navy)' }}>Datenschutzerklärung</a>{' '}
            und den Bestimmungen der DSGVO. Es werden keine personenbezogenen Daten für die
            Nutzung der Demo erhoben.
          </p>
        </LegalSection>

        <LegalSection num="§ 07" title="Anwendbares Recht und Gerichtsstand">
          <p>
            Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand für alle
            Streitigkeiten ist Berlin, sofern der Nutzer Kaufmann ist oder keinen allgemeinen
            Gerichtsstand in Deutschland hat.
          </p>
        </LegalSection>

      </main>
      <DemoFooter />
    </div>
  )
}
