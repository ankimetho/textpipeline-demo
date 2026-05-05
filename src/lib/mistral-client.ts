import { z } from 'zod'
import { MistralError, AnalyseErgebnis } from '@/types'

const RisikoSchema = z.enum(['gruen', 'gelb', 'rot'])

const AnalyseErgebnisSchema = z.object({
  zusammenfassung: z.string().min(10),
  vertragsart: z.string().min(1),
  parteien: z.object({ partei_a: z.string().min(1), partei_b: z.string().min(1) }),
  laufzeit: z.object({
    beginn: z.string().nullable(),
    ende: z.string().nullable(),
    kuendigung: z.string().nullable(),
  }),
  pflichten: z.object({
    partei_a: z.array(z.string()),
    partei_b: z.array(z.string()),
  }),
  wichtige_klauseln: z.array(z.object({
    titel: z.string().min(1),
    inhalt: z.string().min(1),
    quelltext: z.string().max(400),
    risiko: RisikoSchema,
    risiko_begruendung: z.string().min(1),
    referenz: z.string().optional(),
  })).min(1).max(10),
  gesamtrisiko: RisikoSchema,
  empfehlung: z.string().min(10),
  anwalt_empfohlen: z.boolean(),
  haftungsausschluss: z.string().min(1),
})

const SYSTEM_PROMPT = `Du bist ein Experte für die verständliche Aufbereitung von deutschen Verträgen.
Deine Aufgabe ist es, Verträge so zu erklären, dass Menschen ohne juristische Ausbildung sie verstehen können.

WICHTIGE REGELN:
1. Antworte AUSSCHLIESSLICH auf Deutsch
2. Antworte AUSSCHLIESSLICH mit validem JSON — kein Text davor oder danach
3. Erkläre Klauseln in einfacher, klarer Sprache — keine Juristensprache
4. Sei konservativ bei der Risikobewertung: Im Zweifel lieber "gelb" als "gruen"
5. Erfinde KEINE Informationen — wenn etwas unklar ist, sage es
6. Das Feld "quelltext" muss ein exaktes Zitat aus dem Originalvertrag enthalten (max. 300 Zeichen)
7. Du gibst KEINE Rechtsberatung — du erklärst nur, was im Vertrag steht`

function buildPrompt(contractText: string): string {
  return `Analysiere den folgenden Vertrag und gib ein JSON-Objekt zurück.

VERTRAGSTEXT:
---
${contractText}
---

Gib AUSSCHLIESSLICH dieses JSON-Objekt zurück:

{
  "zusammenfassung": "3-5 Sätze in einfachem Deutsch",
  "vertragsart": "Erkannter Vertragstyp",
  "parteien": { "partei_a": "...", "partei_b": "..." },
  "laufzeit": { "beginn": "..." , "ende": "...", "kuendigung": "..." },
  "pflichten": { "partei_a": ["..."], "partei_b": ["..."] },
  "wichtige_klauseln": [
    {
      "titel": "...",
      "inhalt": "Erklärung in einfachem Deutsch",
      "quelltext": "Exaktes Zitat (max. 300 Zeichen)",
      "risiko": "gruen|gelb|rot",
      "risiko_begruendung": "...",
      "referenz": "S. X, Z. Y"
    }
  ],
  "gesamtrisiko": "gruen|gelb|rot",
  "empfehlung": "Konkrete Empfehlung in 2-3 Sätzen",
  "anwalt_empfohlen": true,
  "haftungsausschluss": "Dieser Bericht stellt keine Rechtsberatung dar."
}`
}

function extractJSON(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (match) return match[1]
  const s = text.indexOf('{'), e = text.lastIndexOf('}')
  if (s !== -1 && e > s) return text.slice(s, e + 1)
  return text.trim()
}

export async function analyzeContract(contractText: string): Promise<AnalyseErgebnis> {
  const provider = process.env.AI_PROVIDER || 'mistral'
  const url = provider === 'nvidia'
    ? 'https://integrate.api.nvidia.com/v1/chat/completions'
    : 'https://api.mistral.ai/v1/chat/completions'
  const apiKey = provider === 'nvidia' ? process.env.NVIDIA_API_KEY! : process.env.MISTRAL_API_KEY!
  const model = provider === 'nvidia'
    ? (process.env.NVIDIA_MODEL || 'mistralai/mistral-large-latest')
    : (process.env.MISTRAL_MODEL || 'mistral-large-latest')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 60000)

  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt(contractText) },
        ],
        temperature: 0.1,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }

  if (!response.ok) throw new MistralError('API_ERROR', `API Fehler ${response.status}`)

  const data = await response.json()
  const raw = data.choices?.[0]?.message?.content
  if (!raw) throw new MistralError('INVALID_RESPONSE', 'Leere Antwort vom KI-Modell')

  let parsed: unknown
  try { parsed = JSON.parse(extractJSON(raw)) }
  catch { throw new MistralError('INVALID_RESPONSE', 'Kein valides JSON zurückgegeben') }

  const validated = AnalyseErgebnisSchema.safeParse(parsed)
  if (!validated.success)
    throw new MistralError('INVALID_RESPONSE', 'Analyse-Ergebnis ungültig')

  return validated.data as AnalyseErgebnis
}
