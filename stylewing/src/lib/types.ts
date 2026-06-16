export interface StoreLink {
  store: string
  url: string
  color: string
}

export interface ClothingItem {
  id: string
  name: string
  description: string
  color: string
  category: string
  searchTerms: string[]
  storeLinks: StoreLink[]
}

export interface OutfitAnalysis {
  items: ClothingItem[]
  overallStyle: string
  vibeWords: string[]
}

export type OpenerEnergy = 'playful' | 'genuine' | 'curious'

export interface WingmanOpener {
  text: string
  hook: string
  energy: OpenerEnergy
}

export interface WingmanAnalysis {
  situationRead: string
  openers: WingmanOpener[]
}
