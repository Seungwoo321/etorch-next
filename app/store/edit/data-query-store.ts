import { IndicatorValues, DataValue, QueryOption } from '@/lib/definitions'
import { create } from 'zustand'
import createSelectors from '@/lib/createSelectors'

type DataQueryStoreState = {
  openPanels: string[]
  items: QueryOption[]
  indicators: IndicatorValues
  dataValues: Record<string, DataValue[]>
  unitDataKeyList: Record<string, string[]>
  chartData: DataValue[];
}

type DataQueryStoreAction = {
  openPanel: (id: string) => void;
  closePanel: (id: string) => void;
  addItem: (item: QueryOption) => void;
  updateItem: (id: string, newItem: Partial<QueryOption>) => void;
  removeItem: (id: string) => void;
  removeDataValues: (id: string) => void;
  clearPanels: () => void;
  setIndicators: (Indicators: IndicatorValues) => void;
  setDataValues: (id: string, dataValues: DataValue[]) => void;
  setChartData: (selectedItem: QueryOption, xAxisDataKey: string) => void
  setUnitDataKeyList: (unit: string, keys: string[]) => void,
  removeUnitDataKeyList: (unit: string, code: string) => void
}

// type CombineData = Record<string, DataValue>
const combineData = (item: QueryOption, xAxisDataKey: string = 'date', state: DataQueryStoreState): DataValue[] => {
  const mergedDataMap: Map<string | number, DataValue> = new Map()
  if (state.chartData.length) {
    state.chartData.forEach(item => {
      mergedDataMap.set(item[xAxisDataKey], { ...item })
    })
  }

  const newData = state.dataValues[item.id] ?? []
  console.log('newData', newData)
  console.log('xAxisDataKey', xAxisDataKey)

  const newKey = item.code
  newData.forEach(dataValue => {
    console.log(dataValue[xAxisDataKey])
    if (!mergedDataMap.has(dataValue[xAxisDataKey])) {
      mergedDataMap.set(dataValue[xAxisDataKey], {
        [xAxisDataKey]: dataValue[xAxisDataKey]
      })
    }
    mergedDataMap.get(dataValue[xAxisDataKey])![newKey] = dataValue.value
  })
  return Array.from(mergedDataMap.values()).sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
}

export type DataQueryStore = DataQueryStoreState & DataQueryStoreAction

const initialDataQueryState: DataQueryStoreState = {
  openPanels: [],
  items: [],
  indicators: {
    kosis: [],
    ecos: [],
    oecd: []
  },
  dataValues: {},
  unitDataKeyList: {},
  chartData: []
}

const useDataQueryStoreBase = create<DataQueryStore>()((set) => ({
  ...initialDataQueryState,
  openPanel: (id) => set((state) => ({
    openPanels: [...state.openPanels, id]
  })),
  closePanel: (id) => set((state) => ({
    openPanels: state.openPanels.filter(panelId => panelId !== id)
  })),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (id, newItem) => set((state) => ({
    items: state.items.map((item) => (item.id === id ? { ...item, ...newItem } : item))
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)

  })),
  removeDataValues: (id) => set((state) => ({
    dataValues: state.items.reduce<Record<string, DataValue[]>>((acc, cur) => {
      if (cur.id !== id) {
        acc[cur.id] = state.dataValues[cur.id]
      }
      return acc
    }, {})
  })),
  clearPanels: () => set(() => ({
    ...initialDataQueryState
  })),
  setIndicators: (indicators) => set(() => ({
    indicators
  })),
  setDataValues: (id, dataValues) => set((state) => ({
    dataValues: {
      ...state.dataValues,
      [id]: dataValues
    }
  })),
  setChartData: (selectedItem, xAxisDataKey) => set((state) => ({
    chartData: combineData(selectedItem, xAxisDataKey === '' ? 'date' : xAxisDataKey, state)
  })),
  setUnitDataKeyList: (unit, keys) => set((state) => ({
    unitDataKeyList: {
      ...state.unitDataKeyList,
      [unit]: Array.from(new Set([...state.unitDataKeyList[unit] ?? [], ...keys]))
    }
  })),
  removeUnitDataKeyList: (unit, code) => set((state) => ({
    unitDataKeyList: {
      ...state.unitDataKeyList,
      [unit]: Array.from(new Set((state.unitDataKeyList[unit] ?? []).filter(key => key !== code)))
    }
  }))
}))

export const useDataQueryStore = createSelectors(useDataQueryStoreBase)

export default useDataQueryStore
