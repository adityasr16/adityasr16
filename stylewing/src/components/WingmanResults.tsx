'use client'

import { useState } from 'react'
import type { WingmanAnalysis, OpenerEnergy } from '@/lib/types'

interface WingmanResultsProps {
  analysis: WingmanAnalysis
}

const energyConfig: Record<OpenerEnergy, { label: string; color: string; bg: string }> = {
  playful: { label: 'Playful', color: 'text-yellow-400', bg: 'bg-yellow-900/30 border-yellow-800' },
  genuine: { label: 'Genuine', color: 'text-emerald-400', bg: 'bg-emerald-900/30 border-emerald-800' },
  curious: { label: 'Curious', color: 'text-blue-400', bg: 'bg-blue-900/30 border-blue-800' },
}

function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 0.95
  utterance.pitch = 1
  window.speechSynthesis.speak(utterance)
}

export default function WingmanResults({ analysis }: WingmanResultsProps) {
  const [speaking, setSpeaking] = useState<number | null>(null)

  const handleSpeak = (text: string, idx: number) => {
    setSpeaking(idx)
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.95
      utterance.onend = () => setSpeaking(null)
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="w-full max-w-md space-y-4 animate-fade-up">
      {/* Situation read */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Situation read</p>
        <p className="text-white text-sm leading-relaxed">{analysis.situationRead}</p>
      </div>

      {/* Openers */}
      <p className="text-zinc-400 text-xs uppercase tracking-widest px-1">Your openers</p>
      {analysis.openers.map((opener, idx) => {
        const config = energyConfig[opener.energy] ?? energyConfig.genuine
        return (
          <div
            key={idx}
            className={`rounded-2xl p-4 border space-y-2 ${config.bg} transition-all`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-white font-medium text-base leading-snug flex-1">
                &ldquo;{opener.text}&rdquo;
              </p>
              <button
                onClick={() => handleSpeak(opener.text, idx)}
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  speaking === idx
                    ? 'bg-purple-600 scale-95'
                    : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
                aria-label="Listen"
              >
                {speaking === idx ? (
                  <span className="flex gap-0.5 items-end h-4">
                    <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_0s_infinite]" style={{ height: '40%' }} />
                    <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_0.1s_infinite]" style={{ height: '70%' }} />
                    <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_0.2s_infinite]" style={{ height: '50%' }} />
                  </span>
                ) : (
                  <svg className="w-4 h-4 text-zinc-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400 text-xs">{opener.hook}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
