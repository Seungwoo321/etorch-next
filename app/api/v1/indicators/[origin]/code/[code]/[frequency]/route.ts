import { NextRequest, NextResponse } from 'next/server'
import { http } from '@/lib/http'

type Params = {
  origin: string,
  code: string,
  frequency: string
}

export async function GET (
  request: NextRequest,
  context: { params: Promise<Params> }
): Promise<NextResponse> {
  const { origin, code, frequency } = (await context.params)
  const query = request.nextUrl.searchParams
  const from = query.get('from')
  const to = query.get('to')

  if (!from) {
    return NextResponse.json({ error: 'from is required' }, { status: 400 })
  }
  if (!to) {
    return NextResponse.json({ error: 'to is required' }, { status: 400 })
  }

  if (!origin) {
    return NextResponse.json({ error: 'origin is required' }, { status: 400 })
  }
  if (!code) {
    return NextResponse.json({ error: 'code is required' }, { status: 400 })
  }
  if (!frequency) {
    return NextResponse.json({ error: 'frequency is required' }, { status: 400 })
  }

  return await http.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/indicators/${origin}/${code}/${frequency}?from=${from}&to=${to}`)
}
