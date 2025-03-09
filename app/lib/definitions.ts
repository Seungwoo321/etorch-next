export type TFrequency = 'A' | 'Q' | 'M' | 'D'

export type TDataValue = Record<string, string | number>

export interface IIndicator {
  code: string
  name: string
  description: string
  origin: string
  unit: string
  frequencies: TFrequency[]
}

export interface IIndicatorWithTimeSeries extends IIndicator {
  timeSeries: TDataValue[]
}

export type TResponseIndicatorData = {
  success: boolean
  data: IIndicatorWithTimeSeries
}

export interface IIndicatorValuesParamss {
  origin: string
  code: string
  frequency: string
}

export type TIndicatorValues = IIndicator[]

export interface IDataPanelItem {
  id: number
  origin: string
  indicatorCode: string
  frequency: string
  unit: string
  data: TDataValue[]
}

export type TQueryOption = {
  id: string
  origin: string
  code: string
  unit: string
}

export type TDataSourceOption = {
  [key: string]: string
}

export type TTimeRange = {
  to: string,
  from: string
}
