import { DemoNav, DemoFooter, LegalSection } from '@/components/DemoShell'

export const metadata = { title: 'Datenschutzerklärung — TextPipeline.de Demo' }

export default function DatenschutzPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <DemoNav />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 32px' }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 12 }}>
            § DSGVO — Datenschutzerklärung
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 700, margin: '0 0 8px', color: 'var(--ink)' }}>Datenschutz</h1>
          <p style={{ fontSize: 13, color: 'var(--ink-4)', margin: 0, fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>
            STAND: 01.05.2026 · VERANTWORTLICH: TEXTPIPELINE GMBH
          </p>
        </div>

        <LegalSection num="§ 01" title="Grundsätze">
          <p>
            Diese Demo-Anwendung verarbeitet so wenig Daten wie möglich. Es ist <strong>kein Nutzerkonto
            erforderlich</strong>. Vertragstexte werden nach Abschluss der Analyse nicht dauerhaft
            gespeichert — das Analyseergebnis (strukturiertes JSON) verbleibt temporär in unserer
            EU-Datenbank und wird keiner Person zugeordnet.
          </p>
          <p>
            Die gesamte Verarbeitung — Upload, Analyse, Speicherung — findet ausschließlich auf
            europäischer Infrastruktur statt (Vercel Frankfurt, Supabase Frankfurt, Mistral AI Paris).
            Kein Vertragsinhalt wird an US-Server übermittelt.
          </p>
        </LegalSection>

        <LegalSection num="§ 02" title="Verantwortlicher">
          <p style={{ margin: 0 }}>
            Thorsten Hoppmann<br />
            Beuditzstraße 91c, 06667 Weißenfels<br />
            E-Mail:{' '}
            <a href="mailto:thorsten@textpipeline.de" style={{ color: 'var(--navy)' }}>
              thorsten@textpipeline.de
            </a>
          </p>
        </LegalSection>

        <LegalSection num="§ 03" title="Welche Daten wir verarbeiten">
          <p><strong>Beim Upload und der Analyse eines Vertrags:</strong></p>
          <ul style={{ paddingLeft: 20 }}>
            <li>
              <strong>Dateiname</strong> des hochgeladenen PDF — gespeichert zur Anzeige im Ergebnis.
            </li>
            <li>
              <strong>Vertragstext (PDF-Inhalt)</strong> — wird serverseitig an Mistral AI (Paris, EU)
              übermittelt, zur Analyse verarbeitet und anschließend <em>nicht</em> gespeichert.
            </li>
            <li>
              <strong>Analyseergebnis (JSON)</strong> — wird in unserer Datenbank (Supabase, Frankfurt)
              gespeichert und ist über eine anonyme Sitzungs-ID abrufbar.
            </li>
            <li>
              <strong>Sitzungs-ID</strong> — eine zufällig erzeugte UUID, die im Browser-eigenen
              <code style={{ fontFamily: 'var(--mono)', fontSize: 13, background: 'var(--paper-2)', padding: '1px 5px' }}> localStorage</code>{' '}
              gespeichert wird. Sie enthält keine personenbezogenen Informationen und wird nicht mit
              Ihrer Person verknüpft.
            </li>
            <li>
              <strong>IP-Adresse</strong> — wird von unserer Hosting-Infrastruktur (Vercel) in
              Zugriffs-Logs erfasst, für max. 30 Tage gespeichert und nicht mit Analysen verknüpft.
            </li>
          </ul>
          <p>Wir verarbeiten <strong>keine</strong> E-Mail-Adressen, Namen oder Zahlungsdaten in der Demo.</p>
        </LegalSection>

        <LegalSection num="§ 04" title="Rechtsgrundlagen">
          <ul style={{ paddingLeft: 20 }}>
            <li>Art. 6 Abs. 1 lit. b DSGVO — Bereitstellung des Demo-Dienstes (Vertragsanbahnung)</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO — Berechtigtes Interesse an Sicherheit und Missbrauchsprävention (Rate Limiting)</li>
          </ul>
        </LegalSection>

        <LegalSection num="§ 05" title="Speicherdauer">
          <p>
            Analyseergebnisse in der Demo-Datenbank werden nicht aktiv gelöscht, enthalten jedoch
            keine personenbezogenen Daten. Technisch sind sie über die anonyme Sitzungs-ID abrufbar,
            solange diese im Browser gespeichert ist.
          </p>
          <p>
            Server-Logs (IP-Adressen) werden nach maximal 30 Tagen automatisch gelöscht.
          </p>
        </LegalSection>

        <LegalSection num="§ 06" title="Unterauftragsverarbeiter">
          <p>Wir setzen ausschließlich EU-Anbieter ein:</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--paper-2)' }}>
                  {['Anbieter', 'Funktion', 'Sitz'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-3)', borderBottom: '1px solid var(--rule)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Vercel Inc. (EU-Region)', 'Hosting, Edge-Netzwerk', 'Frankfurt, DE'],
                  ['Supabase (EU-Region)', 'Datenbank, Analyse-Ergebnisse', 'Frankfurt, DE'],
                  ['Mistral AI', 'KI-Analyse (Vertragstext)', 'Paris, FR'],
                ].map(([name, fn, loc]) => (
                  <tr key={name} style={{ borderBottom: '1px solid var(--rule-soft)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>{name}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--ink-3)' }}>{fn}</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>{loc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 12 }}>
            Es werden <strong>keine US-Dienste</strong> eingesetzt — auch nicht als Fallback.
          </p>
        </LegalSection>

        <LegalSection id="cookies" num="§ 07" title="Cookies und Browser-Speicher">
          {/* Prominent notice */}
          <div style={{
            padding: '14px 18px', marginBottom: 20,
            background: 'var(--gruen-bg)', border: '1px solid rgba(12,107,58,0.2)',
            borderLeft: '3px solid var(--gruen)', borderRadius: 2,
          }}>
            <strong style={{ color: 'var(--gruen)', fontSize: 13 }}>
              Diese Demo setzt keine Cookies.
            </strong>
          </div>

          <p>
            Wir verwenden ausschließlich den Browser-eigenen{' '}
            <code style={{ fontFamily: 'var(--mono)', fontSize: 13, background: 'var(--paper-2)', padding: '1px 5px' }}>
              localStorage
            </code>{' '}
            — dieser sendet <em>keine</em> Daten bei HTTP-Anfragen und unterliegt nicht der
            Cookie-Regelung (TTDSG § 25). Es werden drei Einträge gesetzt:
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginTop: 12 }}>
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['Schlüssel', 'Inhalt', 'Zweck'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-3)', borderBottom: '1px solid var(--rule)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['tp_demo_session', 'Zufällige UUID', 'Sitzungsidentifikation für Rate-Limiting (max. 3 Analysen)'],
                ['tp_demo_used', 'Zähler (0–3)', 'Anzahl bereits durchgeführter Demo-Analysen'],
                ['tp_demo_consent', '"accepted"', 'Nachweis der Kenntnisnahme dieses Hinweises'],
              ].map(([key, val, purpose]) => (
                <tr key={key} style={{ borderBottom: '1px solid var(--rule-soft)' }}>
                  <td style={{ padding: '10px 12px', fontFamily: 'var(--mono)', fontSize: 12 }}>{key}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--ink-3)' }}>{val}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--ink-3)' }}>{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ marginTop: 12 }}>
            Sie können den localStorage jederzeit über die Entwicklertools Ihres Browsers leeren
            (Einstellungen → Datenschutz → Website-Daten löschen). Eine technische Einschränkung
            ist nicht möglich, da diese Einträge für den Betrieb der Demo erforderlich sind.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Bereitstellung des Dienstes) und
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse: Missbrauchsprävention).
          </p>
        </LegalSection>

        <LegalSection num="§ 08" title="Ihre Rechte">
          <p>Da in der Demo keine personenbezogenen Daten gespeichert werden (die Sitzungs-ID ist
          eine zufällige UUID ohne Personenbezug), greifen die klassischen Betroffenenrechte
          (Art. 15–22 DSGVO) hier technisch nicht. Für Fragen wenden Sie sich dennoch gerne an:</p>
          <p style={{ margin: 0 }}>
            <a href="mailto:datenschutz@textpipeline.de" style={{ color: 'var(--navy)' }}>
              datenschutz@textpipeline.de
            </a>
          </p>
          <p>
            Sie haben zudem das Recht, Beschwerde bei der zuständigen Aufsichtsbehörde einzulegen
            (Landesbeauftragte für den Datenschutz Sachsen-Anhalt, Leiterstraße 9, 39104 Magdeburg).
          </p>
        </LegalSection>

      </main>
      <DemoFooter />
    </div>
  )
}
