'use client'
import {
  Card,
  CardContent
} from '@/components/ui/card'
import {
  useDataQueryStore,
  useGlobalOptionStore
} from '@/store/edit'
import { memo, useCallback } from 'react'
import { TQueryOption } from '@/lib/definitions'
import QueryOptionRemoveButton from './query-option-remove-button'
import QueryOptionSelect from './query-option-select'
import { fetchIndicatorValues } from '@/lib/data'

type QueryOptionCardProps = TQueryOption
const dataSorceOptions = [
  {
    name: 'KOSIS',
    value: 'kosis'
  },
  {
    name: 'ECOS',
    value: 'ecos'
  },
  {
    name: 'OECD',
    value: 'oecd'
  }
]
function QueryOptionCard ({ id, origin, code }: QueryOptionCardProps) {
  const option = { id, origin, code }
  const frequency = useGlobalOptionStore.use.frequency()
  const timeRagne = useGlobalOptionStore.use.timeRagne()
  const indicators = useDataQueryStore.use.indicators()
  const updateItem = useDataQueryStore.use.updateItem()
  const addRawData = useDataQueryStore.use.addRawData()
  const codeByIndicators = indicators[option.origin] ?? []
  const removeRawData = useDataQueryStore.use.removeRawData()
  const fetchChartData = async (code: string) => {
    const dataValues = await fetchIndicatorValues({
      origin: option.origin,
      code,
      frequency,
      timeRagne
    })
    removeRawData(option.code)
    addRawData(dataValues)
  }
  const handleOriginChange = useCallback((origin: string) => {
    updateItem(option.id, {
      origin
    })
    if (option.code !== '') {
      removeRawData(option.code)
    }
  }, [option])
  const handleCodeChange = useCallback((code: string) => {
    const selectedItem = codeByIndicators.find(indicator => indicator.code === code)
    updateItem(option.id, {
      code,
      unit: selectedItem?.unit_en
    })
    fetchChartData(code)
  }, [option])
  const indicatorsOptions = codeByIndicators.map(item => ({ name: item.name, value: item.code }))
  const items = useDataQueryStore.use.items()
  const selectedCodes = items.filter(item => item.code !== '').map(item => item.code)
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative md:flex flex-col">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-[3fr,8fr,1fr] gap-2">
              <QueryOptionSelect
                className="grid gap-3"
                labelName="Data source"
                value={option.origin}
                options={dataSorceOptions}
                onQueryOptionChange={handleOriginChange}
              />
              <QueryOptionSelect
                className="grid gap-3"
                labelName="Indicator"
                value={option.code}
                formatter={(option => `${option.name} (${option.value})`)}
                options={indicatorsOptions}
                onQueryOptionChange={handleCodeChange}
                selectedValues={selectedCodes}
              />
              <QueryOptionRemoveButton
                className="flex items-end"
                cardId={option.id}
                code={option.code}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(QueryOptionCard)
