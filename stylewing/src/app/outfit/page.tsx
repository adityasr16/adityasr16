'use client'

import { useState } from 'react'
import Link from 'next/link'
import CameraCapture from '@/components/CameraCapture'
import OutfitResults from '@/components/OutfitResults'
import type { OutfitAnalysis } from '@/lib/types'

export default function OutfitPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<OutfitAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCapture = async (base64: string, mimeType: string) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mimeType }),
      })
      if (!res.ok) throw new Error('Analysis failed')
      const data: OutfitAnalysis = await res.json()
      setResult(data)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center gap-6 pt-8 pb-16">
      <div className="flex items-center justify-between w-full max-w-md">
        <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-1">
          ← Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-lg">👕</span>
          <h1 className="text-white font-semibold">Outfit Finder</h1>
        </div>
        <div className="w-12" />
      </div>

      <p className="text-zinc-400 text-sm text-center max-w-xs">
        Point at any outfit and get every piece identified with instant shopping links.
      </p>

      <CameraCapture onCapture={handleCapture} loading={loading} label="Scan outfit" />

      {error && (
        <div className="w-full max-w-md p-4 rounded-2xl bg-red-900/20 border border-red-800 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {result && !loading && <OutfitResults analysis={result} />}
    </main>
  )
}
