import { create } from 'zustand'
import createSelectors from '../../lib/createSelectors'

type YAxisSecondaryOptionStoreState = {
  yAxisSecondaryUnit: string
  yAxisSecondaryDataKey: string
  yAxisSecondaryVisibility: boolean
  yAxisSecondaryType: 'number' | 'category' | undefined
  yAxisSecondaryTickCount: number
  yAxisSecondaryTickSize: number
  yAxisSecondaryDomainMin: number | 'auto'
  yAxisSecondaryDomainMax: number | 'auto'
  yAxisSecondaryAxisLine: boolean
  yAxisSecondaryTickLine: boolean
  yAxisSecondaryColor: string
}

type YAxisSecondaryOptionStoreAction = {
  updateYAxisSecondaryUnit: (yAxisUnit: string) => void
  updateYAxisSecondaryDataKey: (yAxisDataKey: string) => void
  updateYAxisSecondaryVisibility: (yAxisVisibility: boolean) => void
  updateYAxisSecondaryType: (yAxisType: 'number' | 'category' | undefined) => void
  updateYAxisSecondaryTickCount: (yAxisTickCount: number) => void
  updateYAxisSecondaryTickSize: (yAxisTickSize: number) => void
  updateYAxisSecondaryDomainMin: (yAxisDomainMin: number | 'auto') => void
  updateYAxisSecondaryDomainMax: (yAxisDomainMax: number | 'auto') => void
  updateYAxisSecondaryAxisLine: (yAxisAxisLine: boolean) => void
  updateYAxisSecondaryTickLine: (yAxisTickLine: boolean) => void
  updateYAxisSecondaryColor: (yAxisColor: string) => void
}

export type YAxisSecondaryOptionStore = YAxisSecondaryOptionStoreState & YAxisSecondaryOptionStoreAction

const initialYAxisSecondaryOptionState: YAxisSecondaryOptionStoreState = {
  yAxisSecondaryUnit: '',
  yAxisSecondaryDataKey: '',
  yAxisSecondaryVisibility: false,
  yAxisSecondaryType: 'number',
  yAxisSecondaryTickCount: 5,
  yAxisSecondaryTickSize: 6,
  yAxisSecondaryDomainMin: 0,
  yAxisSecondaryDomainMax: 'auto',
  yAxisSecondaryAxisLine: true,
  yAxisSecondaryTickLine: true,
  yAxisSecondaryColor: 'var(--muted-foreground)'
}

export const useYAxisSecondaryOptionStoreBase = create<YAxisSecondaryOptionStore>(set => ({
  ...initialYAxisSecondaryOptionState,
  updateYAxisSecondaryUnit: yAxisSecondaryUnit => {
    set(() => ({ yAxisSecondaryUnit }))
  },
  updateYAxisSecondaryDataKey: yAxisSecondaryDataKey => {
    set(() => ({ yAxisSecondaryDataKey }))
  },
  updateYAxisSecondaryVisibility: yAxisSecondaryVisibility => {
    set(() => ({ yAxisSecondaryVisibility }))
  },
  updateYAxisSecondaryType: yAxisSecondaryType => {
    set(() => ({ yAxisSecondaryType }))
  },
  updateYAxisSecondaryTickCount: yAxisSecondaryTickCount => {
    set(() => ({ yAxisSecondaryTickCount }))
  },
  updateYAxisSecondaryTickSize: yAxisSecondaryTickSize => {
    set(() => ({ yAxisSecondaryTickSize }))
  },
  updateYAxisSecondaryDomainMin: yAxisSecondaryDomainMin => {
    set(() => ({ yAxisSecondaryDomainMin }))
  },
  updateYAxisSecondaryDomainMax: yAxisSecondaryDomainMax => {
    set(() => ({ yAxisSecondaryDomainMax }))
  },
  updateYAxisSecondaryAxisLine: yAxisSecondaryAxisLine => {
    set(() => ({ yAxisSecondaryAxisLine }))
  },
  updateYAxisSecondaryTickLine: yAxisSecondaryTickLine => {
    set(() => ({ yAxisSecondaryTickLine }))
  },
  updateYAxisSecondaryColor: yAxisSecondaryColor => {
    set(() => ({ yAxisSecondaryColor }))
  }
}))

export const useYAxisSecondaryOptionStore = createSelectors(useYAxisSecondaryOptionStoreBase)

export default useYAxisSecondaryOptionStore
