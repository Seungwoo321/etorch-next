'use client'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import DatePickerWithRange from './date-picker-with-range'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Clock } from 'lucide-react'
import { useGlobalOptionStore } from '@/store/edit'

const createTimeRangeOptions = (count: number[], unit: string) => {
  return count.map(num => ({
    label: `Last ${num} ${num === 1 ? unit : `${unit}s`}`,
    value: `${num}${unit.charAt(0).toUpperCase()}`
  }))
}

const convertSelectItemToTimeRange = (value: string) => {
  const num = parseInt(value.slice(0, -1), 10)
  const unit = value.slice(-1)
  const toDate = new Date()
  const fromDate = new Date()
  fromDate.setFullYear(fromDate.getFullYear() - (unit === 'Y' ? num : 0))
  fromDate.setMonth(fromDate.getMonth() - (unit === 'M' ? num : 0))
  return { from: fromDate, to: toDate }
}

const timeRangeOptions = [
  ...createTimeRangeOptions([1, 3, 6], 'month'),
  ...createTimeRangeOptions([1, 3, 5, 10], 'year')
]

function SelectTimeRange () {
  const [open, setOpen] = useState<boolean>(false)
  const [date, setDate] = useState<DateRange | undefined>(convertSelectItemToTimeRange('1Y'))
  const [selectItem, setSelectItem] = useState<{ label: string, value: string } | null>({ label: 'Last 1 year', value: '1Y' })
  const [selectLabel, setSelectLabel] = useState<string>(selectItem?.label || '')
  const setTimeRange = useGlobalOptionStore.use.setTimeRange()
  useEffect(() => {
    if (date?.from && date?.to) {
      setTimeRange({
        from: format(date.from, 'yyyy-MM-dd'),
        to: format(date.to, 'yyyy-MM-dd')
      })
    }
  }, [date, setTimeRange])

  const handleApply = () => {
    setSelectItem(null)
    setOpen(false)
    if (date?.from && date?.to) {
      setSelectLabel(`${format(date.from, 'yyyy-MM-dd 00:00:00')} to ${format(date.to, 'yyyy-MM-dd 23:59:59')}`)
    }
  }
  const handleSelectChange = (value: string) => {
    const selectOption = timeRangeOptions.find(option => option.value === value) ?? null
    const date = convertSelectItemToTimeRange(value)
    if (selectOption) {
      setSelectLabel(selectOption.label)
    }
    setSelectItem(selectOption)
    setDate(date)
  }
  const handelDataChange = (value: DateRange | undefined) => {
    setDate(value)
    setSelectItem(null)
  }
  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={handleSelectChange}
      defaultValue={selectItem?.value}
      value={selectItem?.value || 'absolute'}
    >
      <SelectTrigger className="w-full h-7" >
        <SelectValue asChild>
          <div className="flex items-center">
            <span className="mr-2">
              <Clock size={16} />
            </span>
            {selectLabel}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        <div className='flex justify-end gap-2'>
          <div className="space-y-2 p-2">
            <DatePickerWithRange
              date={date}
              rangeValue={selectItem?.value}
              onDateChange={handelDataChange}
            />
            <Button
              className='w-full'
              disabled={!date?.from || !date?.to}
              onClick={handleApply}
            >
              Apply this range
            </Button>
          </div>
          <Separator className="h-100 items-center" orientation="vertical" />
          <ScrollArea className="w-full h-min-0 rounded-xl">
            <div className='h-[180px]'>
              <SelectItem
                disabled
                value="absolute"
              >
                Absolute time range
              </SelectItem>
              {timeRangeOptions.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SelectContent>
    </Select>
  )
}

export default SelectTimeRange
