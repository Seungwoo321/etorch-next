import { TimeRangeOption } from '../types'

export const createTimeRangeOptions = (count: number[], unit: string): TimeRangeOption[] => {
  return count.map(num => ({
    label: `Last ${num} ${num === 1 ? unit : `${unit}s`}`,
    value: `${num}${unit.charAt(0).toUpperCase()}`
  }))
}

export const convertSelectItemToTimeRange = (value: string) => {
  const num = parseInt(value.slice(0, -1), 10)
  const unit = value.slice(-1)
  const toDate = new Date()
  const fromDate = new Date()
  fromDate.setFullYear(fromDate.getFullYear() - (unit === 'Y' ? num : 0))
  fromDate.setMonth(fromDate.getMonth() - (unit === 'M' ? num : 0))
  return {
    from: fromDate,
    to: toDate
  }
}

export const timeRangeOptions = [
  ...createTimeRangeOptions([1, 3, 6], 'month'),
  ...createTimeRangeOptions([1, 3, 5, 10], 'year')
]
