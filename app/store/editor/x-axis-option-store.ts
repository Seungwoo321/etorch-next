import { create } from 'zustand'
import createSelectors from '@/lib/createSelectors'

type XAxisOptionStoreState = {
  xAxisDataKey: string
  xAxisVisibility: boolean
  xAxisType: 'number' | 'category' | undefined
  xAxisTickCount: number
  xAxisTickSize: number
  xAxisTickAngle: number
  xAxisDomainMin: number | 'auto'
  xAxisDomainMax: number | 'auto'
  xAxisAxisLine: boolean
  xAxisTickLine: boolean
  xAxisColor: string
}

type XAxisOptionStoreAction = {
  updateXAxisDataKey: (xAxisDataKey: string) => void
  updateXAxisVisibility: (xAxisVisibility: boolean) => void
  updateXAxisType: (xAxisType: 'number' | 'category' | undefined) => void
  updateXAxisTickCount: (xAxisTickCount: number) => void
  updateXAxisTickSize: (xAxisTickSize: number) => void
  updateXAxisTickAngle: (xAxisTickAngle: number) => void
  updateXAxisDomainMin: (xAxisDomainMin: number | 'auto') => void
  updateXAxisDomainMax: (xAxisDomainMax: number | 'auto') => void
  updateXAxisAxisLine: (xAxisAxisLine: boolean) => void
  updateXAxisTickLine: (xAxisTickLine: boolean) => void
  updateXAxisColor: (xAxisColor: string) => void
}

export type XAxisOptionStore = XAxisOptionStoreState & XAxisOptionStoreAction

const initialXAxisOptionState: XAxisOptionStoreState = {
  xAxisDataKey: 'date',
  xAxisVisibility: true,
  xAxisType: 'category',
  xAxisTickCount: 5,
  xAxisTickSize: 6,
  xAxisTickAngle: 0,
  xAxisDomainMin: 0,
  xAxisDomainMax: 'auto',
  xAxisAxisLine: true,
  xAxisTickLine: true,
  xAxisColor: 'var(--muted-foreground)'
}

export const useXAxisOptionStoreBase = create<XAxisOptionStore>(set => ({
  ...initialXAxisOptionState,
  updateXAxisDataKey: xAxisDataKey => {
    set(() => ({ xAxisDataKey }))
  },
  updateXAxisVisibility: xAxisVisibility => {
    set(() => ({ xAxisVisibility }))
    if (!xAxisVisibility) {
      set(() => ({ xAxisDataKey: '' }))
    }
  },
  updateXAxisTickCount: xAxisTickCount => {
    set(() => ({ xAxisTickCount }))
  },
  updateXAxisType: xAxisType => {
    set(() => ({
      xAxisDomainMin: 0,
      xAxisDomainMax: 'auto'
    }))
    set(() => ({ xAxisType }))
  },
  updateXAxisTickSize: xAxisTickSize => {
    set(() => ({ xAxisTickSize }))
  },
  updateXAxisTickAngle: xAxisTickAngle => {
    set(() => ({ xAxisTickAngle }))
  },
  updateXAxisDomainMin: xAxisDomainMin => {
    set(() => ({ xAxisDomainMin }))
  },
  updateXAxisDomainMax: xAxisDomainMax => {
    set(() => ({ xAxisDomainMax: xAxisDomainMax === 0 ? 'auto' : xAxisDomainMax }))
  },
  updateXAxisAxisLine: xAxisAxisLine => {
    set(() => ({ xAxisAxisLine }))
  },
  updateXAxisTickLine: xAxisTickLine => {
    set(() => ({ xAxisTickLine }))
  },
  updateXAxisColor: xAxisColor => {
    set(() => ({ xAxisColor }))
  }
}))

export const useXAxisOptionStore = createSelectors(useXAxisOptionStoreBase)

export default useXAxisOptionStore
