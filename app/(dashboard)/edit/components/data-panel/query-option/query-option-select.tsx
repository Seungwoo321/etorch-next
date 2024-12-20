import { memo } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

type QueryOptionSelectProps = {
  className: string
  labelName: string
  value: string
  options: any[]
  formatter?: (value: any) => string
  onQueryOptionChange: (value: string) => void
  disabled?: boolean
}

function QueryOptionSelect({
  className,
  labelName,
  value,
  options,
  formatter,
  onQueryOptionChange,
  disabled = false
}: QueryOptionSelectProps) {
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
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {formatter ? formatter(option) : `${option.name}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default memo(QueryOptionSelect)
