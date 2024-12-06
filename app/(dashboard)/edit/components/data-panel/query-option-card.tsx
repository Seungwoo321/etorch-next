'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardTitle
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  RefreshCcwIcon,
  ChevronRightIcon,
  Trash2,
  CheckCircle
} from 'lucide-react'
import {
  useDataQueryStore,
  useGlobalOptionStore,
  useXAxisOptionStore,
  useYAxisOptionStore
} from '@/store/edit'
import { fetchIndicatorValues } from '@/lib/data'
import { memo, useState } from 'react'
import { QueryOption } from '@/lib/definitions'

interface QueryOptionCardProps {
  id: string
  open: boolean
  option: QueryOption
}

function QueryOptionCard({ id, open, option }: QueryOptionCardProps) {
  const frequency = useGlobalOptionStore.use.frequency()
  const timeRagne = useGlobalOptionStore.use.timeRagne()
  const indicators = useDataQueryStore.use.indicators()
  const dataValues = useDataQueryStore.use.dataValues()
  const openPanel = useDataQueryStore.use.openPanel()
  const closePanel = useDataQueryStore.use.closePanel()
  const removeItem = useDataQueryStore.use.removeItem()
  const removeDataValues = useDataQueryStore.use.removeDataValues()
  const updateItem = useDataQueryStore.use.updateItem()
  const setDataValues = useDataQueryStore.use.setDataValues()
  const setUnitDataKeyList = useDataQueryStore.use.setUnitDataKeyList()
  const removeUnitDataKeyList = useDataQueryStore.use.removeUnitDataKeyList()
  const updateYAxisUnit = useYAxisOptionStore.use.updateYAxisUnit()
  const updateYAxisDataKey = useYAxisOptionStore.use.updateYAxisDataKey()
  const updateXAxisDataKey = useXAxisOptionStore.use.updateXAxisDataKey()

  const handleCollapsibleChange = (value: boolean) => {
    if (value) {
      openPanel(id)
    } else {
      closePanel(id)
    }
  }
  if (!option.id) return null

  const handleFetchData = async () => {
    const data = await fetchIndicatorValues({
      origin: option.origin,
      code: option.code,
      frequency,
      timeRagne
    })
    setDataValues(option.id, data)
    setUnitDataKeyList(option.unit, [...Object.keys(data[0]).filter(v => v !== 'value'), option.code])
  }
  const handleRemoveItem = () => {
    removeItem(id)
    closePanel(id)
    // removeDataValues(id)
    removeUnitDataKeyList(option.unit, option.code)
    updateXAxisDataKey('')
    updateYAxisDataKey('')
    updateYAxisUnit('')
  }
  const handleOriginChange = (origin: string) => updateItem(id, {
    origin,
    code: '',
    unit: ''
  })
  const handleCodeChange = (code: string) => {
    const selectedIndicator = indicators[option.origin as 'kosis' | 'ecos' | 'oecd']?.find(indicator => indicator.code === code)
    updateItem(id, {
      code,
      unit: selectedIndicator?.unit_en
    })
  }
  return (
    <Collapsible
      open={open}
      onOpenChange={handleCollapsibleChange}
    >
      <Card className="h-full m-2">
        <div className="flex justify-between items-center p-4">
          <CardTitle className="flex items-center">
            <CollapsibleTrigger
              asChild
            >
              <div className="flex [&[data-state=open]>svg]:rotate-90">
                <ChevronRightIcon className="cursor-pointer transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>
            {option?.origin.length > 0
              ? `${option?.origin}:${option.code}:${option.unit}:${frequency}`
              : null
            }
          </CardTitle>

          <div className="flex">
            <RefreshCcwIcon className={`mr-2 ${(option.origin === '') || (option.code === '') ? 'cursor-not-allowed' : 'cursor-pointer'}`} size={14} onClick={handleFetchData} />
            <Trash2 className="cursor-pointer" style={{ margin: 0 }} size={14} onClick={handleRemoveItem} />
          </div>

        </div>
        <CollapsibleContent>
          <CardContent className="min-h-[100px]">
            <div className="relative md:flex flex-col">
              <div className="grid gap-6">

                <div className="grid md:grid-cols-[3fr,5fr,1fr] gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="data-source">
                      Data source
                    </Label>
                    <Select
                      defaultValue={option.origin}
                      value={option.origin}
                      onValueChange={handleOriginChange}
                    >
                      <SelectTrigger id="data-source">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kosis">KOSIS</SelectItem>
                        <SelectItem value="ecos">ECOS</SelectItem>
                        <SelectItem value="oecd">OECD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="data-code">
                      Indicator
                    </Label>
                    <Select
                      defaultValue={option.code}
                      value={option.code}
                      onValueChange={handleCodeChange}
                      disabled={option.origin === ''}
                    >
                      <SelectTrigger id="data-code">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {indicators[option.origin as 'kosis' | 'ecos' | 'oecd']?.map(indicator => (
                          <SelectItem
                            key={indicator.code}
                            value={indicator.code}
                          >
                            {indicator.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant={dataValues[option.id] ? 'default' : 'outline'}
                      onClick={handleFetchData}
                      disabled={(option.origin === '') || (option.code === '')}
                    >
                      <CheckCircle />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export default memo(QueryOptionCard)
