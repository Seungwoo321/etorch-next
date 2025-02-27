import { create } from 'zustand'
import createSelectors from '@/lib/createSelectors'

type PanelOptionStoreStaet = {
  title: string
  description: string
  isTransparentBackground: boolean
}

type PanelOptionStoreAction = {
  updateTitle: (title: string) => void
  updateDescription: (description: string) => void
  updateIsTransparentBackground: (isTransparentBackground: boolean) => void
}

export type PanelOptionStore = PanelOptionStoreStaet & PanelOptionStoreAction

const initailPanelOptionState: PanelOptionStoreStaet = {
  title: 'Title',
  description: 'description',
  isTransparentBackground: false
}

export const usePanelOptionStoreBase = create<PanelOptionStore>(set => ({
  ...initailPanelOptionState,
  updateTitle: title => {
    set(() => ({ title }))
  },
  updateDescription: description => {
    set(() => ({ description }))
  },
  updateIsTransparentBackground: isTransparentBackground => {
    set(() => ({ isTransparentBackground }))
  }
}))

export const usePanelOptionStore = createSelectors(usePanelOptionStoreBase)

export default usePanelOptionStore
