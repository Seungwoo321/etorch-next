import { memo } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SelectItem } from '@/components/ui/select'
import { timeRangeOptions } from '../utils/time-range-helpers'

export const TimeRangeOptions = memo(() => (
  <ScrollArea className='w-full h-min-0 rounded-xl'>
    <div className='h-[180px]'>
      <SelectItem disabled value='absolute'>
        Absolute time range
      </SelectItem>
      {timeRangeOptions.map(option => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </div>
  </ScrollArea>
))

TimeRangeOptions.displayName = 'TimeRangeOptions'
