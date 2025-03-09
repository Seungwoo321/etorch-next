import { memo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { TDataSourceOption } from '@/lib/definitions'
type QueryOptionSelectProps = {
  className: string
  labelName: string
  value: string
  options: {
    [key: string]: string
  }[]
  formatter?: (value: TDataSourceOption) => string
  onQueryOptionChange: (value: string) => void
  disabled?: boolean
  selectedValues?: string[]
}

function QueryOptionSelect ({
  className,
  labelName,
  value,
  options,
  formatter,
  onQueryOptionChange,
  disabled = false,
  selectedValues = []
}: QueryOptionSelectProps) {
  const selectedSet = new Set(selectedValues)
  return (
    <div className={className}>
      <Label htmlFor={`data-${labelName}`}>
        {labelName}
      </Label>
      <Select
        defaultValue={value}
        value={value}
        onValueChange={onQueryOptionChange}
        disabled={disabled}
      >
        <SelectTrigger id={`data-${labelName}`}>
          <SelectValue placeholder='Select an option' />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            const isSelected = selectedSet.has(option.value)
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={isSelected}
              >
                {formatter ? formatter(option) : `${option.name}`}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default memo(QueryOptionSelect)
