import {
  CardTitle
} from '@/components/ui/card'
import React from 'react'
type PreviewCardHeaderTitleProps = {
  title: string
}
function PreviewCardHeaderTitle ({ title }: PreviewCardHeaderTitleProps) {
  if (title === '') return null
  return (
    <CardTitle>
      {title}
    </CardTitle>
  )
}

export default React.memo(PreviewCardHeaderTitle)
