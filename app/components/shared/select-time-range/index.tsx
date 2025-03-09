'use client'
import { memo, useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { useGlobalOptionStore } from '@/store/editor'
import { TimeRangeDisplay } from './components/time-range-display'
import { TimeRangeOptions } from './components/time-range-options'
import { DateRangeSelector } from './components/date-range-selector'
import { convertSelectItemToTimeRange } from './utils/time-range-helpers'

const createTimeRangeOptions = (count: number[], unit: string) => {
  return count.map(num => ({
    label: `Last ${num} ${num === 1 ? unit : `${unit}s`}`,
    value: `${num}${unit.charAt(0).toUpperCase()}`
  }))
}

const timeRangeOptions = [
  ...createTimeRangeOptions([1, 3, 6], 'month'),
  ...createTimeRangeOptions([1, 3, 5, 10], 'year')
]

function SelectTimeRange () {
  const setTimeRange = useGlobalOptionStore.use.setTimeRange()
  const defaultTimeRange = convertSelectItemToTimeRange('1Y')
  const [open, setOpen] = useState<boolean>(false)
  const [fixedDate, setfixedDate] = useState<DateRange | undefined>(defaultTimeRange)
  const [date, setDate] = useState<DateRange | undefined>(defaultTimeRange)
  const [selectItem, setSelectItem] = useState<{ label: string, value: string } | null>({ label: 'Last 1 year', value: '1Y' })
  const [isAbsolute, setIsAbsolute] = useState<boolean>(true)
  const label = selectItem?.label ?? `${format(fixedDate?.from || defaultTimeRange.from, 'yyyy-MM-dd 00:00:00')} to ${format(fixedDate?.to || defaultTimeRange.to, 'yyyy-MM-dd 23:59:59')}`
  useEffect(() => {
    setTimeRange({
      from: format(defaultTimeRange.from, 'yyyy-MM-dd'),
      to: format(defaultTimeRange.to, 'yyyy-MM-dd')
    })
  }, [])

  const handleApply = () => {
    setSelectItem(null)
    setOpen(false)
    setIsAbsolute(false)
    if (date?.from && date?.to) {
      setfixedDate(date)
      setTimeRange({
        from: format(date.from, 'yyyy-MM-dd'),
        to: format(date.to, 'yyyy-MM-dd')
      })
    }
  }
  const handleSelectChange = (value: string) => {
    const selectOption = timeRangeOptions.find(option => option.value === value) ?? null
    const date = convertSelectItemToTimeRange(value)
    setSelectItem(selectOption)
    setDate(date)
    setfixedDate(date)
    setTimeRange({
      from: format(date.from, 'yyyy-MM-dd'),
      to: format(date.to, 'yyyy-MM-dd')
    })
    setIsAbsolute(true)
    setOpen(false)
  }
  const handelDataChange = (value: DateRange | undefined) => {
    setIsAbsolute(false)
    setDate(value)
  }
  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={handleSelectChange}
      defaultValue={selectItem?.value}
      value={selectItem?.value || 'absolute'}
    >
      <SelectTrigger className='w-full h-7'>
        <SelectValue asChild>
          <TimeRangeDisplay
            label={label}
          />
        </SelectValue>
      </SelectTrigger>
      <SelectContent align='end'>
        <div className='flex justify-end gap-2'>
          <div className='space-y-2 p-2'>
            <DateRangeSelector
              date={date}
              isAbsolute={isAbsolute}
              rangeValue={selectItem?.value}
              onDateChange={handelDataChange}
              onApply={handleApply}
              disabled={!date?.from || !date?.to}
            />
          </div>
          <Separator className='h-100 items-center' orientation='vertical' />
          <TimeRangeOptions />
        </div>
      </SelectContent>
    </Select>
  )
}

export default memo(SelectTimeRange)
