import React from 'react'
import { Switch } from '@/components/ui/switch'
import FormField from '@/components/shared/form-field'
type SwitchFormProps = {
  label: string
  id: string
  checked: boolean
  handleCheckedChange: (value: boolean) => void
}

function SwitchForm ({
  label,
  id,
  checked,
  handleCheckedChange
}: SwitchFormProps) {
  return (
    <FormField
      htmlFor={id}
      label={label}
    >
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={handleCheckedChange}
      />
    </FormField>
  )
}

export default React.memo(SwitchForm)
