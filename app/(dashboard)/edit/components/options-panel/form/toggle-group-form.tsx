import React, { ReactNode } from 'react'
import FormField from '@/components/shared/form-field'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type ToggleGroupFormProps = {
  label: string
  id: string
  value: string | undefined
  handleValueChange: (value: string) => void
  options: { value: string, label: string }[]
  children?: ReactNode,
  hidden?: boolean
}

function ToggleGroupForm ({
  label,
  id,
  value,
  options,
  children,
  handleValueChange,
  hidden
}: ToggleGroupFormProps) {
  if (hidden) return null
  return (
    <FormField
      htmlFor={id}
      label={label}
    >
      <div className='flex gap-1.5'>
        <ToggleGroup
          className='justify-start'
          type='single'
          variant='outline'
          value={value}
          onValueChange={value => {
            if (value != null && value !== '') {
              handleValueChange(value)
            }
          }}
        >
          {options.map(option => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              aria-label={`Toggle ${option.value}`}
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {children}
      </div>
    </FormField>
  )
}

export default React.memo(ToggleGroupForm)
