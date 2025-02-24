import { useCallback, useMemo, type JSX } from 'react'
import {
  useDataQueryStore,
  useYAxisOptionStore,
  useYAxisSecondaryOptionStore
} from '@/store/edit'
import NumberInputForm from '../form/number-input-form'
import SwitchForm from '../form/switch-form'
import SelectForm from '../form/select-form'

function SelectionYAxisOption (): JSX.Element {
  const yAxisSecondaryDataKey = useYAxisSecondaryOptionStore.use.yAxisSecondaryDataKey()
  const yAxisUnit = useYAxisOptionStore.use.yAxisUnit()
  const yAxisDataKey = useYAxisOptionStore.use.yAxisDataKey()
  const yAxisVisibility = useYAxisOptionStore.use.yAxisVisibility()
  const yAxisType = useYAxisOptionStore.use.yAxisType()
  const yAxisDomainMin = useYAxisOptionStore.use.yAxisDomainMin()
  const yAxisDomainMax = useYAxisOptionStore.use.yAxisDomainMax()
  const yAxisAxisLine = useYAxisOptionStore.use.yAxisAxisLine()
  const yAxisTickCount = useYAxisOptionStore.use.yAxisTickCount()
  const yAxisTickSize = useYAxisOptionStore.use.yAxisTickSize()
  const yAxisTickLine = useYAxisOptionStore.use.yAxisTickLine()
  const updateYAxisUnit = useYAxisOptionStore.use.updateYAxisUnit()
  const updateYAxisDataKey = useYAxisOptionStore.use.updateYAxisDataKey()
  const updateYAxisVisibility = useYAxisOptionStore.use.updateYAxisVisibility()
  const updateYAxisType = useYAxisOptionStore.use.updateYAxisType()
  const updateYAxisDomainMin = useYAxisOptionStore.use.updateYAxisDomainMin()
  const updateYAxisDomainMax = useYAxisOptionStore.use.updateYAxisDomainMax()
  const updateYAxisAxisLine = useYAxisOptionStore.use.updateYAxisAxisLine()
  const updateYAxisTickCount = useYAxisOptionStore.use.updateYAxisTickCount()
  const updateYAxisTickSize = useYAxisOptionStore.use.updateYAxisTickSize()
  const updateYAxisTickLine = useYAxisOptionStore.use.updateYAxisTickLine()

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
      .filter(item => item.unit !== '' && item.unit === yAxisUnit)
      .map(item => ({
        value: item.code,
        label: item.code
      }))
  }, [unitList, yAxisUnit])

  const typeList = useMemo(() => [
    { label: 'category', value: 'category' },
    { label: 'number', value: 'number' }
  ], [])

  return (
    <div className='space-y-2 pl-2 pr-1'>
      <SwitchForm
        label='Visibility'
        id='y-axis-visibility'
        checked={yAxisVisibility}
        handleCheckedChange={updateYAxisVisibility}
      />
      <SelectForm
        label='Unit'
        id='y-axis-unit'
        placeholder='Not selectable'
        value={yAxisUnit}
        handleValueChange={updateYAxisUnit}
        options={unitList}
      />
      <SelectForm
        label='Data key'
        id='y-axis-data-key'
        placeholder='Not selectable'
        value={yAxisDataKey}
        handleValueChange={updateYAxisDataKey}
        options={unitDataKeyList}
        disabledValues={[yAxisSecondaryDataKey]}
      />
      <SelectForm
        label='Type'
        id='y-axis-type'
        defaultValue='category'
        value={yAxisType}
        handleValueChange={useCallback((value: string) => {
          if (value === 'category' || value === 'number') {
            updateYAxisType(value)
          }
          if (value === 'category') {
            updateYAxisDomainMin(0)
            updateYAxisDomainMax('auto')
          }
        }, [])}
        options={typeList}
      />
      {yAxisType === 'number' && (
        <>
          <NumberInputForm
            label='Min'
            id='y-axis-domain-min'
            value={yAxisDomainMin}
            handleInputChange={updateYAxisDomainMin}
          />
          <NumberInputForm
            label='Max'
            id='y-axis-domain-max'
            value={yAxisDomainMax}
            handleInputChange={updateYAxisDomainMax}
            useAuto
          />
        </>
      )}
      <SwitchForm
        label='Show Axis'
        id='y-axis-axis-line'
        checked={yAxisAxisLine}
        handleCheckedChange={updateYAxisAxisLine}
      />
      {yAxisType === 'number' && (
        <NumberInputForm
          label='Tick Count'
          id='y-axis-tick-count'
          min={2}
          value={yAxisTickCount}
          handleInputChange={updateYAxisTickCount}
        />
      )}
      <SwitchForm
        label='Show Tick'
        id='y-axis-tick-line'
        checked={yAxisTickLine}
        handleCheckedChange={updateYAxisTickLine}
      />
      {yAxisTickLine && (
        <NumberInputForm
          label='Tick Size'
          id='y-axis-tick-size'
          max={10}
          value={yAxisTickSize}
          handleInputChange={updateYAxisTickSize}
        />
      )}
    </div>
  )
}

export default SelectionYAxisOption
