import { memo } from 'react'
import { Button } from '@/components/ui/button'
import DatePickerWithRange from './date-picker-with-range'
import { DateRangeSelectorProps } from '../types'

export const DateRangeSelector = memo(({
  date,
  rangeValue,
  isAbsolute,
  onDateChange,
  onApply,
  disabled
}: DateRangeSelectorProps) => (
  <div className='space-y-2 p-2'>
    <DatePickerWithRange
      date={date}
      rangeValue={rangeValue}
      isAbsolute={isAbsolute}
      onDateChange={onDateChange}
    />
    <Button
      className='w-full'
      disabled={disabled}
      onClick={onApply}
    >
      Apply this range
    </Button>
  </div>
))

DateRangeSelector.displayName = 'DateRangeSelector'
