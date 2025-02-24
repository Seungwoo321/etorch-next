import { useTooltipOptionStore } from '@/store/edit'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import NumberInputForm from '../form/number-input-form'

import { useMemo, type JSX } from 'react'
import ToggleGroupForm from '../form/toggle-group-form'

function SelectionTooltip (): JSX.Element {
  const tooltipMode = useTooltipOptionStore.use.tooltipMode()
  const tooltiMaxWidth = useTooltipOptionStore.use.tooltiMaxWidth()
  const cursorLineStyleWidth = useTooltipOptionStore.use.cursorLineStyleWidth()
  const cursorLineStyleDasharray = useTooltipOptionStore.use.cursorLineStyleDasharray()
  const cursorLineStyle = useTooltipOptionStore.use.cursorLineStyle()
  const updateTooltipMode = useTooltipOptionStore.use.updateTooltipMode()
  const updateTooltipMaxWidth = useTooltipOptionStore.use.updateTooltipMaxWidth()
  const updateCursorLineStyle = useTooltipOptionStore.use.updateCursorLineStyle()
  const updateCursorLineStyleWidth = useTooltipOptionStore.use.updateCursorLineStyleWidth()
  const updateCursorLineStyleDasharray = useTooltipOptionStore.use.updateCursorLineStyleDasharray()
  const tooltipModeIsHidden = tooltipMode === 'hidden'
  const tooltipModeOptions = useMemo(() => [
    {
      label: 'Default',
      value: 'default'
    },
    {
      label: 'Active',
      value: 'active'
    },
    {
      label: 'Hidden',
      value: 'hidden'
    }
  ], [])
  const cursorStyleOptions = useMemo(() => [
    {
      label: 'Solid',
      value: 'solid'
    },
    {
      label: 'Dash',
      value: 'dash'
    }
  ], [])
  return (
    <div className='space-y-2 pl-2 pr-1'>
      <ToggleGroupForm
        label='Tooltip mode'
        id='tooltip-mode'
        value={tooltipMode}
        options={tooltipModeOptions}
        handleValueChange={updateTooltipMode}
      />
      <NumberInputForm
        label='Max width'
        id='tooltip-max-width'
        value={tooltiMaxWidth}
        handleInputChange={updateTooltipMaxWidth}
        hidden={tooltipModeIsHidden}
      />
      <ToggleGroupForm
        label='Cursor style'
        id='cursor-style'
        value={cursorLineStyle}
        options={cursorStyleOptions}
        handleValueChange={updateCursorLineStyle}
        hidden={tooltipModeIsHidden}
      >
        {cursorLineStyle === 'dash' && (
          <Select
            onValueChange={updateCursorLineStyleDasharray}
            value={cursorLineStyleDasharray}
          >
            <SelectTrigger>
              <SelectValue defaultValue='2 2' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1 1'>1, 1</SelectItem>
              <SelectItem value='2 2'>2, 2</SelectItem>
              <SelectItem value='3 3'>3, 3</SelectItem>
              <SelectItem value='4 4'>4, 4</SelectItem>
              <SelectItem value='5 5'>5, 5</SelectItem>
            </SelectContent>
          </Select>
        )}
      </ToggleGroupForm>
      <NumberInputForm
        label='Cursor width'
        id='tooltip-cursor-width'
        max={10}
        value={cursorLineStyleWidth}
        handleInputChange={updateCursorLineStyleWidth}
        hidden={tooltipModeIsHidden}
      />
    </div>
  )
}

export default SelectionTooltip
