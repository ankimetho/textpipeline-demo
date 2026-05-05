import type { Metadata } from 'next'
import { CookieBanner } from '@/components/ui/CookieBanner'
import './globals.css'

export const metadata: Metadata = {
  title: 'TextPipeline.de — Demo',
  description: 'KI-gestützte Vertragsanalyse — Demo-Version. Laden Sie einen Vertrag hoch und erleben Sie die Analyse.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
