export interface IIndicator {
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

export type TDataValue = Record<string, string | number>

export interface IIndicatorValuesParamss {
  origin: string
  code: string
  frequency: string
}

export type TIndicatorValues = {
  [key: string]: IIndicator[]
}

export interface IDataPanelItem {
  id: number
  origin: string
  indicatorCode: string
  frequency: string
  unit: string
  data: TDataValue[]
}

export type TFrequency = 'A' | 'Q' | 'M' | 'D'

export type TQueryOption = {
  id: string
  origin: string
  code: string
  unit: string
}

export type TDataSourceOption = {
  name: string
  value: string
}

export type TTimeRange = {
  to: string,
  from: string
}
