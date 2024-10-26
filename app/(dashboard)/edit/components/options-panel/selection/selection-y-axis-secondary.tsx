import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  useDataQueryStore,
  useYAxisOptionStore,
  useYAxisSecondaryOptionStore
} from '@/store/edit'
import FormField from '@/components/shared/form-field'

function SelectionYAxisSecondaryOption (): JSX.Element {
  const panelItems = useDataQueryStore.use.items()
  const chartData = useDataQueryStore.use.chartData()
  const uniqueDataKey = Object.keys(chartData[0] ?? {})
  const dataUnits = useDataQueryStore.use.dataUnits()
  const yAxisUnit = useYAxisOptionStore.use.yAxisUnit()
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

  return (
    <div className="space-y-2 pl-2 pr-1">
      <FormField htmlFor="y-axis-secondary-visibility" label="Visibility">
        <Switch
          id="y-axis-secondary-visibility"
          checked={yAxisSecondaryVisibility}
          onCheckedChange={(value) => {
            if (!value) {
              updateYAxisSecondaryUnit('')
              updateYAxisSecondaryDataKey('')
            }
            updateYAxisSecondaryVisibility(value)
          }}
        />
      </FormField>
      {yAxisSecondaryVisibility && <>
        <FormField htmlFor="y-secondary-axis-unit" label="Unit">
          <div className="flex gap-1.5">
            <Select
              onValueChange={(value) => {
                if (panelItems.length) {
                  updateYAxisSecondaryUnit(value)
                  updateYAxisSecondaryDataKey(panelItems.find(item => item.unit === value)?.code ?? '')
                }
              }}
              value={yAxisSecondaryUnit}
            >
              <SelectTrigger id="y-secondary-axis-unit">
                <SelectValue>
                  {yAxisSecondaryUnit === '' ? 'Not selectable' : yAxisSecondaryUnit}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {panelUnits.map(unit => (
                  <SelectItem
                    disabled={unit === yAxisUnit}
                    key={unit}
                    value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormField>

        <FormField htmlFor="y-axis-secondary-data-key" label="Data key">
          <div className="flex gap-1.5">
            <Select
              onValueChange={updateYAxisSecondaryDataKey}
              value={yAxisSecondaryDataKey}
            >
              <SelectTrigger id="y-axis-secondary-data-key">
                <SelectValue>
                  {yAxisSecondaryDataKey === '' ? 'Not selectable' : yAxisSecondaryDataKey}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {yAxisSecondaryUnit && panelDataMapByUnit[yAxisSecondaryUnit]?.map(panel => (
                  <SelectItem
                    key={panel.id}
                    value={panel.indicatorCode}
                  >
                    {panel.indicatorCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormField>

        <FormField htmlFor="y-axis-secondary-type" label="Type">
          <Select
            onValueChange={(value) => {
              if (value === 'category' || value === 'number') {
                updateYAxisSecondaryType(value)
              }
              if (value === 'category') {
                updateYAxisSecondaryDomainMin(0)
                updateYAxisSecondaryDomainMax('auto')
              }
            }}
            value={yAxisSecondaryType}
          >
            <SelectTrigger id="y-axis-secondary-type">
              <SelectValue defaultValue="category"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category">category</SelectItem>
              <SelectItem value="number">number</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        {yAxisSecondaryType === 'number' && (
          <>
            <FormField htmlFor="y-axis-secondary-domain-min" label="Min">
              <Input
                id="y-axis-secondary-domain-min"
                type="text"
                className="sm"
                value={yAxisSecondaryDomainMin}
                onInput={(e) => {
                  if (e.currentTarget.value === 'auto') {
                    updateYAxisSecondaryDomainMin(e.currentTarget.value)
                  } else if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                    updateYAxisSecondaryDomainMin(+e.currentTarget.value)
                  }
                }}
              />
            </FormField>

            <FormField htmlFor="y-axis-secondary-domain-max" label="Max">
              <Input
                id="y-axis-secondary-domain-max"
                type="text"
                className="sm"
                value={yAxisSecondaryDomainMax}
                onInput={(e) => {
                  if (e.currentTarget.value === 'auto') {
                    updateYAxisSecondaryDomainMax(e.currentTarget.value)
                  } else if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                    updateYAxisSecondaryDomainMax(+e.currentTarget.value)
                  }
                }}
              />
            </FormField>
          </>
        )}

        <FormField htmlFor="y-axis-secondary-axis-line" label="Show Axis">
          <Switch
            id="y-axis-secondary-axis-line"
            checked={yAxisSecondaryAxisLine}
            onCheckedChange={updateYAxisSecondaryAxisLine}
          />
        </FormField>
        {yAxisSecondaryType === 'number' && (
          <FormField htmlFor="y-axis-secondary-tick-count" label="Tick Count">
            <Input
              id="y-axis-secondary-tick-count"
              type="number"
              min={2}
              className="sm"
              value={yAxisSecondaryTickCount}
              onInput={(e) => {
                if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                  updateYAxisSecondaryTickCount(+e.currentTarget.value)
                }
              }}
            />
          </FormField>
        )}
        <FormField htmlFor="y-axis-secondary-tick-line" label="Show Tick">
          <Switch
            id="y-axis-secondary-tick-line"
            checked={yAxisSecondaryTickLine}
            onCheckedChange={updateYAxisSecondaryTickLine}
          />
        </FormField>
        {yAxisSecondaryTickLine && (
          <FormField htmlFor="y-axis-secondary-tick-size" label="Tick Size">
            <Input
              id="y-axis-secondary-tick-size"
              type="number"
              max={10}
              className="sm"
              value={yAxisSecondaryTickSize}
              onInput={(e) => {
                if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                  updateYAxisSecondaryTickSize(+e.currentTarget.value)
                }
              }}
            />
          </FormField>
        )}
      </>}

    </div>
  )
}

export default SelectionYAxisSecondaryOption