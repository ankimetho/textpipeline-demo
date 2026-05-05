export type Risiko = 'gruen' | 'gelb' | 'rot'
export type DemoStatus = 'verarbeitung' | 'abgeschlossen' | 'fehler'

export interface Klausel {
  titel: string
  inhalt: string
  quelltext: string
  risiko: Risiko
  risiko_begruendung: string
  referenz?: string
}

export interface AnalyseErgebnis {
  zusammenfassung: string
  vertragsart: string
  parteien: { partei_a: string; partei_b: string }
  laufzeit: { beginn: string | null; ende: string | null; kuendigung: string | null }
  pflichten: { partei_a: string[]; partei_b: string[] }
  wichtige_klauseln: Klausel[]
  gesamtrisiko: Risiko
  empfehlung: string
  anwalt_empfohlen: boolean
  haftungsausschluss: string
}

export interface DemoAnalyse {
  id: string
  session_id: string
  filename: string
  status: DemoStatus
  result_json: AnalyseErgebnis | null
  error_message: string | null
  processing_ms: number | null
  created_at: string
}

export class PDFError extends Error {
  constructor(public code: string, message: string) {
    super(message)
    this.name = 'PDFError'
  }
}

export class MistralError extends Error {
  constructor(public code: string, message: string) {
    super(message)
    this.name = 'MistralError'
  }
}

export interface PDFExtractionResult {
  text: string
  pageCount: number
  truncated: boolean
}
