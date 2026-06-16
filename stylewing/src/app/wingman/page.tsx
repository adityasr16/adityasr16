'use client'

import { useState } from 'react'
import Link from 'next/link'
import CameraCapture from '@/components/CameraCapture'
import WingmanResults from '@/components/WingmanResults'
import type { WingmanAnalysis } from '@/lib/types'

const SITUATION_PRESETS = [
  { label: 'Coffee shop', emoji: '☕' },
  { label: 'At a gym', emoji: '🏋️' },
  { label: 'Book store', emoji: '📚' },
  { label: 'Dog park', emoji: '🐕' },
  { label: 'Bar/night out', emoji: '🍸' },
  { label: 'On campus', emoji: '🎓' },
]

export default function WingmanPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<WingmanAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [context, setContext] = useState('')
  const [inputMode, setInputMode] = useState<'text' | 'photo'>('text')
  const [capturedImage, setCapturedImage] = useState<{ base64: string; mimeType: string } | null>(null)

  const handleAnalyse = async () => {
    if (!context.trim() && !capturedImage) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/wingman', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context,
          imageBase64: capturedImage?.base64,
          mimeType: capturedImage?.mimeType,
        }),
      })
      if (!res.ok) throw new Error('Analysis failed')
      const data: WingmanAnalysis = await res.json()
      setResult(data)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCapture = (base64: string, mimeType: string) => {
    setCapturedImage({ base64, mimeType })
  }

  return (
    <main className="flex flex-col items-center gap-6 pt-8 pb-16">
      <div className="flex items-center justify-between w-full max-w-md">
        <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-1">
          ← Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <h1 className="text-white font-semibold">Wingman</h1>
        </div>
        <div className="w-12" />
      </div>

      <p className="text-zinc-400 text-sm text-center max-w-xs">
        Describe the situation — get 5 natural openers. Tap the speaker to hear them in your AirPods.
      </p>

      {/* Input mode toggle */}
      <div className="flex w-full max-w-md bg-zinc-900 rounded-xl p-1 border border-zinc-800">
        <button
          onClick={() => setInputMode('text')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            inputMode === 'text'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Describe it
        </button>
        <button
          onClick={() => setInputMode('photo')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            inputMode === 'photo'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Snap a photo
        </button>
      </div>

      {inputMode === 'text' ? (
        <div className="flex flex-col gap-3 w-full max-w-md">
          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {SITUATION_PRESETS.map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => setContext(label)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                  context === label
                    ? 'bg-blue-900/50 border-blue-600 text-blue-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                {emoji} {label}
              </button>
            ))}
          </div>

          <textarea
            value={context}
            onChange={e => setContext(e.target.value)}
            placeholder="Describe the situation in detail: where you are, what's happening around you, any obvious shared context..."
            rows={4}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-white text-sm placeholder-zinc-600 resize-none focus:outline-none focus:border-blue-700 transition-colors"
          />

          <button
            onClick={handleAnalyse}
            disabled={!context.trim() || loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-base transition-all shadow-lg shadow-blue-900/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Getting your openers…' : 'Get openers'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full max-w-md">
          <CameraCapture onCapture={handleCapture} loading={loading} label="Snap context" />

          {capturedImage && !loading && (
            <>
              <textarea
                value={context}
                onChange={e => setContext(e.target.value)}
                placeholder="Add any extra context (optional)..."
                rows={2}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-white text-sm placeholder-zinc-600 resize-none focus:outline-none focus:border-blue-700 transition-colors"
              />
              <button
                onClick={handleAnalyse}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-base transition-all shadow-lg shadow-blue-900/30 disabled:opacity-40"
              >
                Get openers
              </button>
            </>
          )}
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 text-zinc-400 text-sm">
          <div className="w-5 h-5 rounded-full border-2 border-t-blue-500 border-zinc-700 animate-spin" />
          Reading the room…
        </div>
      )}

      {error && (
        <div className="w-full max-w-md p-4 rounded-2xl bg-red-900/20 border border-red-800 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {result && !loading && <WingmanResults analysis={result} />}
    </main>
  )
}
