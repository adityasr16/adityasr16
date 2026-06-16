import { NextRequest, NextResponse } from 'next/server'
import { analyzeForWingman } from '@/lib/claude'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { context, imageBase64, mimeType } = body

    if (!context && !imageBase64) {
      return NextResponse.json({ error: 'context or image required' }, { status: 400 })
    }

    const analysis = await analyzeForWingman(context || '', imageBase64, mimeType)
    return NextResponse.json(analysis)
  } catch (err) {
    console.error('Wingman API error:', err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
