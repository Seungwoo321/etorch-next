import { IndicatorValues, DataValue, QueryOption } from '@/lib/definitions'
import { create } from 'zustand'
import { useXAxisOptionStore } from './x-axis-option-store'
import { useYAxisOptionStore } from './y-axis-option-store'
import { useYAxisSecondaryOptionStore } from './y-axis-secondary-option-store'
import { useDataQueryStore } from './data-query-store'

type CombineData = Record<string, DataValue>

const generateChartData = ({
  items,
  xAxisDataKey,
  yAxisDataKey,
  yAxisSecondaryDataKey,
  dataValues
}: {
    items: QueryOption[],
    xAxisDataKey: string,
    yAxisDataKey: string,
    yAxisSecondaryDataKey: string,
    dataValues: Record<string, DataValue[]>
}) => {
  const combinedData: CombineData = {}
  items.filter(item => item.code === yAxisDataKey || item.code === yAxisSecondaryDataKey)
    .forEach(panel => {
      dataValues[panel.id].forEach(item => {
        if (!(item[xAxisDataKey] in combinedData)) {
          combinedData[item[xAxisDataKey]] = {
            [xAxisDataKey]: item[xAxisDataKey],
            [panel.code]: 0
          }
        }
        combinedData[item.date][panel.code] = item.value
      })
    })
  return Object.values(combinedData)
}

const useChartDataStore = create((set) => ({
  chartData: [],

  updateChartData: () => {
    const dataValues = useDataQueryStore.use.dataValues()
    const items = useDataQueryStore.use.items()
    const xAxisDataKey = useXAxisOptionStore.use.xAxisDataKey()
    const yAxisDataKey = useYAxisOptionStore.use.yAxisDataKey()
    const yAxisSecondaryDataKey = useYAxisSecondaryOptionStore.use.yAxisSecondaryDataKey()

    const newChartData = generateChartData({
      items,
      xAxisDataKey,
      yAxisDataKey,
      yAxisSecondaryDataKey,
      dataValues
    })
    set({ chartData: newChartData })
  }
}))

// useYAxisStore.subscribe((state) => state.yAxisValue, useChartDataStore.getState().updateChartData)
// useXAxisStore.subscribe((state) => state.xAxisValue, useChartDataStore.getState().updateChartData)
// useDataQueryStore.subscribe((state) => state.queryValue, useChartDataStore.getState().updateChartData)
