'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useGlobalOptionStore, useDataQueryStore } from '@/store/editor'
import SelectTimeRange from '@/components/shared/select-time-range/index'
import { useEffect } from 'react'
import { fetchAllIndicatorsByFrequency } from '@/lib/data'

function GlobalOption () {
  const frequency = useGlobalOptionStore.use.frequency()
  const isTableView = useGlobalOptionStore.use.isTableView()
  const setFrequency = useGlobalOptionStore.use.setFrequency()
  const setIsTableView = useGlobalOptionStore.use.setIsTableView()
  const setIndicators = useDataQueryStore.use.setIndicators()

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      const indicators = await fetchAllIndicatorsByFrequency(frequency)
      if (!ignore) {
        setIndicators(indicators)
      }
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [frequency])
  return (
    <div className='flex justify-end py-1 gap-2 p-1'>
      <div className='flex items-center space-x-2 h-7'>
        <Switch
          id='tablue-view'
          checked={isTableView}
          onCheckedChange={() => setIsTableView(!isTableView)}
        />
        <Label htmlFor='tablue-view'>Table View</Label>
      </div>
      <Separator className='h-5 my-auto' orientation='vertical' />
      <div>
        <SelectTimeRange />
      </div>
      <Separator className='h-5 my-auto' orientation='vertical' />
      <Select
        defaultValue='M'
        value={frequency}
        onValueChange={setFrequency}
      >
        <SelectTrigger
          id='data-frequency'
          className='h-7 w-[90px]'
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='A'> 연간 </SelectItem>
          <SelectItem value='Q'> 분기 </SelectItem>
          <SelectItem value='M'> 월간 </SelectItem>
          <SelectItem value='D'> 일간 </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default GlobalOption
