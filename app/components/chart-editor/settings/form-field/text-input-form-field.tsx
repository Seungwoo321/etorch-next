import React from 'react'
import FormField from '../form-field/form-field'
import { Input } from '@/components/ui/input'

type TextInputFormProps = {
  label: string
  id: string
  value: string
  handleInputChange: (value: string) => void
}

function TextInputForm ({
  label,
  id,
  value,
  handleInputChange
}: TextInputFormProps) {
  return (
    <FormField
      htmlFor={id}
      label={label}
    >
      <Input
        id={id}
        className='sm'
        type='text'
        onInput={e => handleInputChange(e.currentTarget.value)}
        value={value}
      />
    </FormField>
  )
}

export default React.memo(TextInputForm)
