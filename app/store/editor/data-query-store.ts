import { TIndicatorValues, TDataValue, TQueryOption } from '@/lib/definitions'
import { create } from 'zustand'
import createSelectors from '@/lib/createSelectors'

type DataQueryStoreState = {
  items: TQueryOption[]
  indicators: TIndicatorValues
  rawData: TDataValue[][]
  mergedData: TDataValue[];
}

type DataQueryStoreAction = {
  addItem: (item: TQueryOption) => void;
  updateItem: (id: string, newItem: Partial<TQueryOption>) => void;
  removeItem: (id: string) => void;
  setIndicators: (Indicators: TIndicatorValues) => void;
  addRawData: (dataValues: TDataValue[]) => void;
  removeRawData: (code: string) => void
}

export type DataQueryStore = DataQueryStoreState & DataQueryStoreAction

const initialDataQueryState: DataQueryStoreState = {
  items: [],
  indicators: {
    kosis: [],
    ecos: [],
    oecd: []
  },
  rawData: [],
  mergedData: []
}

const useDataQueryStoreBase = create<DataQueryStore>()((set) => ({
  ...initialDataQueryState,
  addItem: (item) => {
    set((state) => ({ items: [...state.items, item] }))
  },
  updateItem: (id, newItem) => {
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, ...newItem } : item))
    }))
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    }))
  },
  setIndicators: (indicators) => set(() => ({
    indicators
  })),
  addRawData: (data) => {
    set((state) => ({
      rawData: [...state.rawData.filter((item) => item[0].code !== data[0].code), data]
    }))
    set((state) => ({
      mergedData: mergeDatasets(state.rawData)
    }))
  },
  removeRawData: (code) => {
    set((state) => ({
      rawData: [...state.rawData.filter(item => item[0].code !== code)]
    }))
    set((state) => ({
      mergedData: mergeDatasets(state.rawData)
    }))
  }
}))
function mergeDatasets (rawData: TDataValue[][]): TDataValue[] {
  const merged: Record<string, TDataValue> = {}
  rawData.forEach((dataValues) => {
    dataValues.forEach(({ date, code, value }) => {
      merged[date] = {
        ...merged[date],
        date,
        ...(value !== undefined ? { [code]: value } : {})
      }
    })
  })
  return Object.values(merged)
}

export const useDataQueryStore = createSelectors(useDataQueryStoreBase)

export default useDataQueryStore
