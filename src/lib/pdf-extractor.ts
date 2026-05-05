import { PDFError, PDFExtractionResult } from '@/types'

const MAX_CHARS = 80_000
const TRUNCATION_NOTE = '\n\n[HINWEIS: Dokument wurde auf 80.000 Zeichen gekürzt.]'
const PDF_MAGIC_BYTES = Buffer.from([0x25, 0x50, 0x44, 0x46])

function fixGermanEncoding(text: string): string {
  return text
    .replace(/Ã¤/g, 'ä').replace(/Ã¶/g, 'ö').replace(/Ã¼/g, 'ü')
    .replace(/Ã„/g, 'Ä').replace(/Ã–/g, 'Ö').replace(/Ãœ/g, 'Ü')
    .replace(/ÃŸ/g, 'ß')
    .replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl').replace(/ﬀ/g, 'ff')
    .replace(/[–—]/g, '-').replace(/[„"]/g, '"').replace(/[‚']/g, "'")
}

function cleanText(text: string): string {
  return text
    .replace(/ {2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\f/g, '\n\n')
    .replace(/-\n([a-zäöüß])/g, '$1')
    .split('\n').map(l => l.trim()).join('\n').trim()
}

export function validatePDFBuffer(buffer: Buffer): void {
  if (buffer.length < 4) throw new PDFError('PDF_BESCHAEDIGT', 'Datei zu klein.')
  if (!buffer.subarray(0, 4).equals(PDF_MAGIC_BYTES))
    throw new PDFError('PDF_BESCHAEDIGT', 'Kein valides PDF. Bitte laden Sie eine PDF-Datei hoch.')
}

export function validateFileSize(bytes: number): void {
  const maxMB = parseInt(process.env.MAX_FILE_SIZE_MB || '20')
  if (bytes > maxMB * 1024 * 1024)
    throw new PDFError('PDF_BESCHAEDIGT', `Datei zu groß. Maximum: ${maxMB} MB.`)
}

export async function extractTextFromPDF(buffer: Buffer): Promise<PDFExtractionResult> {
  let pdfParse: (b: Buffer, o?: object) => Promise<{ text: string; numpages: number }>
  try {
    const m = await import('pdf-parse')
    pdfParse = m.default || m
  } catch {
    throw new PDFError('PDF_BESCHAEDIGT', 'PDF-Parser konnte nicht geladen werden.')
  }

  let result: { text: string; numpages: number }
  try {
    result = await pdfParse(buffer, { max: 100 })
  } catch (e) {
    const msg = e instanceof Error ? e.message.toLowerCase() : ''
    if (msg.includes('password') || msg.includes('encrypted'))
      throw new PDFError('PDF_PASSWORTGESCHUETZT', 'Das PDF ist passwortgeschützt.')
    throw new PDFError('PDF_BESCHAEDIGT', 'PDF konnte nicht gelesen werden.')
  }

  if (!result.text || result.text.trim().length < 50)
    throw new PDFError('PDF_KEIN_TEXT', 'Das PDF enthält keinen lesbaren Text.')

  let text = cleanText(fixGermanEncoding(result.text))
  const truncated = text.length > MAX_CHARS
  if (truncated) text = text.slice(0, MAX_CHARS) + TRUNCATION_NOTE

  return { text, pageCount: result.numpages, truncated }
}
