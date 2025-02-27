import {
  CardDescription
} from '@/components/ui/card'
import { memo } from 'react'
type ChartHeaderDescription = {
  description: string
}
function ChartHeaderDescription ({ description }: ChartHeaderDescription) {
  if (description === '') return null
  return (
    <CardDescription>
      {description}
    </CardDescription>
  )
}

export default memo(ChartHeaderDescription)
