import { DataValue, Indicator, IndicatorValues } from '@/lib/definitions'
export async function fetchIndicatorByOrigin (origin: string, frequency: string): Promise<Indicator[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/indicators/${origin}/${frequency}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error('API Call Error:', error)
    throw new Error('Failed to fetch indicator by origin.')
  }
}
export async function fetchAllIndicatorsByFrequency (frequency: string): Promise<IndicatorValues> {
  const origins = ['kosis', 'ecos', 'oecd']
  try {
    const indicators = await Promise.all(origins.map(origin => fetchIndicatorByOrigin(origin, frequency)))
    return Object.fromEntries(origins.map((origin, index) => [origin, indicators[index]])) as IndicatorValues
  } catch (error) {
    console.error('API Call Error:', error)
    throw new Error('Failed to fetch all indicators')
  }
}

export async function fetchIndicatorValues ({
  origin,
  code,
  frequency,
  timeRagne: {
    to, from
  }
}: {
  origin: string,
  code: string,
  frequency: string,
  timeRagne: {
    to: string,
    from: string
  }
}): Promise<DataValue[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/indicators/${origin}/code/${code}/${frequency}?from=${from}&to=${to}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch indicator values')
  }
}
