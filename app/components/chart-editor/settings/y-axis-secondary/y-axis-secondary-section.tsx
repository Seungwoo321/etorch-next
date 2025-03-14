import { useCallback, useMemo, type JSX } from 'react'
import {
  useDataQueryStore,
  useYAxisOptionStore,
  useYAxisSecondaryOptionStore
} from '@/store/editor'
import { NumberInputFormField, SwitchFormField, SelectFormField } from '../form-field'

function YAxisSecondarySection (): JSX.Element {
  const yAxisDataKey = useYAxisOptionStore.use.yAxisDataKey()
  const yAxisSecondaryUnit = useYAxisSecondaryOptionStore.use.yAxisSecondaryUnit()
  const yAxisSecondaryDataKey = useYAxisSecondaryOptionStore.use.yAxisSecondaryDataKey()
  const yAxisSecondaryVisibility = useYAxisSecondaryOptionStore.use.yAxisSecondaryVisibility()
  const yAxisSecondaryType = useYAxisSecondaryOptionStore.use.yAxisSecondaryType()
  const yAxisSecondaryDomainMin = useYAxisSecondaryOptionStore.use.yAxisSecondaryDomainMin()
  const yAxisSecondaryDomainMax = useYAxisSecondaryOptionStore.use.yAxisSecondaryDomainMax()
  const yAxisSecondaryAxisLine = useYAxisSecondaryOptionStore.use.yAxisSecondaryAxisLine()
  const yAxisSecondaryTickCount = useYAxisSecondaryOptionStore.use.yAxisSecondaryTickCount()
  const yAxisSecondaryTickSize = useYAxisSecondaryOptionStore.use.yAxisSecondaryTickSize()
  const yAxisSecondaryTickLine = useYAxisSecondaryOptionStore.use.yAxisSecondaryTickLine()
  const updateYAxisSecondaryUnit = useYAxisSecondaryOptionStore.use.updateYAxisSecondaryUnit()
  const updateYAxisSecondaryDataKey = useYAxisSecondaryOptionStore.use.updateYAxisSecondaryDataKey()
  const updateYAxisSecondaryVisibility = useYAxisSecondaryOptionStore.use.updateYAxisSecondaryVisibility()
  const updateYAxisSecondaryType = useYAxisSecondaryOptionStore.use.updateYAxisSecondaryType()
  const updateYAxisSecondaryDomainMin = useYAxisSecondaryOptionStore.use.updateYAxisSecondaryDomainMin()
  const updateYAxisSecondaryDomainMax = useYAxisSecondaryOptionStore.use.updateYAxisSecondaryDomainMax()
  const updateYAxisSecondaryAxisLine = useYAxisSecondaryOptionStore.use.updateYAxisSecondaryAxisLine()
  const updateYAxisSecondaryTickCount = useYAxisSecondaryOptionStore.use.updateYAxisSecondaryTickCount()
  const updateYAxisSecondaryTickSize = useYAxisSecondaryOptionStore.use.updateYAxisSecondaryTickSize()
  const updateYAxisSecondaryTickLine = useYAxisSecondaryOptionStore.use.updateYAxisSecondaryTickLine()

  const items = useDataQueryStore.use.items()
  const unitList = useMemo(() => {
    return items
      .filter(item => item.code)
      .map(value => value.unit)
      .reduce((acc: string[], cur) => {
        if (cur && !acc.includes(cur)) {
          acc.push(cur)
        }
        return acc
      }, [])
      .map(unit => ({ value: unit, label: unit }))
  }, [items])
  const unitDataKeyList = useMemo(() => {
    return items
      .filter(item => item.unit !== '' && item.unit === yAxisSecondaryUnit)
      .map(item => ({
        value: item.code,
        label: item.code
      }))
  }, [unitList, yAxisSecondaryUnit])

  const typeList = useMemo(() => [
    { label: 'category', value: 'category' },
    { label: 'number', value: 'number' }
  ], [])

  return (
    <div className='space-y-2 pl-2 pr-1'>
      <SwitchFormField
        label='Visibility'
        id='y-axis-secondary-visibility'
        checked={yAxisSecondaryVisibility}
        handleCheckedChange={updateYAxisSecondaryVisibility}
      />
      <SelectFormField
        label='Unit'
        id='y-secondary-axis-unit'
        placeholder='Not selectable'
        value={yAxisSecondaryUnit}
        handleValueChange={updateYAxisSecondaryUnit}
        options={unitList}
      />
      <SelectFormField
        label='Data key'
        id='y-axis-secondary-data-key'
        placeholder='Not selectable'
        value={yAxisSecondaryDataKey}
        handleValueChange={updateYAxisSecondaryDataKey}
        options={unitDataKeyList}
        disabledValues={[yAxisDataKey]}
      />

      <SelectFormField
        label='Type'
        id='y-axis-secondary-type'
        defaultValue='category'
        value={yAxisSecondaryType}
        handleValueChange={useCallback((value: string) => {
          if (value === 'category' || value === 'number') {
            updateYAxisSecondaryType(value)
          }
          if (value === 'category') {
            updateYAxisSecondaryDomainMin(0)
            updateYAxisSecondaryDomainMax('auto')
          }
        }, [])}
        options={typeList}
      />
      {yAxisSecondaryType === 'number' && (
        <>
          <NumberInputFormField
            label='Min'
            id='y-axis-secondary-domain-min'
            value={yAxisSecondaryDomainMin}
            handleInputChange={updateYAxisSecondaryDomainMin}
          />
          <NumberInputFormField
            label='Max'
            id='y-axis-secondary-domain-max'
            value={yAxisSecondaryDomainMax}
            handleInputChange={updateYAxisSecondaryDomainMax}
            useAuto
          />
        </>
      )}
      <SwitchFormField
        label='Show Axis'
        id='y-axis-secondary-axis-line'
        checked={yAxisSecondaryAxisLine}
        handleCheckedChange={updateYAxisSecondaryAxisLine}
      />
      {yAxisSecondaryType === 'number' && (
        <NumberInputFormField
          label='Tick Count'
          id='y-axis-secondary-tick-count'
          value={yAxisSecondaryTickCount}
          min={2}
          handleInputChange={updateYAxisSecondaryTickCount}
        />
      )}
      <SwitchFormField
        label='Show Tick'
        id='y-axis-secondary-tick-line'
        checked={yAxisSecondaryTickLine}
        handleCheckedChange={updateYAxisSecondaryTickLine}
      />
      {yAxisSecondaryTickLine && (
        <NumberInputFormField
          label='Tick Size'
          id='y-axis-secondary-tick-size'
          value={yAxisSecondaryTickSize}
          max={10}
          handleInputChange={updateYAxisSecondaryTickSize}
        />
      )}
    </div>
  )
}

export default YAxisSecondarySection
