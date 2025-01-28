import { type VerticalAlignmentType, type HorizontalAlignmentType } from 'recharts/types/component/DefaultLegendContent'
import { type LayoutType } from 'recharts/types/util/types'
import { create } from 'zustand'
import createSelectors from '../../lib/createSelectors'

type LegendOptionStoreState = {
  legendVisibility: boolean
  legendLayout: LayoutType
  legendAlign: HorizontalAlignmentType
  legendVerticalAlign: VerticalAlignmentType
}

type LegendOptionStoreAction = {
  updateLegendVisibility: (visibility: boolean) => void
  updateLegendLayout: (layout: LayoutType) => void
  updateLegendAlign: (align: HorizontalAlignmentType) => void
  updateLegendVerticalAlign: (verticalAlign: VerticalAlignmentType) => void
}

export type LegendOptionStore = LegendOptionStoreState & LegendOptionStoreAction

const initialLegendOptionState: LegendOptionStoreState = {
  legendVisibility: true,
  legendLayout: 'horizontal',
  legendAlign: 'left',
  legendVerticalAlign: 'bottom'
}

export const useLegendOptionStoreBase = create<LegendOptionStore>(set => ({
  ...initialLegendOptionState,
  updateLegendVisibility: (legendVisibility) => {
    set(() => ({ legendVisibility }))
  },
  updateLegendLayout: (legendLayout) => {
    set(() => ({ legendLayout }))
  },
  updateLegendAlign: (legendAlign) => {
    set(() => ({ legendAlign }))
  },
  updateLegendVerticalAlign: (legendVerticalAlign) => {
    set(() => ({ legendVerticalAlign }))
  }
}))

export const useLegendOptionStore = createSelectors(useLegendOptionStoreBase)

export default useLegendOptionStore
