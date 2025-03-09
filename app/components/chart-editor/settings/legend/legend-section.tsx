import { useLegendOptionStore } from '@/store/editor'
import type { HorizontalAlignmentType, VerticalAlignmentType } from 'recharts/types/component/DefaultLegendContent'
import type { LayoutType } from 'recharts/types/util/types'
import { SwitchFormField, ToggleGroupFormField } from '../form-field'
import { useMemo } from 'react'

function LegendSection () {
  const legendVisibility = useLegendOptionStore.use.legendVisibility()
  const legendLayout = useLegendOptionStore.use.legendLayout()
  const legendAlign = useLegendOptionStore.use.legendAlign()
  const legendVerticalAlign = useLegendOptionStore.use.legendVerticalAlign()
  const updateLegendVisibility = useLegendOptionStore.use.updateLegendVisibility()
  const updateLegendLayout = useLegendOptionStore.use.updateLegendLayout()
  const updateLegendAlign = useLegendOptionStore.use.updateLegendAlign()
  const updateLegendVerticalAlign = useLegendOptionStore.use.updateLegendVerticalAlign()
  const legendLayoutOptions = useMemo(() => ([
    {
      label: 'vertical',
      value: 'vertical'
    },
    {
      label: 'horizontal',
      value: 'horizontal'
    }
  ]), [])
  const legendAlignOptions = useMemo(() => (
    [
      {
        label: 'Left',
        value: 'left'
      },
      {
        label: 'Center',
        value: 'center'
      },
      {
        label: 'Right',
        value: 'right'
      }
    ]
  ), [])
  const legendVerticalAlignOptions = useMemo(() => (
    [
      {
        label: 'Top',
        value: 'top'
      },
      {
        label: 'Middle',
        value: 'middle'
      },
      {
        label: 'Bottom',
        value: 'bottom'
      }
    ]
  ), [])
  return (
    <div className='space-y-2 pl-2 pr-1'>
      <SwitchFormField
        label='Visibility'
        id='legend-visibility'
        checked={legendVisibility}
        handleCheckedChange={updateLegendVisibility}
      />
      <ToggleGroupFormField
        label='Layout'
        id='layout'
        value={legendLayout}
        options={legendLayoutOptions}
        handleValueChange={(value) => updateLegendLayout(value as LayoutType)}
      />
      <ToggleGroupFormField
        label='Horizontal Align'
        id='horizontal-align'
        value={legendAlign}
        options={legendAlignOptions}
        handleValueChange={(value) => updateLegendAlign(value as HorizontalAlignmentType)}
      />
      <ToggleGroupFormField
        label='Vertical Align'
        id='vertical-align'
        value={legendVerticalAlign}
        options={legendVerticalAlignOptions}
        handleValueChange={(value) => updateLegendVerticalAlign(value as VerticalAlignmentType)}
      />
    </div>
  )
}

export default LegendSection
