import { NextRequest, NextResponse } from 'next/server'
import { analyzeOutfit } from '@/lib/claude'

// SDK needs the Node runtime (not Edge). 60s is the Vercel Hobby ceiling —
// ample headroom for a vision call that normally returns in a few seconds.
export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imageBase64, mimeType } = body

    if (!imageBase64 || !mimeType) {
      return NextResponse.json({ error: 'imageBase64 and mimeType are required' }, { status: 400 })
    }

    const analysis = await analyzeOutfit(imageBase64, mimeType)
    return NextResponse.json(analysis)
  } catch (err) {
    console.error('Outfit API error:', err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
