'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { usePanelOptionStore } from '@/store/edit'
import SwitchForm from '../form/switch-form'

function SelectionPanel (): JSX.Element {
  const title = usePanelOptionStore.use.title()
  const description = usePanelOptionStore.use.description()
  const isTransparentBackground = usePanelOptionStore.use.isTransparentBackground()
  const updateTitle = usePanelOptionStore.use.updateTitle()
  const updateDescription = usePanelOptionStore.use.updateDescription()
  const updateIsTransparentBackground = usePanelOptionStore.use.updateIsTransparentBackground()
  return (
    <div className="space-y-2 pl-2 pr-1">
      <div className="grid w-full max-w-sm items-center gap-1.5 ">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          className="sm"
          value={title}
          onInput={(e) => { updateTitle(e.currentTarget.value) }}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onInput={(e) => { updateDescription(e.currentTarget.value) }}
        />
      </div>
      <SwitchForm
        label="Transparent background"
        id="transparent-background"
        checked={isTransparentBackground}
        handleCheckedChange={updateIsTransparentBackground}
      />
    </div>
  )
}

export default SelectionPanel
