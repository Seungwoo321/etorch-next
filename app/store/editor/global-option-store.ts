import { create } from 'zustand'
import createSelectors from '@/lib/createSelectors'
import { TFrequency, TTimeRange } from '@/lib/definitions'

type GlobalOptionStoreState = {
  frequency: TFrequency
  isTableView: boolean
  timeRagne: TTimeRange
}

type GlobalOptionStoreAction = {
  setFrequency: (frequency: TFrequency) => void;
  setIsTableView: (isTableView: boolean) => void;
  setTimeRange: (timeRange: TTimeRange) => void;
}

export type GlobalOptionStore = GlobalOptionStoreState & GlobalOptionStoreAction

const initialGlobalOptionState: GlobalOptionStoreState = {
  frequency: 'M',
  isTableView: false,
  timeRagne: {
    to: '',
    from: ''
  }
}

const useGlobalOptionStoreBase = create<GlobalOptionStore>()((set) => ({
  ...initialGlobalOptionState,
  setFrequency: (frequency) => {
    set(() => ({
      frequency
    }))
  },
  setIsTableView: (isTableView) => {
    set(() => ({
      isTableView
    }))
  },
  setTimeRange: (timeRange: TTimeRange) => {
    set(() => ({
      timeRagne: timeRange
    }))
  }
}))

export const useGlobalOptionStore = createSelectors(useGlobalOptionStoreBase)

export default useGlobalOptionStore
