import { IndicatorValues, DataValue, QueryOption } from '@/lib/definitions'
import { create } from 'zustand'
import createSelectors from '@/lib/createSelectors'

type DataQueryStoreState = {
  items: QueryOption[]
  indicators: IndicatorValues
  rawData: DataValue[][]
  mergedData: DataValue[];
}

type DataQueryStoreAction = {
  addItem: (item: QueryOption) => void;
  updateItem: (id: string, newItem: Partial<QueryOption>) => void;
  removeItem: (id: string) => void;
  setIndicators: (Indicators: IndicatorValues) => void;
  addRawData: (dataValues: DataValue[]) => void;
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
function mergeDatasets (rawData: DataValue[][]): DataValue[] {
  const merged: Record<string, DataValue> = {}
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
