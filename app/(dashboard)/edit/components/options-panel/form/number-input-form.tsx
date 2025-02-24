import React from 'react'
import FormField from '@/components/shared/form-field'
import { Input } from '@/components/ui/input'

type NumberInputFormProps = {
  label: string
  id: string
  value: string | number
  useAuto?: boolean
  min?: number
  max?: number
  hidden?: boolean
  handleInputChange: (value: number) => void
}

function NumberInputForm ({
  label,
  id,
  value,
  useAuto,
  min,
  max,
  hidden,
  handleInputChange
}: NumberInputFormProps) {
  if (hidden) return null
  return (
    <FormField
      htmlFor={id}
      label={label}
    >
      <Input
        id={id}
        className='sm'
        type='number'
        min={min}
        max={max}
        placeholder={useAuto ? 'auto' : undefined}
        onInput={e => handleInputChange(+e.currentTarget.value)}
        value={useAuto && (value === 'auto' || value === 0) ? '' : value}
      />
    </FormField>
  )
}

export default React.memo(NumberInputForm)
