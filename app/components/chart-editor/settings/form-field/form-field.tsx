import React, { ReactNode, type JSX } from 'react'
import { Label } from '@/components/ui/label'

interface FormFieldProps {
  htmlFor?: string
  label: string
  children: ReactNode
}

function FormField ({ htmlFor, label, children }: FormFieldProps): JSX.Element {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      {!htmlFor
        ? (<Label htmlFor={htmlFor}>{label}</Label>)
        : (<span>{label}</span>)}
      {children}
    </div>
  )
}

export default React.memo(FormField)
