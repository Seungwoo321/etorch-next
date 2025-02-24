import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import FormField from '@/components/shared/form-field'

type SelectFormProps = {
  label: string
  id: string
  placeholder?: string
  defaultValue?: string
  value: string | undefined
  handleValueChange: (value: string) => void
  options: { value: string, label: string }[]
  disabledValues?: string[],
  hidden?: boolean
}

function SelectForm ({
  label,
  id,
  value,
  options,
  handleValueChange,
  placeholder,
  disabledValues,
  defaultValue,
  hidden
}: SelectFormProps) {
  if (hidden) return null
  let selectedValue
  const values = options.map(option => option.value)
  if (value && value !== '' && values.includes(value)) {
    selectedValue = value
  }
  return (
    <FormField
      htmlFor={id}
      label={label}
    >
      <div className='flex gap-1.5'>
        <Select
          onValueChange={handleValueChange}
          value={selectedValue}
        >
          <SelectTrigger id={id}>
            <SelectValue
              placeholder={placeholder}
              defaultValue={defaultValue}
            />
          </SelectTrigger>
          <SelectContent>
            {options.map(item => (
              <SelectItem
                key={item.value}
                value={item.value}
                disabled={disabledValues?.includes(item.value)}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormField>
  )
}

export default React.memo(SelectForm)
