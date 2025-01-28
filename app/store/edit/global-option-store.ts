import { create } from 'zustand'
import createSelectors from '@/lib/createSelectors'
import { Frequency } from '@/lib/definitions'

type TimeRange = {
  to: string,
  from: string
}

type GlobalOptionStoreState = {
  frequency: Frequency
  isTableView: boolean
  timeRagne: TimeRange
}

type GlobalOptionStoreAction = {
  setFrequency: (frequency: Frequency) => void;
  setIsTableView: (isTableView: boolean) => void;
  setTimeRange: (timeRange: TimeRange) => void;
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
  setTimeRange: (timeRange: TimeRange) => {
    set(() => ({
      timeRagne: timeRange
    }))
  }
}))

export const useGlobalOptionStore = createSelectors(useGlobalOptionStoreBase)

export default useGlobalOptionStore
