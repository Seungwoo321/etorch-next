import { NextRequest, NextResponse } from 'next/server'
import { http } from '@/lib/http'

type Params = {
  origin: string
}

export async function GET (
  request: NextRequest,
  context: { params: Promise<Params> }
): Promise<NextResponse> {
  const { origin } = (await context.params)
  if (!origin) {
    return NextResponse.json({ error: 'Origin is required' }, { status: 400 })
  }
  return await http.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/indicators/${origin}`)
}
