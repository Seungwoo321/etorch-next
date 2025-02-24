'use client'
import { usePanelOptionStore } from '@/store/edit'
import SwitchForm from '../form/switch-form'
import TextInputForm from '../form/text-input-form'

import type { JSX } from 'react'
import TextAreaForm from '../form/text-area-form'

function SelectionPanel (): JSX.Element {
  const title = usePanelOptionStore.use.title()
  const description = usePanelOptionStore.use.description()
  const isTransparentBackground = usePanelOptionStore.use.isTransparentBackground()
  const updateTitle = usePanelOptionStore.use.updateTitle()
  const updateDescription = usePanelOptionStore.use.updateDescription()
  const updateIsTransparentBackground = usePanelOptionStore.use.updateIsTransparentBackground()
  return (
    <div className='space-y-2 pl-2 pr-1'>
      <TextInputForm
        label='Title'
        id='title'
        value={title}
        handleInputChange={updateTitle}
      />
      <TextAreaForm
        label='Description'
        id='description'
        value={description}
        handleInputChange={updateDescription}
      />
      <SwitchForm
        label='Transparent background'
        id='transparent-background'
        checked={isTransparentBackground}
        handleCheckedChange={updateIsTransparentBackground}
      />
    </div>
  )
}

export default SelectionPanel
