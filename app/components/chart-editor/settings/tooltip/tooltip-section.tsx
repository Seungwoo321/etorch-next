import { useTooltipOptionStore } from '@/store/editor'
import { NumberInputFormField, ToggleGroupFormField } from '../form-field'
import { useMemo } from 'react'
import DashSelect from './dash-select'

function SelectionTooltip () {
  const tooltipMode = useTooltipOptionStore.use.tooltipMode()
  const tooltiMaxWidth = useTooltipOptionStore.use.tooltiMaxWidth()
  const cursorLineStyleWidth = useTooltipOptionStore.use.cursorLineStyleWidth()
  const cursorLineStyle = useTooltipOptionStore.use.cursorLineStyle()
  const updateTooltipMode = useTooltipOptionStore.use.updateTooltipMode()
  const updateTooltipMaxWidth = useTooltipOptionStore.use.updateTooltipMaxWidth()
  const updateCursorLineStyle = useTooltipOptionStore.use.updateCursorLineStyle()
  const updateCursorLineStyleWidth = useTooltipOptionStore.use.updateCursorLineStyleWidth()
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
      <ToggleGroupFormField
        label='Tooltip mode'
        id='tooltip-mode'
        value={tooltipMode}
        options={tooltipModeOptions}
        handleValueChange={updateTooltipMode}
      />
      <NumberInputFormField
        label='Max width'
        id='tooltip-max-width'
        value={tooltiMaxWidth}
        handleInputChange={updateTooltipMaxWidth}
        hidden={tooltipModeIsHidden}
      />
      <ToggleGroupFormField
        label='Cursor style'
        id='cursor-style'
        value={cursorLineStyle}
        options={cursorStyleOptions}
        handleValueChange={updateCursorLineStyle}
        hidden={tooltipModeIsHidden}
      >
        <DashSelect cursorLineStyle={cursorLineStyle} />
      </ToggleGroupFormField>
      <NumberInputFormField
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
