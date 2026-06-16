'use client'

import type { OutfitAnalysis } from '@/lib/types'

interface OutfitResultsProps {
  analysis: OutfitAnalysis
}

const categoryIcons: Record<string, string> = {
  tops: '👕',
  bottoms: '👖',
  shoes: '👟',
  outerwear: '🧥',
  accessories: '💍',
  bags: '👜',
  hats: '🧢',
  default: '✨',
}

export default function OutfitResults({ analysis }: OutfitResultsProps) {
  return (
    <div className="w-full max-w-md space-y-4 animate-fade-up">
      {/* Vibe header */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Overall vibe</p>
        <p className="text-white font-semibold text-lg">{analysis.overallStyle}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {analysis.vibeWords.map(word => (
            <span key={word} className="px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300 text-xs border border-purple-800">
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Items */}
      {analysis.items.map((item) => (
        <div key={item.id} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{categoryIcons[item.category] ?? categoryIcons.default}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium leading-snug">{item.name}</p>
              <p className="text-zinc-400 text-sm mt-0.5">{item.description}</p>
              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                {item.color}
              </span>
            </div>
          </div>

          <div>
            <p className="text-zinc-500 text-xs mb-2">Shop similar</p>
            <div className="flex flex-wrap gap-2">
              {item.storeLinks.map(link => (
                <a
                  key={link.store}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: link.color === '#000000' ? '#1a1a1a' : link.color + '22', border: `1px solid ${link.color}44`, color: link.color === '#000000' ? '#fff' : link.color }}
                >
                  {link.store} →
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}

      {analysis.items.length === 0 && (
        <div className="bg-zinc-900 rounded-2xl p-6 text-center text-zinc-500 border border-zinc-800">
          No outfit detected. Try a photo with a person wearing clothes.
        </div>
      )}
    </div>
  )
}
