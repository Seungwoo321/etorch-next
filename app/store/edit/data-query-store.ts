import { IndicatorValues, DataValue, QueryOption } from '@/lib/definitions'
import { create } from 'zustand'
import createSelectors from '@/lib/createSelectors'

type DataQueryStoreState = {
  openPanels: string[]
  items: QueryOption[]
  indicators: IndicatorValues
  dataValues: Record<string, DataValue[]>
  dataUnits: string[]
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
  setDataUnits: () => void
  setChartData: () => void
}

type CombineData = Record<string, DataValue>
const combineData = (items: QueryOption[], dataValues: Record<string, DataValue[]>): DataValue[] => {
  const combinedData: CombineData = {}
  items
    .forEach((panel) => {
      dataValues[panel.id].forEach(item => {
        if (!(item.date in combinedData)) {
          combinedData[item.date] = {
            date: item.date,
            [panel.code]: 0
          }
        }
        combinedData[item.date][panel.code] = item.value
      })
    })
  return Object.values(combinedData)
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
  dataUnits: [],
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
  setDataUnits: () => set((state) => ({
    dataUnits: state.items
      .filter(item => state.dataValues[item.id])
      .reduce((acc, cur) => {
        if (!acc.includes(cur.unit)) {
          acc.push(cur.unit)
        }
        return acc
      }, [] as string[])
  })),
  setDataValues: (id, dataValues) => set((state) => ({
    dataValues: {
      ...state.dataValues,
      [id]: dataValues
    }
  })),
  setChartData: () => set((state) => ({
    chartData: combineData(state.items, state.dataValues)
  }))
}))

// export const fetchIndicatorsValuesById = async (id: string, get: () => DataQueryStoreState & DataQueryStoreAction) => {
//   const item = get().items.find((item) => item.id === id)
//   if (item) {
//     const dataValues: DataValue[] = await fetchIndicatorValues(item)
//     get().setDataValues(id, dataValues)
//   }
// }

export const useDataQueryStore = createSelectors(useDataQueryStoreBase)

export default useDataQueryStore
