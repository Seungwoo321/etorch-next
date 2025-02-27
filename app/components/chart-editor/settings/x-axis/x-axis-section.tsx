import { useCallback, useMemo, JSX } from 'react'
import {
  useDataQueryStore,
  useXAxisOptionStore
} from '@/store/editor'
import { NumberInputFormField, SwitchFormField, SelectFormField } from '../form-field'

function XAxisSection (): JSX.Element {
  const xAxisDataKey = useXAxisOptionStore.use.xAxisDataKey()
  const xAxisVisibility = useXAxisOptionStore.use.xAxisVisibility()
  const xAxisType = useXAxisOptionStore.use.xAxisType()
  const xAxisDomainMin = useXAxisOptionStore.use.xAxisDomainMin()
  const xAxisDomainMax = useXAxisOptionStore.use.xAxisDomainMax()
  const xAxisAxisLine = useXAxisOptionStore.use.xAxisAxisLine()
  const xAxisTickCount = useXAxisOptionStore.use.xAxisTickCount()
  const xAxisTickAngle = useXAxisOptionStore.use.xAxisTickAngle()
  const xAxisTickSize = useXAxisOptionStore.use.xAxisTickSize()
  const xAxisTickLine = useXAxisOptionStore.use.xAxisTickLine()
  const updateXAxisDataKey = useXAxisOptionStore.use.updateXAxisDataKey()
  const updateXAxisVisibility = useXAxisOptionStore.use.updateXAxisVisibility()
  const updateXAxisType = useXAxisOptionStore.use.updateXAxisType()
  const updateXAxisDomainMin = useXAxisOptionStore.use.updateXAxisDomainMin()
  const updateXAxisDomainMax = useXAxisOptionStore.use.updateXAxisDomainMax()
  const updateXAxisAxisLine = useXAxisOptionStore.use.updateXAxisAxisLine()
  const updateXAxisTickCount = useXAxisOptionStore.use.updateXAxisTickCount()
  const updateXAxisTickAngle = useXAxisOptionStore.use.updateXAxisTickAngle()
  const updateXAxisTickSize = useXAxisOptionStore.use.updateXAxisTickSize()
  const updateXAxisTickLine = useXAxisOptionStore.use.updateXAxisTickLine()

  const mregedData = useDataQueryStore.use.mergedData()

  const xAxisDataKeyList = useMemo(() => {
    if (mregedData.length) {
      return Object.keys(mregedData[0]).map(key => ({
        value: key,
        label: key
      }))
    } else {
      return []
    }
  }, [mregedData])

  const typeList = useMemo(() => [
    { label: 'category', value: 'category' },
    { label: 'number', value: 'number' }
  ], [])

  return (
    <div className='space-y-2 pl-2 pr-1'>
      <SwitchFormField
        label='Visibility'
        id='x-axis-visibility'
        checked={xAxisVisibility}
        handleCheckedChange={updateXAxisVisibility}
      />
      <SelectFormField
        label='Data key'
        id='x-axis-data-key'
        placeholder='Not selectable'
        value={xAxisDataKey}
        handleValueChange={updateXAxisDataKey}
        options={xAxisDataKeyList}
      />
      <SelectFormField
        label='Type'
        id='x-axis-type'
        value={xAxisType}
        handleValueChange={useCallback((value: string) => {
          if (value === 'category' || value === 'number') {
            updateXAxisType(value)
          }
          if (value === 'category') {
            updateXAxisDomainMin(0)
            updateXAxisDomainMax('auto')
          }
        }, [])}
        options={typeList}
      />
      {xAxisType === 'number' && (
        <>
          <NumberInputFormField
            label='Min'
            id='x-axis-domain-min'
            value={xAxisDomainMin}
            handleInputChange={updateXAxisDomainMin}
          />
          <NumberInputFormField
            label='Max'
            id='x-axis-domain-max'
            value={xAxisDomainMax}
            handleInputChange={updateXAxisDomainMax}
            useAuto
          />
        </>
      )}
      <SwitchFormField
        label='Show Axis'
        id='x-axis-axis-line'
        checked={xAxisAxisLine}
        handleCheckedChange={updateXAxisAxisLine}
      />
      {xAxisType === 'number' && (
        <NumberInputFormField
          label='Tick Count'
          id='x-axis-tick-count'
          min={5}
          value={xAxisTickCount}
          handleInputChange={updateXAxisTickCount}
        />
      )}
      <NumberInputFormField
        label='Tick Angle'
        id='x-axis-tick-angle'
        min={0}
        max={360}
        value={xAxisTickAngle}
        handleInputChange={updateXAxisTickAngle}
      />
      <SwitchFormField
        label='Show Tick'
        id='x-axis-tick-line'
        checked={xAxisTickLine}
        handleCheckedChange={updateXAxisTickLine}
      />
      {xAxisTickLine && (
        <NumberInputFormField
          label='Tick Size'
          id='x-axis-tick-size'
          max={10}
          value={xAxisTickSize}
          handleInputChange={updateXAxisTickSize}
        />
      )}
    </div>
  )
}

export default XAxisSection
