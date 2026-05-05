'use client'

import { useRef, useState, useEffect } from 'react'
import { Icon } from '@/components/ui/Icon'
import { useRouter } from 'next/navigation'

const SESSION_KEY = 'tp_demo_session'
const USED_KEY = 'tp_demo_used'
const MAX_USES = 3

function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}

function getUsedCount(): number {
  return parseInt(localStorage.getItem(USED_KEY) || '0', 10)
}

function incrementUsed(): void {
  localStorage.setItem(USED_KEY, String(getUsedCount() + 1))
}

const MESSAGES = [
  'Dokument wird gelesen…',
  'Vertragsstruktur wird erkannt…',
  'Klauseln werden identifiziert…',
  'Risiken werden bewertet…',
  'Bericht wird erstellt…',
]

export function DemoUpload() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msgIdx, setMsgIdx] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [usedCount, setUsedCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setUsedCount(getUsedCount())
  }, [])

  useEffect(() => {
    if (uploading) {
      setMsgIdx(0)
      intervalRef.current = setInterval(() => {
        setMsgIdx(prev => {
          if (prev >= MESSAGES.length - 1) {
            clearInterval(intervalRef.current!)
            return prev
          }
          return prev + 1
        })
      }, 1500)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [uploading])

  async function handleFile(file: File) {
    setError(null)
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Bitte laden Sie eine PDF-Datei hoch.')
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('Datei zu groß. Maximum: 20 MB.')
      return
    }
    if (usedCount >= MAX_USES) {
      setError(`Sie haben die maximale Anzahl von ${MAX_USES} Demo-Analysen erreicht. Registrieren Sie sich für unbegrenzte Analysen.`)
      return
    }

    setUploading(true)
    const sessionId = getOrCreateSessionId()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('sessionId', sessionId)

    try {
      const res = await fetch('/api/analyse', { method: 'POST', body: formData })
      const json = await res.json()
      if (!res.ok || !json.id) {
        setError(json.error ?? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
        return
      }
      incrementUsed()
      setUsedCount(getUsedCount())
      router.push(`/ergebnis/${json.id}`)
    } catch {
      setError('Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.')
    } finally {
      setUploading(false)
    }
  }

  const limitReached = usedCount >= MAX_USES

  if (limitReached) {
    return (
      <div style={{
        padding: 40, textAlign: 'center',
        background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 2,
      }}>
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: 'var(--ink)' }}>
          Demo-Limit erreicht
        </div>
        <p style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 24 }}>
          Sie haben {MAX_USES} Demo-Analysen durchgeführt.
          Die Vollversion mit unbegrenzten Analysen folgt in Kürze.
        </p>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--gruen)',
          background: 'var(--gruen-bg)', border: '1px solid rgba(12,107,58,0.2)',
          padding: '6px 16px', borderRadius: 2,
        }}>
          Vollversion folgt bald
        </span>
      </div>
    )
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={e => e.key === 'Enter' && !uploading && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault(); setDragging(false)
          const f = e.dataTransfer.files[0]
          if (f) handleFile(f)
        }}
        style={{
          border: `2px dashed ${dragging ? 'var(--navy)' : 'var(--rule)'}`,
          borderRadius: 2,
          padding: '56px 32px',
          textAlign: 'center',
          background: dragging ? 'var(--navy-soft)' : 'var(--surface)',
          cursor: uploading ? 'not-allowed' : 'pointer',
          transition: 'all 150ms',
          outline: 'none',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />

        {uploading ? (
          <div>
            <div style={{
              width: 40, height: 40, border: '2px solid var(--rule)',
              borderTop: '2px solid var(--navy)',
              borderRadius: '50%', margin: '0 auto 20px',
              animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>
              {MESSAGES[msgIdx]}
            </div>
          </div>
        ) : (
          <div>
            <div style={{
              width: 44, height: 44, background: 'var(--paper-2)',
              borderRadius: 2, display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 16px',
            }}>
              <Icon name="upload" size={20} color="var(--navy)" />
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
              PDF hochladen
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>
              Vertrag hierher ziehen oder klicken · max. 20 MB
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>
              {MAX_USES - usedCount} von {MAX_USES} Demo-Analysen verfügbar
            </div>
          </div>
        )}
      </div>

      {error && (
        <div style={{
          marginTop: 12, padding: '10px 14px',
          background: 'var(--rot-bg)', border: '1px solid rgba(179,32,32,0.2)',
          borderRadius: 2, fontSize: 13, color: 'var(--rot)',
          display: 'flex', alignItems: 'flex-start', gap: 8,
        }}>
          <Icon name="warning" size={14} color="var(--rot)" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
