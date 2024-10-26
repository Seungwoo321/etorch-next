'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

interface DatePickerWithRangeProps {
  className?: string
  date: DateRange | undefined,
  rangeValue?: string
  onDateChange: (value: DateRange | undefined) => void
}

function DatePickerWithRange ({
  className,
  date,
  rangeValue,
  onDateChange
}: DatePickerWithRangeProps) {
  const [activeCalendar, setActiveCalendar] = useState<'from' | 'to'>('from')
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="space-y-2">
            <div className="grid w-full max-w-sm items-center gap-1.5 ">
              <Label htmlFor="from">From</Label>
              <Button
                id="date-from"
                size="sm"
                variant={'outline'}
                className={cn(
                  'w-[150px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
                onClick={() => setActiveCalendar('from')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {rangeValue
                  ? <span>Now-{rangeValue}</span>
                  : date?.from
                    ? (format(date.from, 'LLL dd, y'))
                    : <span>Pick a date</span>
                }
              </Button>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 ">
              <Label htmlFor="to">To</Label>
              <Button
                id="date-to"
                size="sm"
                variant={'outline'}
                className={cn(
                  'w-[150px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
                onClick={() => setActiveCalendar('to')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {rangeValue
                  ? <span>Now</span>
                  : date?.to
                    ? (format(date.to, 'LLL dd, y'))
                    : <span>Pick a date</span>
                }
              </Button>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" side="left">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={activeCalendar === 'from' ? date?.from : date?.to}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerWithRange
