// import { DataPanelItem, QueryOption } from '@/lib/definitions'
import {
  type DataQueryStore,
  type TooltipOptionStore
} from './'

// const dataMapReducer = (acc: Record<string, DataPanelItem[]>, cur: DataPanelItem) => {
//   if (!(cur.unit in acc)) {
//     acc = {
//       ...acc,
//       [cur.unit]: []
//     }
//   }
//   acc[cur.unit].push(cur)
//   return acc
// }

/** YAxisOptionStore */
/** XAxisOptionStore */

/** DataQueryStore */
export const selectUniqueDataKeys = (state: DataQueryStore): string[] => state.items.map(queryOption => queryOption.id)
// export const selectPanelById = (id: number) => (state: DataQueryStore) => state.panels.find(panel => panel.id === id)
// export const selectPanelDataMapByUnit = (state: DataQueryStore) => state.panels.filter(panel => panel.frequency === state.frequency && panel.unit).reduce<Record<string, DataPanelItem[]>>(dataMapReducer, {})
// export const selectPanelsData = (state: DataQueryStore): DataQueryStore['panels'] => state.panels.filter(panel => (panel.data.length > 0) && panel.frequency === state.frequency)
// export const selectPanelsDataByUnit = (unit: string) => (state: DataQueryStore): DataQueryStore['panels'] => state.panels.filter(panel => (panel.data.length > 0) && panel.frequency === state.frequency && panel.unit === unit)
// export const selectPanelsAllData = (state: DataQueryStore): DataQueryStore['panels'] => state.panels.filter(panel => panel.data.length)
// export const selectPanelIds = (state: DataQueryStore): number[] => state.panels.map(panel => panel.id)

/** TooltipOptionStore */
export const selectTooltipMode = (state: TooltipOptionStore): string => state.tooltipMode

/** LegendOptionStore */

/** PanelOptionStore */

/** GraphStylesOptionStore */
