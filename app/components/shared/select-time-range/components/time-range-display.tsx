import { memo } from 'react'
import { Clock } from 'lucide-react'
import { TimeRangeDisplayProps } from '../types'

export const TimeRangeDisplay = memo(({ label }: TimeRangeDisplayProps) => (
  <div className='flex items-center'>
    <span className='mr-2'>
      <Clock size={16} />
    </span>
    {label}
  </div>
))

TimeRangeDisplay.displayName = 'TimeRangeDisplay'
