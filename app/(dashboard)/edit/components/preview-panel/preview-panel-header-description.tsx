import {
  CardDescription
} from '@/components/ui/card'
import React from 'react'
type PreviewCardHeaderDescription = {
  description: string
}
function PreviewCardHeaderDescription ({ description }: PreviewCardHeaderDescription) {
  if (description === '') return null
  return (
    <CardDescription>
      {description}
    </CardDescription>
  )
}

export default React.memo(PreviewCardHeaderDescription)
