import { create } from 'zustand'
import createSelectors from '../../lib/createSelectors'

export interface XAxisOptionStore {
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

export const useXAxisOptionStoreBase = create<XAxisOptionStore>(set => ({
  xAxisDataKey: '',
  xAxisVisibility: true,
  xAxisType: 'category',
  xAxisTickCount: 5,
  xAxisTickSize: 6,
  xAxisTickAngle: 0,
  xAxisDomainMin: 0,
  xAxisDomainMax: 'auto',
  xAxisAxisLine: true,
  xAxisTickLine: true,
  xAxisColor: 'hsl(var(--muted-foreground))',
  updateXAxisDataKey: xAxisDataKey => { set(() => ({ xAxisDataKey })) },
  updateXAxisVisibility: xAxisVisibility => { set(() => ({ xAxisVisibility })) },
  updateXAxisTickCount: xAxisTickCount => { set(() => ({ xAxisTickCount })) },
  updateXAxisType: xAxisType => { set(() => ({ xAxisType })) },
  updateXAxisTickSize: xAxisTickSize => { set(() => ({ xAxisTickSize })) },
  updateXAxisTickAngle: xAxisTickAngle => { set(() => ({ xAxisTickAngle })) },
  updateXAxisDomainMin: xAxisDomainMin => { set(() => ({ xAxisDomainMin })) },
  updateXAxisDomainMax: xAxisDomainMax => { set(() => ({ xAxisDomainMax })) },
  updateXAxisAxisLine: xAxisAxisLine => { set(() => ({ xAxisAxisLine })) },
  updateXAxisTickLine: xAxisTickLine => { set(() => ({ xAxisTickLine })) },
  updateXAxisColor: xAxisColor => { set(() => ({ xAxisColor })) }
}))

export const useXAxisOptionStore = createSelectors(useXAxisOptionStoreBase)

export default useXAxisOptionStore