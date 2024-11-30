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

interface QueryOptionCardProps {
  id: string
}

function QueryOptionCard ({ id }: QueryOptionCardProps) {
  const frequency = useGlobalOptionStore.use.frequency()
  const timeRagne = useGlobalOptionStore.use.timeRagne()
  const indicators = useDataQueryStore.use.indicators()
  const openPanels = useDataQueryStore.use.openPanels()
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
  const items = useDataQueryStore.use.items()
  const panel = items.find(item => item.id === id)
  const isOpen = openPanels.includes(id)
  const handleCollapsibleChange = () => {
    if (isOpen) {
      closePanel(id)
    } else {
      openPanel(id)
    }
  }
  if (!panel) return null

  const handleFetchData = async () => {
    const data = await fetchIndicatorValues({
      origin: panel.origin,
      code: panel.code,
      frequency,
      timeRagne
    })
    setDataValues(panel.id, data)
    setUnitDataKeyList(panel.unit, [...Object.keys(data[0]).filter(v => v !== 'value'), panel.code])
  }
  const handleRemoveItem = () => {
    removeItem(id)
    closePanel(id)
    removeDataValues(id)
    removeUnitDataKeyList(panel.unit, panel.code)
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
    const selectedIndicator = indicators[panel.origin as 'kosis' | 'ecos' | 'oecd']?.find(indicator => indicator.code === code)
    updateItem(id, {
      code,
      unit: selectedIndicator?.unit_en
    })
  }
  return (
    <Collapsible
      open={isOpen}
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
            {panel?.origin.length > 0
              ? `${panel?.origin}:${panel.code}:${panel.unit}:${frequency}`
              : null
            }
          </CardTitle>

          <div className="flex">
            <RefreshCcwIcon className={`mr-2 ${(panel.origin === '') || (panel.code === '') ? 'cursor-not-allowed' : 'cursor-pointer'}`} size={14} onClick={handleFetchData} />
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
                      defaultValue={panel.origin}
                      value={panel.origin}
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
                      defaultValue={panel.code}
                      value={panel.code}
                      onValueChange={handleCodeChange}
                      disabled={panel.origin === ''}
                    >
                      <SelectTrigger id="data-code">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {indicators[panel.origin as 'kosis' | 'ecos' | 'oecd']?.map(indicator => (
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
                      variant={dataValues[panel.id] ? 'default' : 'outline'}
                      onClick={handleFetchData}
                      disabled={(panel.origin === '') || (panel.code === '')}
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

export default QueryOptionCard
