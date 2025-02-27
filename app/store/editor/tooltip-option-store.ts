import { create } from 'zustand'
import createSelectors from '@/lib/createSelectors'

type TooltipOptionStoreState = {
  tooltipMode: string
  tooltiMaxWidth: number
  cursorLineStyle: string
  cursorLineStyleWidth: number
  cursorLineStyleDasharray: string
}

type TooltipOptionStoreAction = {
  updateTooltipMode: (tooltipMode: undefined | string) => void
  updateTooltipMaxWidth: (maxWdith: number) => void
  updateCursorLineStyle: (cursorLineStyle: string) => void
  updateCursorLineStyleWidth: (cursorLineStyleWidth: number) => void
  updateCursorLineStyleDasharray: (cursorLineStyleDasharray: string) => void
}
export type TooltipOptionStore = TooltipOptionStoreState & TooltipOptionStoreAction

const initialTooltipOptionState: TooltipOptionStoreState = {
  tooltipMode: 'default',
  tooltiMaxWidth: 160,
  cursorLineStyleWidth: 2,
  cursorLineStyleDasharray: '2 2',
  cursorLineStyle: 'dash'
}

export const useTooltipOptionStoreBase = create<TooltipOptionStore>(set => ({
  ...initialTooltipOptionState,
  updateTooltipMode: tooltipMode => {
    set(() => ({ tooltipMode }))
  },
  updateTooltipMaxWidth: tooltiMaxWidth => {
    set(() => ({ tooltiMaxWidth }))
  },
  updateCursorLineStyle: cursorLineStyle => {
    set(() => ({ cursorLineStyle }))
  },
  updateCursorLineStyleWidth: cursorLineStyleWidth => {
    set(() => ({ cursorLineStyleWidth }))
  },
  updateCursorLineStyleDasharray: cursorLineStyleDasharray => {
    set(() => ({ cursorLineStyleDasharray }))
  }
}))

export const useTooltipOptionStore = createSelectors(useTooltipOptionStoreBase)

export default useTooltipOptionStore
