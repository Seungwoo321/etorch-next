import React from 'react'
import FormField from '@/components/shared/form-field'
import { Textarea } from '@/components/ui/textarea'

type TextAreaFormProps = {
  label: string
  id: string
  value: string
  handleInputChange: (value: string) => void
}

function TextAreaForm ({
  label,
  id,
  value,
  handleInputChange
}: TextAreaFormProps) {
  return (
    <FormField
      htmlFor={id}
      label={label}
    >
      <Textarea
        id={id}
        onInput={e => handleInputChange(e.currentTarget.value)}
        value={value}
      />
    </FormField>
  )
}

export default React.memo(TextAreaForm)
