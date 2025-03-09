import { DateRange } from 'react-day-picker'

export interface TimeRangeOption {
  label: string;
  value: string;
}

export interface DateRangeSelectorProps {
  date: DateRange | undefined;
  rangeValue: string | undefined;
  isAbsolute: boolean
  onDateChange: (value: DateRange | undefined) => void;
  onApply: () => void;
  disabled: boolean;
}

export interface TimeRangeDisplayProps {
  label: string;
}
