import type { OutfitAnalysis, WingmanAnalysis } from './types'

// Store list mirrors src/lib/claude.ts. Kept local so this module stays
// client-safe — claude.ts pulls in the server-only Anthropic SDK and must
// never be imported into a client component.
const STORES = [
  { store: 'Amazon', base: 'https://www.amazon.com/s?k=', color: '#FF9900' },
  { store: 'ASOS', base: 'https://www.asos.com/search/?q=', color: '#2D2D2D' },
  { store: 'H&M', base: 'https://www2.hm.com/en_us/search-results.html?q=', color: '#E50010' },
  { store: 'Zara', base: 'https://www.zara.com/us/en/search?searchTerm=', color: '#000000' },
  { store: 'Depop', base: 'https://www.depop.com/search/?q=', color: '#FF2300' },
]

function storeLinks(searchTerms: string[]) {
  const query = encodeURIComponent(searchTerms.slice(0, 3).join(' '))
  return STORES.map(s => ({ store: s.store, url: s.base + query, color: s.color }))
}

// A curated, always-perfect result so the first thing on camera looks great —
// no API key, network, or photo required. Use the "See an example" buttons.
export const SAMPLE_OUTFIT: OutfitAnalysis = {
  overallStyle: 'Elevated casual streetwear',
  vibeWords: ['clean', 'confident', 'effortless'],
  items: [
    {
      id: 'sample-1',
      name: 'Oversized cream knit sweater',
      description: 'Chunky beige crewneck with a relaxed drop-shoulder fit',
      color: 'cream',
      category: 'tops',
      searchTerms: ['oversized cream knit sweater', 'chunky beige crewneck'],
      storeLinks: storeLinks(['oversized cream knit sweater', 'chunky beige crewneck']),
    },
    {
      id: 'sample-2',
      name: 'Straight-leg dark wash jeans',
      description: 'Relaxed straight-cut denim in a deep indigo',
      color: 'dark indigo',
      category: 'bottoms',
      searchTerms: ['straight leg dark wash jeans', 'relaxed indigo denim'],
      storeLinks: storeLinks(['straight leg dark wash jeans', 'relaxed indigo denim']),
    },
    {
      id: 'sample-3',
      name: 'White leather low-top sneakers',
      description: 'Minimal white leather trainers with a clean silhouette',
      color: 'white',
      category: 'shoes',
      searchTerms: ['white leather low top sneakers', 'minimalist white trainers'],
      storeLinks: storeLinks(['white leather low top sneakers', 'minimalist white trainers']),
    },
    {
      id: 'sample-4',
      name: 'Layered gold chain necklace',
      description: 'Thin layered gold-tone chains',
      color: 'gold',
      category: 'accessories',
      searchTerms: ['layered gold chain necklace', 'thin gold chain'],
      storeLinks: storeLinks(['layered gold chain necklace', 'thin gold chain']),
    },
  ],
}

export const SAMPLE_WINGMAN: WingmanAnalysis = {
  situationRead:
    'Relaxed coffee-shop energy — laptops open, easy playlist, nobody rushing. Low-pressure, so curiosity lands better than intensity.',
  openers: [
    { text: 'Real question — is that drink actually good, or just photogenic?', hook: 'Playful tease about a shared, visible thing', energy: 'playful' },
    { text: 'You look deep in something good. What are you working on?', hook: 'Genuine, easy to answer, invites them to share', energy: 'genuine' },
    { text: 'I keep seeing everyone order that one. What is it?', hook: 'Low-stakes curiosity about the room', energy: 'curious' },
    { text: 'This playlist is dangerously good — is it the shop’s or yours?', hook: 'Comments on shared ambiance, opens a thread', energy: 'playful' },
    { text: 'Mind if I grab the seat by the outlet? My laptop’s on 3%.', hook: 'Practical, warm, gives an easy reason to talk', energy: 'genuine' },
  ],
}
