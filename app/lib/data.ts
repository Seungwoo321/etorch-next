import { IIndicatorWithTimeSeries, TIndicatorValues, TResponseIndicatorData } from '@/lib/definitions'

export async function fetchAllIndicatorsByFrequency (frequency: string): Promise<TIndicatorValues> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/indicators?frequency=${frequency}`)
    const indicators = await res.json()
    return indicators.data as TIndicatorValues
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
  }): Promise<IIndicatorWithTimeSeries> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/origins/${origin}/data/${code}?frequency=${frequency}&from=${from}&to=${to}`)
    const result = await res.json() as TResponseIndicatorData
    return result.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch indicator values')
  }
}
