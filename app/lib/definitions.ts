export interface Indicator {
  origin: string
  name: string
  description: string
  unit_ko: string
  unit_en: string
  code: string
  hasMonth: boolean
  hasQuarter: boolean
  hasYear: boolean
  hasDay: boolean
}

export type DataValue = Record<string, string | number>

export interface IndicatorValuesParamss {
  origin: string
  code: string
  frequency: string
}

export type IndicatorValues = {
  [key in 'kosis' | 'ecos' | 'oecd']: Indicator[]
}

export interface DataPanelItem {
  id: number
  isOpen: boolean
  origin: string
  indicatorCode: string
  frequency: string
  unit: string
  data: DataValue[]
}

export type Frequency = 'A' | 'Q' | 'M' | 'D'

export type QueryOption = {
  id: string
  origin: string
  code: string
  unit: string
}
