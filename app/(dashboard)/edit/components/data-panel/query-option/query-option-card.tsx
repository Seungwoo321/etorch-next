'use client'
import {
  Card,
  CardContent
} from '@/components/ui/card'
import {
  useDataQueryStore,
  useXAxisOptionStore,
  useYAxisOptionStore
} from '@/store/edit'
import { memo, useCallback, useMemo } from 'react'
import { QueryOption } from '@/lib/definitions'
import QueryOptionRemoveButton from './query-option-remove-button'
import QueryOptionSelect from './query-option-select'

interface QueryOptionCardProps {
  id: string
  option: QueryOption
}
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
function QueryOptionCard({ id, option }: QueryOptionCardProps) {
  const indicators = useDataQueryStore.use.indicators()
  const updateItem = useDataQueryStore.use.updateItem()
  const origin = useMemo(() => option.origin, [option.origin])
  // if (!option.id) return null

  const codeByIndicators = useMemo(() => indicators[option.origin] ?? [], [option])
  const handleOriginChange = useCallback((origin: string) => updateItem(id, { origin }), [id])
  const handleCodeChange = useCallback((code: string) => {
    const selectedIndicator = codeByIndicators.find(indicator => indicator.code === code)
    updateItem(id, {
      code,
      unit: selectedIndicator?.unit_en
    })
  }, [])
  const indicatorsOptions = codeByIndicators.map(item => ({ name: item.name, value: item.code }))

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative md:flex flex-col">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-[3fr,8fr,1fr] gap-2">
              <QueryOptionSelect
                className="grid gap-3"
                labelName="Data source"
                value={origin}
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
              />
              <QueryOptionRemoveButton
                className="flex items-end"
                cardId={id}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(QueryOptionCard)
