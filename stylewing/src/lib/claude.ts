import Anthropic from '@anthropic-ai/sdk'
import type { OutfitAnalysis, WingmanAnalysis } from './types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const STORES = [
  { store: 'Amazon', base: 'https://www.amazon.com/s?k=', color: '#FF9900' },
  { store: 'ASOS', base: 'https://www.asos.com/search/?q=', color: '#2D2D2D' },
  { store: 'H&M', base: 'https://www2.hm.com/en_us/search-results.html?q=', color: '#E50010' },
  { store: 'Zara', base: 'https://www.zara.com/us/en/search?searchTerm=', color: '#000000' },
  { store: 'Depop', base: 'https://www.depop.com/search/?q=', color: '#FF2300' },
]

function buildStoreLinks(searchTerms: string[]) {
  const query = encodeURIComponent(searchTerms.slice(0, 3).join(' '))
  return STORES.map(({ store, base, color }) => ({ store, url: base + query, color }))
}

// Sonnet 4.6 for the demo: ~2x faster (snappy live demo, stays well under the
// serverless function timeout) and ~half the cost, with marginal quality loss
// on outfit ID. Switch to 'claude-opus-4-8' for maximum accuracy if you don't
// mind the extra latency/cost.
const MODEL = 'claude-sonnet-4-6'

export async function analyzeOutfit(imageBase64: string, mimeType: string): Promise<OutfitAnalysis> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/webp', data: imageBase64 },
          },
          {
            type: 'text',
            text: `Analyze this outfit image. Identify every visible clothing item and accessory.

Return ONLY valid JSON in this exact shape:
{
  "items": [
    {
      "name": "oversized white graphic tee",
      "description": "loose-fit white t-shirt with a faded print",
      "color": "white",
      "category": "tops",
      "searchTerms": ["oversized white graphic tee", "baggy white t-shirt streetwear"]
    }
  ],
  "overallStyle": "streetwear / casual",
  "vibeWords": ["relaxed", "minimal", "clean"]
}

Rules:
- Be specific about fit, color, and notable details
- Include 2-3 search terms per item optimized for online shopping
- overallStyle: one short phrase
- vibeWords: exactly 3 words
- If no person/outfit visible, return items as empty array`,
          },
        ],
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON in Claude response')

  const parsed = JSON.parse(jsonMatch[0])
  return {
    ...parsed,
    items: parsed.items.map((item: OutfitAnalysis['items'][0], i: number) => ({
      ...item,
      id: `item-${i}`,
      storeLinks: buildStoreLinks(item.searchTerms),
    })),
  }
}

export async function analyzeForWingman(
  context: string,
  imageBase64?: string,
  mimeType?: string
): Promise<WingmanAnalysis> {
  const contentParts: Anthropic.ContentBlockParam[] = []

  if (imageBase64 && mimeType) {
    contentParts.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/webp',
        data: imageBase64,
      },
    })
  }

  contentParts.push({
    type: 'text',
    text: `You are a sharp, socially intelligent wingman. Generate natural conversation openers based on observable context only — never on anyone's identity or personal data.

Context from user: "${context || 'No additional context provided'}"
${imageBase64 ? 'Also analyze the photo for environmental/contextual cues.' : ''}

Return ONLY valid JSON in this exact shape:
{
  "situationRead": "One sentence read of the vibe/situation",
  "openers": [
    {
      "text": "The actual thing to say, verbatim",
      "hook": "Why this works in one sentence",
      "energy": "playful"
    }
  ]
}

Rules:
- Exactly 5 openers
- energy must be one of: "playful", "genuine", "curious"
- Mix the energies across the 5 openers
- Based ONLY on shared context: location, environment, what's happening, common ground
- No cheesy pickup lines — natural conversation starters
- Openers should feel like something a charismatic friend would say
- Keep each opener under 20 words`,
  })

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1000,
    messages: [{ role: 'user', content: contentParts }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON in Claude response')

  return JSON.parse(jsonMatch[0])
}
