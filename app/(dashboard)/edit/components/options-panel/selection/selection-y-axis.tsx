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
  useXAxisOptionStore,
  useYAxisOptionStore,
  useYAxisSecondaryOptionStore
} from '@/store/edit'
import FormField from '@/components/shared/form-field'

function SelectionYAxisOption (): JSX.Element {
  const items = useDataQueryStore.use.items()
  const unitDataKeyList = useDataQueryStore.use.unitDataKeyList()
  const unitList = Object.keys(unitDataKeyList)
  const xAxisDataKey = useXAxisOptionStore.use.xAxisDataKey()
  const yAxisUnit = useYAxisOptionStore.use.yAxisUnit()
  const yAxisSecondaryUnit = useYAxisSecondaryOptionStore.use.yAxisSecondaryUnit()
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
  const setChartData = useDataQueryStore.use.setChartData()
  return (
    <div className="space-y-2 pl-2 pr-1">
      <FormField htmlFor="y-axis-visibility" label="Visibility">
        <Switch
          id="y-axis-visibility"
          checked={yAxisVisibility}
          onCheckedChange={(value) => {
            if (!value) {
              updateYAxisUnit('')
              updateYAxisDataKey('')
            }
            updateYAxisVisibility(value)
          }}
        />
      </FormField>
      <FormField htmlFor="y-axis-unit" label="Unit">
        <div className="flex gap-1.5">
          <Select
            onValueChange={updateYAxisUnit}
            value={yAxisUnit}
          >
            <SelectTrigger id="y-axis-unit">
              <SelectValue placeholder="Not selectable">
                {yAxisUnit}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {unitList.map(unit => (
                <SelectItem
                  key={unit}
                  value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FormField>

      <FormField htmlFor="y-axis-data-key" label="Data key">
        <div className="flex gap-1.5">
          <Select
            onValueChange={(value) => {
              const selectedItem = items.find(item => item.unit === yAxisUnit || item.unit === yAxisSecondaryUnit)
              if (selectedItem) {
                setChartData(selectedItem, xAxisDataKey)
              }
              updateYAxisDataKey(value)
            }}
            value={yAxisDataKey}
          >
            <SelectTrigger id="y-axis-data-key">
              <SelectValue placeholder="Not selectable">
                {yAxisDataKey}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {yAxisUnit && unitDataKeyList[yAxisUnit].map(key => (
                <SelectItem
                  key={key}
                  value={key}
                >
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FormField>

      <FormField htmlFor="y-axis-type" label="Type">
        <Select
          onValueChange={(value) => {
            if (value === 'category' || value === 'number') {
              updateYAxisType(value)
            }
            if (value === 'category') {
              updateYAxisDomainMin(0)
              updateYAxisDomainMax('auto')
            }
          }}
          value={yAxisType}
        >
          <SelectTrigger id="y-axis-type">
            <SelectValue defaultValue="category"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="category">category</SelectItem>
            <SelectItem value="number">number</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      {yAxisType === 'number' && (
        <>
          <FormField htmlFor="y-axis-domain-min" label="Min">
            <Input
              id="y-axis-domain-min"
              type="text"
              className="sm"
              value={yAxisDomainMin}
              onInput={(e) => {
                if (e.currentTarget.value === 'auto') {
                  updateYAxisDomainMin(e.currentTarget.value)
                } else if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                  updateYAxisDomainMin(+e.currentTarget.value)
                }
              }}
            />
          </FormField>

          <FormField htmlFor="y-axis-domain-max" label="Max">
            <Input
              id="y-axis-domain-max"
              type="text"
              className="sm"
              value={yAxisDomainMax}
              onInput={(e) => {
                if (e.currentTarget.value === 'auto') {
                  updateYAxisDomainMax(e.currentTarget.value)
                } else if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                  updateYAxisDomainMax(+e.currentTarget.value)
                }
              }}
            />
          </FormField>
        </>
      )}

      <FormField htmlFor="y-axis-axis-line" label="Show Axis">
        <Switch
          id="y-axis-axis-line"
          checked={yAxisAxisLine}
          onCheckedChange={updateYAxisAxisLine}
        />
      </FormField>
      {yAxisType === 'number' && (
        <FormField htmlFor="y-axis-tick-count" label="Tick Count">
          <Input
            id="y-axis-tick-count"
            type="number"
            min={2}
            className="sm"
            value={yAxisTickCount}
            onInput={(e) => {
              if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                updateYAxisTickCount(+e.currentTarget.value)
              }
            }}
          />
        </FormField>
      )}
      <FormField htmlFor="y-axis-tick-line" label="Show Tick">
        <Switch
          id="y-axis-tick-line"
          checked={yAxisTickLine}
          onCheckedChange={updateYAxisTickLine}
        />
      </FormField>
      {yAxisTickLine && (
        <FormField htmlFor="y-axis-tick-size" label="Tick Size">
          <Input
            id="y-axis-tick-size"
            type="number"
            max={10}
            className="sm"
            value={yAxisTickSize}
            onInput={(e) => {
              if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                updateYAxisTickSize(+e.currentTarget.value)
              }
            }}
          />
        </FormField>
      )}

    </div>
  )
}

export default SelectionYAxisOption
