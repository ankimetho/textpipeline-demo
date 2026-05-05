import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { extractTextFromPDF, validatePDFBuffer, validateFileSize } from '@/lib/pdf-extractor'
import { analyzeContract } from '@/lib/mistral-client'
import { PDFError, MistralError } from '@/types'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const supabase = createSupabaseAdminClient()

  let sessionId: string
  let filename: string
  let buffer: Buffer

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    sessionId = (formData.get('sessionId') as string | null) ?? ''

    if (!file || !sessionId) {
      return NextResponse.json({ error: 'Datei oder Session fehlt.' }, { status: 400 })
    }

    filename = file.name
    validateFileSize(file.size)
    const arrayBuffer = await file.arrayBuffer()
    buffer = Buffer.from(arrayBuffer)
    validatePDFBuffer(buffer)
  } catch (e) {
    const msg = e instanceof PDFError ? e.message : 'Ungültige Anfrage.'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  // Rate limit: max 3 analyses per session
  const { count } = await supabase
    .from('demo_analyses')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)

  if ((count ?? 0) >= 3) {
    return NextResponse.json(
      { error: 'Demo-Limit erreicht. Bitte registrieren Sie sich für unbegrenzte Analysen.' },
      { status: 429 }
    )
  }

  // Create pending record
  const { data: record, error: insertError } = await supabase
    .from('demo_analyses')
    .insert({ session_id: sessionId, filename, status: 'verarbeitung' })
    .select('id')
    .single()

  if (insertError || !record) {
    return NextResponse.json({ error: 'Analyse konnte nicht gestartet werden.' }, { status: 500 })
  }

  const analyseId = record.id
  const startMs = Date.now()

  // Run analysis (synchronous in demo — simpler, no polling needed for short docs)
  try {
    const { text } = await extractTextFromPDF(buffer)
    const result = await analyzeContract(text)
    const processingMs = Date.now() - startMs

    await supabase
      .from('demo_analyses')
      .update({ status: 'abgeschlossen', result_json: result, processing_ms: processingMs })
      .eq('id', analyseId)

    return NextResponse.json({ id: analyseId })
  } catch (e) {
    const msg = e instanceof PDFError || e instanceof MistralError
      ? e.message
      : 'Ein unerwarteter Fehler ist aufgetreten.'

    await supabase
      .from('demo_analyses')
      .update({ status: 'fehler', error_message: msg })
      .eq('id', analyseId)

    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
